'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

type Node = {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  route: string;
  isCompleted?: boolean;
};

type Edge = {
  source: string;
  target: string;
};

export default function AlgorithmRoadmap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const router = useRouter();

  // Define nodes with fixed positions for consistent layout
  const nodes: Node[] = [
    { id: 'arrays', label: 'Arrays & Hashing', color: '#3b82f6', x: 500, y: 100, route: '/practice/algorithms', isCompleted: true },
    { id: 'pointers', label: 'Two Pointers', color: '#3b82f6', x: 400, y: 220, route: '/practice/algorithms/two-pointers', isCompleted: true },
    { id: 'stack', label: 'Stack', color: '#3b82f6', x: 600, y: 220, route: '/practice/algorithms/stack' },
    { id: 'binary', label: 'Binary Search', color: '#3b82f6', x: 300, y: 340, route: '/practice/algorithms/binary-search' },
    { id: 'sliding', label: 'Sliding Window', color: '#3b82f6', x: 400, y: 340, route: '/practice/algorithms/sliding-window' },
    { id: 'linked', label: 'Linked List', color: '#3b82f6', x: 500, y: 340, route: '/practice/algorithms/linked-list' },
    { id: 'trees', label: 'Trees', color: '#3b82f6', x: 400, y: 460, route: '/practice/algorithms/trees' },
    { id: 'tries', label: 'Tries', color: '#3b82f6', x: 400, y: 580, route: '/practice/algorithms/tries' },
    { id: 'heap', label: 'Heap / Priority Queue', color: '#3b82f6', x: 180, y: 680, route: '/practice/algorithms/heap' },
    { id: 'backtracking', label: 'Backtracking', color: '#3b82f6', x: 620, y: 680, route: '/practice/algorithms/backtracking' },
    { id: 'intervals', label: 'Intervals', color: '#3b82f6', x: 100, y: 780, route: '/practice/algorithms/intervals' },
    { id: 'greedy', label: 'Greedy', color: '#3b82f6', x: 260, y: 780, route: '/practice/algorithms/greedy' },
    { id: 'graphs', label: 'Graphs', color: '#3b82f6', x: 500, y: 780, route: '/practice/algorithms/graphs' },
    { id: '1d-dp', label: '1-D DP', color: '#3b82f6', x: 740, y: 780, route: '/practice/algorithms/1d-dp' },
    { id: 'advanced-graphs', label: 'Advanced Graphs', color: '#3b82f6', x: 500, y: 880, route: '/practice/algorithms/advanced-graphs' },
    { id: '2d-dp', label: '2-D DP', color: '#3b82f6', x: 640, y: 880, route: '/practice/algorithms/2d-dp' },
    { id: 'bit', label: 'Bit Manipulation', color: '#3b82f6', x: 840, y: 880, route: '/practice/algorithms/bit-manipulation' },
    { id: 'math', label: 'Math & Geometry', color: '#3b82f6', x: 600, y: 980, route: '/practice/algorithms/math-geometry' },
  ];

  // Define direct connections between nodes
  const edges: Edge[] = [
    { source: 'arrays', target: 'pointers' },
    { source: 'arrays', target: 'stack' },
    { source: 'pointers', target: 'binary' },
    { source: 'pointers', target: 'sliding' },
    { source: 'pointers', target: 'linked' },
    { source: 'sliding', target: 'trees' },
    { source: 'trees', target: 'tries' },
    { source: 'tries', target: 'heap' },
    { source: 'tries', target: 'backtracking' },
    { source: 'heap', target: 'intervals' },
    { source: 'heap', target: 'greedy' },
    { source: 'backtracking', target: 'graphs' },
    { source: 'backtracking', target: '1d-dp' },
    { source: 'graphs', target: 'advanced-graphs' },
    { source: '1d-dp', target: '2d-dp' },
    { source: '1d-dp', target: 'bit' },
    { source: 'advanced-graphs', target: 'math' },
    { source: '2d-dp', target: 'math' },
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    
    // Clear any existing elements
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    // Draw edges first so they're behind nodes
    edges.forEach(edge => {
      const source = nodes.find(n => n.id === edge.source);
      const target = nodes.find(n => n.id === edge.target);
      
      if (source && target) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        // Create straight line with slight curve
        const midY = (source.y + target.y) / 2;
        const pathData = `M ${source.x} ${source.y + 20} C ${source.x} ${midY}, ${target.x} ${midY}, ${target.x} ${target.y - 20}`;
        
        path.setAttribute('d', pathData);
        path.setAttribute('stroke', '#3b82f6');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('fill', 'none');
        
        svg.appendChild(path);
      }
    });
    
    // Draw nodes
    nodes.forEach(node => {
      // Create node group
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.setAttribute('cursor', 'pointer');
      
      // Create node rectangle
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', (node.x - 80).toString());
      rect.setAttribute('y', (node.y - 20).toString());
      rect.setAttribute('width', '160');
      rect.setAttribute('height', '40');
      rect.setAttribute('rx', '6');
      rect.setAttribute('fill', node.color);
      
      if (node.isCompleted) {
        rect.setAttribute('stroke', '#22c55e'); // Green border for completed
        rect.setAttribute('stroke-width', '2');
      }
      
      // Create node text
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', node.x.toString());
      text.setAttribute('y', (node.y + 5).toString());
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', 'white');
      text.setAttribute('font-size', '14');
      text.textContent = node.label;
      
      // Create progress bar (empty)
      const progressBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      progressBg.setAttribute('x', (node.x - 80).toString());
      progressBg.setAttribute('y', (node.y + 18).toString());
      progressBg.setAttribute('width', '160');
      progressBg.setAttribute('height', '2');
      progressBg.setAttribute('fill', '#1e40af'); // Dark blue
      
      // Create progress bar (filled)
      if (node.isCompleted) {
        const progressFill = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        progressFill.setAttribute('x', (node.x - 80).toString());
        progressFill.setAttribute('y', (node.y + 18).toString());
        progressFill.setAttribute('width', '160');
        progressFill.setAttribute('height', '2');
        progressFill.setAttribute('fill', '#60a5fa'); // Light blue
      }
      
      group.appendChild(rect);
      group.appendChild(progressBg);
      if (node.isCompleted) {
        const progressFill = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        progressFill.setAttribute('x', (node.x - 80).toString());
        progressFill.setAttribute('y', (node.y + 18).toString());
        progressFill.setAttribute('width', '160');
        progressFill.setAttribute('height', '2');
        progressFill.setAttribute('fill', '#60a5fa'); // Light blue
        group.appendChild(progressFill);
      }
      group.appendChild(text);
      
      // Add hover and click effects
      group.addEventListener('mouseenter', () => {
        rect.setAttribute('fill', '#2563eb'); // Lighter blue on hover
      });
      
      group.addEventListener('mouseleave', () => {
        rect.setAttribute('fill', node.color);
      });
      
      group.addEventListener('click', () => {
        router.push(node.route);
      });
      
      svg.appendChild(group);
    });
    
  }, [router]);

  return (
    <div className="w-full overflow-auto">
      <svg 
        ref={svgRef}
        className="w-full"
        viewBox="0 0 1000 1100"
        style={{ minHeight: '800px' }}
      />
    </div>
  );
} 