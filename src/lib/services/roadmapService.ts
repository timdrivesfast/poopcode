import { supabase } from '../supabase';

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  order_index: number;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

export interface RoadmapNode {
  id: string;
  roadmap_id: string;
  title: string;
  description: string | null;
  content: string | null;
  parent_id: string | null;
  order_index: number;
  is_premium: boolean;
  color: string | null;
  type: 'section' | 'topic' | 'resource' | 'problem' | 'challenge'; 
  estimated_hours: number | null;
  related_courses: string[] | null;
  related_problems: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface RoadmapNodeWithProgress extends RoadmapNode {
  status: 'not_started' | 'in_progress' | 'completed';
  children?: RoadmapNodeWithProgress[];
}

export async function getRoadmaps(): Promise<Roadmap[]> {
  const { data, error } = await supabase
    .from('roadmaps')
    .select('*')
    .order('order_index');

  if (error) {
    console.error('Error fetching roadmaps:', error);
    throw error;
  }

  return data;
}

export async function getRoadmapById(roadmapId: string): Promise<Roadmap | null> {
  const { data, error } = await supabase
    .from('roadmaps')
    .select('*')
    .eq('id', roadmapId)
    .single();

  if (error) {
    console.error('Error fetching roadmap:', error);
    return null;
  }

  return data;
}

export async function getRoadmapNodes(roadmapId: string): Promise<RoadmapNodeWithProgress[]> {
  // Fetch all nodes for this roadmap
  const { data: nodes, error } = await supabase
    .from('roadmap_nodes')
    .select('*')
    .eq('roadmap_id', roadmapId)
    .order('order_index');

  if (error) {
    console.error('Error fetching roadmap nodes:', error);
    throw error;
  }

  // Fetch user progress if logged in
  const user = (await supabase.auth.getUser()).data.user;
  let userProgress: any[] = [];
  
  if (user) {
    const { data: progress, error: progressError } = await supabase
      .from('user_roadmap_progress')
      .select('*')
      .eq('user_id', user.id)
      .in('node_id', nodes.map(n => n.id));
    
    if (!progressError && progress) {
      userProgress = progress;
    }
  }

  // Create a map of node progress
  const progressMap = new Map();
  userProgress.forEach(p => {
    progressMap.set(p.node_id, p.status);
  });

  // Add progress status to each node
  const nodesWithProgress: RoadmapNodeWithProgress[] = nodes.map(node => ({
    ...node,
    status: progressMap.get(node.id) || 'not_started',
    children: []
  }));

  // Build the node tree
  const nodeMap = new Map<string, RoadmapNodeWithProgress>();
  nodesWithProgress.forEach(node => {
    nodeMap.set(node.id, node);
  });

  // Create hierarchical structure
  const rootNodes: RoadmapNodeWithProgress[] = [];
  
  nodesWithProgress.forEach(node => {
    if (node.parent_id === null) {
      rootNodes.push(node);
    } else {
      const parent = nodeMap.get(node.parent_id);
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(node);
      }
    }
  });

  return rootNodes;
}

export async function updateNodeProgress(
  nodeId: string, 
  status: 'not_started' | 'in_progress' | 'completed'
): Promise<boolean> {
  const user = (await supabase.auth.getUser()).data.user;
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  // Check if a record already exists
  const { data: existingProgress } = await supabase
    .from('user_roadmap_progress')
    .select('id')
    .eq('user_id', user.id)
    .eq('node_id', nodeId)
    .single();
  
  let error;
  
  if (existingProgress) {
    // Update existing record
    const { error: updateError } = await supabase
      .from('user_roadmap_progress')
      .update({ 
        status,
        started_at: status !== 'not_started' ? new Date().toISOString() : null,
        completed_at: status === 'completed' ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      })
      .eq('id', existingProgress.id);
    
    error = updateError;
  } else {
    // Insert new record
    const { error: insertError } = await supabase
      .from('user_roadmap_progress')
      .insert([{
        user_id: user.id,
        node_id: nodeId,
        status,
        started_at: status !== 'not_started' ? new Date().toISOString() : null,
        completed_at: status === 'completed' ? new Date().toISOString() : null
      }]);
    
    error = insertError;
  }
  
  if (error) {
    console.error('Error updating node progress:', error);
    return false;
  }
  
  return true;
} 