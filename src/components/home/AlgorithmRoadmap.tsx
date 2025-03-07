'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type Node = {
  id: string;
  label: string;
  color: string;
  x?: number;
  y?: number;
  level?: number;
  route: string;
};

type Edge = {
  source: string;
  target: string;
};

const AlgorithmRoadmap = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const nodes: Node[] = [
    { id: 'arrays', label: 'Arrays & Hashing', color: '#4F46E5', level: 0, route: '/roadmap/arrays-hashing' },
    { id: 'pointers', label: 'Two Pointers', color: '#4F46E5', level: 1, route: '/roadmap/two-pointers' },
    { id: 'stack', label: 'Stack', color: '#4F46E5', level: 1, route: '/roadmap/stack' },
    { id: 'sliding', label: 'Sliding Window', color: '#4F46E5', level: 2, route: '/roadmap/sliding-window' },
    { id: 'linked', label: 'Linked List', color: '#4F46E5', level: 2, route: '/roadmap/linked-list' },
    { id: 'binary', label: 'Binary Search', color: '#4F46E5', level: 2, route: '/roadmap/binary-search' },
    { id: 'trees', label: 'Trees', color: '#4F46E5', level: 3, route: '/roadmap/trees' },
    { id: 'tries', label: 'Tries', color: '#4F46E5', level: 4, route: '/roadmap/tries' },
    { id: 'heap', label: 'Heap / Priority Queue', color: '#4F46E5', level: 4, route: '/roadmap/heap' },
    { id: 'backtracking', label: 'Backtracking', color: '#4F46E5', level: 4, route: '/roadmap/backtracking' }
  ];

  const edges: Edge[] = [
    { source: 'arrays', target: 'pointers' },
    { source: 'arrays', target: 'stack' },
    { source: 'pointers', target: 'sliding' },
    { source: 'pointers', target: 'linked' },
    { source: 'pointers', target: 'binary' },
    { source: 'binary', target: 'trees' },
    { source: 'linked', target: 'trees' },
    { source: 'trees', target: 'tries' },
    { source: 'trees', target: 'heap' },
    { source: 'trees', target: 'backtracking' }
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const width = svg.clientWidth;
    const height = svg.clientHeight;

    // Calculate node positions based on levels
    const levelCounts: Record<number, number> = {};
    const levelPositions: Record<number, number[]> = {};
    
    nodes.forEach(node => {
      if (node.level !== undefined) {
        levelCounts[node.level] = (levelCounts[node.level] || 0) + 1;
      }
    });
    
    Object.keys(levelCounts).forEach(levelStr => {
      const level = Number(levelStr);
      const count = levelCounts[level];
      levelPositions[level] = [];
      
      for (let i = 0; i < count; i++) {
        levelPositions[level].push((i + 1) * width / (count + 1));
      }
    });
    
    // Assign positions to nodes
    const levelCounters: Record<number, number> = {};
    
    nodes.forEach(node => {
      if (node.level !== undefined) {
        levelCounters[node.level] = (levelCounters[node.level] || 0);
        node.x = levelPositions[node.level][levelCounters[node.level]];
        node.y = node.level * 120 + 60;
        levelCounters[node.level]++;
      }
    });
    
    // Clear existing elements
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    
    // Draw edges first so they appear behind nodes
    edges.forEach(edge => {
      const source = nodes.find(n => n.id === edge.source);
      const target = nodes.find(n => n.id === edge.target);
      
      if (source && target && source.x && source.y && target.x && target.y) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        const startX = source.x;
        const startY = source.y + 20; // Bottom of source node
        const endX = target.x;
        const endY = target.y - 20; // Top of target node
        
        // Create an S-curve path
        const midY = (startY + endY) / 2;
        const pathData = `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;
        
        path.setAttribute('d', pathData);
        path.setAttribute('stroke', 'white');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('fill', 'none');
        
        svg.appendChild(path);
      }
    });
    
    // Draw nodes
    nodes.forEach(node => {
      if (node.x === undefined || node.y === undefined) return;
      
      // Create node group
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      
      // Create node rectangle
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', (node.x - 70).toString());
      rect.setAttribute('y', (node.y - 20).toString());
      rect.setAttribute('width', '140');
      rect.setAttribute('height', '40');
      rect.setAttribute('rx', '8');
      rect.setAttribute('fill', node.color);
      rect.setAttribute('stroke', 'white');
      rect.setAttribute('stroke-width', '2');
      
      // Create node text
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', node.x.toString());
      text.setAttribute('y', (node.y + 5).toString());
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', 'white');
      text.setAttribute('font-size', '14');
      text.textContent = node.label;
      
      group.appendChild(rect);
      group.appendChild(text);
      svg.appendChild(group);
      
      // Add hover effect and click navigation
      group.classList.add('cursor-pointer', 'transition-transform', 'duration-200');
      group.addEventListener('mouseenter', () => {
        group.style.transform = 'scale(1.05)';
      });
      group.addEventListener('mouseleave', () => {
        group.style.transform = 'scale(1)';
      });
      
      // Add click handler for navigation
      group.addEventListener('click', () => {
        router.push(node.route);
      });
    });
    
  }, [pathname, router]);

  return (
    <div className="w-full h-[600px] relative">
      <svg 
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 600 600"
        preserveAspectRatio="xMidYMid meet"
      ></svg>
    </div>
  );
};

export default AlgorithmRoadmap; 