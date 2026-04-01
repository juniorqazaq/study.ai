import type { Edge, Node } from '@xyflow/react';

export type MindMapBranch = { label: string; color?: string; children?: string[] };

export function mindmapDataToFlow(mindmap: unknown): { nodes: Node[]; edges: Edge[] } | null {
  if (!mindmap || typeof mindmap !== 'object') return null;
  const m = mindmap as { root?: string; branches?: MindMapBranch[] };
  if (typeof m.root !== 'string' || !Array.isArray(m.branches) || m.branches.length === 0) {
    return null;
  }

  const nodes: Node[] = [
    {
      id: 'root',
      type: 'mindMap',
      data: { label: m.root, isRoot: true, color: '#3b82f6' },
      position: { x: 0, y: 0 },
    },
  ];
  const edges: Edge[] = [];

  m.branches.forEach((b, i) => {
    const bid = `b${i}`;
    const color = typeof b.color === 'string' && b.color ? b.color : '#8b5cf6';
    const x = -280 + (i % 4) * 180;
    const y = 140 + Math.floor(i / 4) * 100;
    nodes.push({
      id: bid,
      type: 'mindMap',
      data: { label: b.label, color },
      position: { x, y },
    });
    edges.push({
      id: `e-root-${bid}`,
      source: 'root',
      target: bid,
      animated: true,
      style: { stroke: color },
    });
    (b.children || []).forEach((child, j) => {
      const cid = `${bid}-c${j}`;
      nodes.push({
        id: cid,
        type: 'mindMap',
        data: { label: child, color: '#06b6d4' },
        position: { x: x + j * 40 - 20, y: y + 100 },
      });
      edges.push({
        id: `e-${bid}-${cid}`,
        source: bid,
        target: cid,
        animated: true,
        style: { stroke: '#06b6d4' },
      });
    });
  });

  return { nodes, edges };
}
