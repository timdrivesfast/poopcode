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
  title: string;
  description?: string;
  position?: { x: number; y: number };
  completed?: boolean;
}

export interface RoadmapEdge {
  source: string;
  target: string;
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  nodes: RoadmapNode[];
  edges: RoadmapEdge[];
}

export interface RoadmapNodeWithProgress extends RoadmapNode {
  status: 'not_started' | 'in_progress' | 'completed';
  children?: RoadmapNodeWithProgress[];
}

// Mock data
const ROADMAPS: Record<string, Roadmap> = {
  'algorithms': {
    id: 'algorithms',
    title: 'Algorithm Roadmap',
    description: 'Master data structures and algorithms with this structured learning path.',
    nodes: [
      { id: 'arrays-hashing', title: 'Arrays & Hashing', position: { x: 400, y: 100 } },
      { id: 'two-pointers', title: 'Two Pointers', position: { x: 300, y: 200 } },
      { id: 'stack', title: 'Stack', position: { x: 500, y: 200 } },
      // Add more nodes as needed
    ],
    edges: [
      { source: 'arrays-hashing', target: 'two-pointers' },
      { source: 'arrays-hashing', target: 'stack' },
      // Add more edges as needed
    ]
  },
  'data-structures': {
    id: 'data-structures',
    title: 'Data Structures Roadmap',
    description: 'Learn fundamental data structures used in software engineering',
    difficulty: 'Beginner',
    order_index: 1,
    is_premium: false,
    created_at: '2023-01-02T00:00:00Z',
    updated_at: '2023-01-02T00:00:00Z',
    nodes: [
      { id: 'arrays', title: 'Arrays', position: { x: 300, y: 100 } },
      { id: 'linked-lists', title: 'Linked Lists', position: { x: 200, y: 200 } },
      { id: 'stacks', title: 'Stacks', position: { x: 400, y: 200 } },
      // More nodes...
    ],
    edges: [
      { source: 'arrays', target: 'linked-lists' },
      { source: 'arrays', target: 'stacks' },
      // More edges...
    ]
  }
};

/**
 * Get all available roadmaps
 */
export async function getRoadmaps(): Promise<Roadmap[]> {
  try {
    // In production this would fetch from an API or database
    return Object.values(ROADMAPS);
  } catch (error) {
    console.error('Error fetching roadmaps:', error);
    return [];
  }
}

/**
 * Get a specific roadmap by ID
 */
export async function getRoadmapById(id: string): Promise<Roadmap | null> {
  try {
    // In production this would fetch from an API or database
    return ROADMAPS[id] || null;
  } catch (error) {
    console.error('Error fetching roadmap:', error);
    return null;
  }
}

/**
 * Save user progress for a roadmap node
 */
export async function saveRoadmapProgress(
  roadmapId: string, 
  nodeId: string, 
  completed: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    // In production this would save to an API or database
    // For now, save to localStorage
    if (typeof window !== 'undefined') {
      const key = `roadmap_progress_${roadmapId}`;
      const savedProgress = localStorage.getItem(key) || '{}';
      const progress = JSON.parse(savedProgress);
      
      progress[nodeId] = completed;
      localStorage.setItem(key, JSON.stringify(progress));
    }
    
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Get user progress for a roadmap
 */
export async function getRoadmapProgress(
  roadmapId: string
): Promise<{ [nodeId: string]: boolean } | null> {
  try {
    // In production this would fetch from an API or database
    // For now, get from localStorage
    if (typeof window !== 'undefined') {
      const key = `roadmap_progress_${roadmapId}`;
      const savedProgress = localStorage.getItem(key) || '{}';
      return JSON.parse(savedProgress);
    }
    
    return {};
  } catch (error) {
    console.error('Error loading roadmap progress:', error);
    return null;
  }
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