import React, { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Download, Layout, Share2, ArrowLeft } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import MindMapNode from './mindmap/MindMapNode';
import { FloatingToolbar } from './mindmap/FloatingToolbar';
import { getLayoutedElements } from './mindmap/MindMapLayouts';
import { Link } from 'react-router-dom';

const initialNodes: Node[] = [
  { id: 'root', type: 'mindMap', data: { label: 'Psychology', isRoot: true, color: '#3b82f6' }, position: { x: 0, y: 0 } },
  { id: '1', type: 'mindMap', data: { label: 'History', color: '#8b5cf6' }, position: { x: -200, y: 100 } },
  { id: '2', type: 'mindMap', data: { label: 'Research', color: '#06b6d4' }, position: { x: 0, y: 100 } },
  { id: '3', type: 'mindMap', data: { label: 'Clinical', color: '#f59e0b' }, position: { x: 200, y: 100 } },
];

const initialEdges: Edge[] = [
  { id: 'e1-1', source: 'root', target: '1', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e1-2', source: 'root', target: '2', animated: true, style: { stroke: '#06b6d4' } },
  { id: 'e1-3', source: 'root', target: '3', animated: true, style: { stroke: '#f59e0b' } },
];

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const nodeTypes = useMemo(() => ({ mindMap: MindMapNode }), []);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const onLayout = useCallback(
    (direction: string) => {
      const layouted = getLayoutedElements(nodes, edges, direction);
      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);
    },
    [nodes, edges, setNodes, setEdges],
  );

  // Function passed to nodes to add a child
  const onAddChild = useCallback((parentId: string) => {
    const parentNode = nodes.find((n) => n.id === parentId);
    if (!parentNode) return;

    // Find existing children to calculate offset
    const existingChildren = edges.filter(e => e.source === parentId);
    const childCount = existingChildren.length;

    // Simple fan-out logic: 
    // If it's the first child, place it to the right.
    // Subsequent children get vertical offsets.
    const verticalSpacing = 100;
    // Alternate up/down for subsequent nodes to balance the tree
    const verticalOffset = childCount === 0 ? 0 :
      (childCount % 2 === 1 ? 1 : -1) * Math.ceil(childCount / 2) * verticalSpacing;

    const newId = `${parentId}-${Date.now()}`;
    const newNode: Node = {
      id: newId,
      type: 'mindMap',
      data: { label: 'New Node', color: parentNode.data.color }, // Inherit color for now
      position: {
        x: parentNode.position.x + 250, // Always move right
        y: parentNode.position.y + verticalOffset,
      },
    };

    const newEdge: Edge = {
      id: `e${parentId}-${newId}`,
      source: parentId,
      target: newId,
      animated: true,
      style: { stroke: parentNode.data.color as string },
    };

    setNodes((nds) => nds.concat(newNode));
    setEdges((eds) => eds.concat(newEdge));
  }, [nodes, edges, setNodes, setEdges]);

  const handleLabelChange = useCallback((id: string, newLabel: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: { ...node.data, label: newLabel },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  // Inject the onAddChild function into node data
  const nodesWithHandlers = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onAddChild: onAddChild,
        onLabelChange: handleLabelChange,
      },
    }));
  }, [nodes, onAddChild, handleLabelChange]);

  const handleColorChange = (color: string) => {
    if (!selectedNodeId) return;
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNodeId) {
          return {
            ...node,
            data: { ...node.data, color },
          };
        }
        return node;
      })
    );
    // Update connected edges color too for visual consistency?
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.source === selectedNodeId) {
          return { ...edge, style: { ...edge.style, stroke: color } };
        }
        return edge;
      })
    )
  };

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodesWithHandlers}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-transparent"
      >
        <Background gap={24} size={1} color="rgba(255, 255, 255, 0.03)" />
        <Controls className="liquid-glass border-white/10 fill-white text-white squircle-lg mb-6 ml-6 overflow-hidden [&_button]:bg-transparent [&_button]:border-none [&_button:hover]:bg-white/10" />

        {/* Top Controls Panel */}
        <Panel position="top-right" className="flex gap-3 mr-4 mt-4">
          <button
            onClick={() => onLayout('TB')}
            className="px-4 py-2.5 liquid-glass border-white/10 rounded-xl text-white hover:bg-white/10 transition-all flex items-center gap-3 text-sm font-black uppercase tracking-widest active:scale-95 shadow-xl"
            title="Vertical Layout"
          >
            <Layout size={18} className="text-blue-400" /> Tree
          </button>
          <button
            onClick={() => onLayout('LR')}
            className="px-4 py-2.5 liquid-glass border-white/10 rounded-xl text-white hover:bg-white/10 transition-all flex items-center gap-3 text-sm font-black uppercase tracking-widest active:scale-95 shadow-xl"
            title="Horizontal Layout"
          >
            <Layout size={18} className="rotate-90 text-purple-400" /> Flow
          </button>
        </Panel>

        {/* Legend Panel */}
        <Panel position="bottom-left" className="m-6">
          <div className="liquid-glass border-white/10 squircle-xl p-6 shadow-2xl w-60 backdrop-blur-3xl">
            <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] mb-4 border-b border-white/5 pb-2">Visualization Key</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4 group/item">
                <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] group-hover/item:scale-125 transition-transform duration-500"></div>
                <span className="text-xs font-bold text-gray-300 tracking-tight">Central Concept</span>
              </div>
              <div className="flex items-center gap-4 group/item">
                <div className="w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)] group-hover/item:scale-125 transition-transform duration-500"></div>
                <span className="text-xs font-bold text-gray-300 tracking-tight">Main Branch</span>
              </div>
              <div className="flex items-center gap-4 group/item">
                <div className="w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)] group-hover/item:scale-125 transition-transform duration-500"></div>
                <span className="text-xs font-bold text-gray-300 tracking-tight">Sub Topic</span>
              </div>
              <div className="flex items-center gap-4 group/item">
                <div className="w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.6)] group-hover/item:scale-125 transition-transform duration-500"></div>
                <span className="text-xs font-bold text-gray-300 tracking-tight">Detail Note</span>
              </div>
            </div>
          </div>
        </Panel>
      </ReactFlow>

      <FloatingToolbar
        isVisible={!!selectedNodeId}
        onColorChange={handleColorChange}
      />
    </div>
  );
};

