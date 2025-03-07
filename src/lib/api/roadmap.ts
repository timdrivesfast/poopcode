import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export async function fetchRoadmap(roadmapId: string) {
  try {
    const supabase = createClientComponentClient();
    
    // First, get the roadmap metadata
    const { data: roadmap, error: roadmapError } = await supabase
      .from('roadmaps')
      .select('*')
      .eq('id', roadmapId)
      .single();
    
    if (roadmapError) {
      console.error('Error fetching roadmap:', roadmapError);
      throw new Error(`Failed to fetch roadmap: ${roadmapError.message}`);
    }
    
    if (!roadmap) {
      throw new Error('Roadmap not found');
    }
    
    // Then, get all the nodes for this roadmap
    const { data: nodes, error: nodesError } = await supabase
      .from('roadmap_nodes')
      .select('*')
      .eq('roadmap_id', roadmapId)
      .order('position');
    
    if (nodesError) {
      console.error('Error fetching roadmap nodes:', nodesError);
      throw new Error(`Failed to fetch roadmap nodes: ${nodesError.message}`);
    }
    
    // Combine the data
    return {
      ...roadmap,
      nodes: nodes || []
    };
  } catch (error) {
    console.error('Error in fetchRoadmap:', error);
    throw error;
  }
} 