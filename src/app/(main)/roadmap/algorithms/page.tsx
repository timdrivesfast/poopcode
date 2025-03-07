'use client';

import React, { useState, useEffect } from 'react';
import { getRoadmapById } from '@/lib/services/roadmapService';
import RoadmapTree from '@/components/roadmap/RoadmapTree';
import { useAuth } from '@/contexts/AuthContext';

export default function AlgorithmsRoadmapPage() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    async function loadRoadmap() {
      try {
        const roadmapData = await getRoadmapById('algorithms');
        setRoadmap(roadmapData);
      } catch (error) {
        console.error('Error loading roadmap:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadRoadmap();
  }, []);
  
  if (loading) {
    return <div className="p-8 text-center">Loading roadmap...</div>;
  }
  
  if (!roadmap) {
    return <div className="p-8 text-center">Roadmap not found</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{roadmap.title}</h1>
      <p className="text-gray-400 mb-8">{roadmap.description}</p>
      
      <RoadmapTree roadmap={roadmap} />
    </div>
  );
} 