const MindMapPage: React.FC = () => {
  return (
    <PageTransition className="h-screen flex flex-col overflow-hidden bg-black relative">
      {/* Liquid Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="liquid-blob liquid-blob-1" style={{ opacity: 0.1, width: '800px', height: '800px' }} />
        <div className="liquid-blob liquid-blob-3" style={{ opacity: 0.1, width: '600px', height: '600px', right: '-10%', bottom: '-10%' }} />
      </div>

      {/* Header */}
      <div className="flex justify-between items-center px-10 py-6 border-b border-white/10 liquid-glass relative z-10 shadow-2xl">
        <div className="flex items-center gap-6">
          <Link to="/features" className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 squircle-lg transition-all text-gray-400 hover:text-white active:scale-95 group">
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-white mb-1">Mind Map</h2>
            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded uppercase tracking-widest">Psychology 101</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-gray-500 uppercase tracking-widest">Last edited just now</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2.5 text-sm font-black liquid-glass border-white/10 text-white squircle-lg hover:bg-white/10 transition-all flex items-center gap-2 active:scale-95">
            <Share2 size={18} /> Share
          </button>
          <button className="px-6 py-2.5 text-sm font-black bg-blue-600 text-white squircle-lg hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2 active:scale-95 border border-white/10">
            <Download size={18} /> Export
          </button>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 w-full h-full relative z-0">
        <ReactFlowProvider>
          <Flow />
        </ReactFlowProvider>
      </div>
    </PageTransition>
  );
};

export default MindMapPage;