import React, { useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { ChevronLeft, ChevronRight, Download, Edit2, Layout, MessageSquare, Share2 } from 'lucide-react';
import MindMapNode from './mindmap/MindMapNode';
import { FloatingToolbar } from './mindmap/FloatingToolbar';
import { getLayoutedElements } from './mindmap/MindMapLayouts';
import { lessonsData } from '../shared/data/lessonData';
import { useSidebar } from '../context/SidebarContext';

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

const calculusNodes: Node[] = [
  { id: 'root', type: 'mindMap', data: { label: 'Calculus I', isRoot: true, color: '#3b82f6' }, position: { x: 0, y: 0 } },
  { id: '1', type: 'mindMap', data: { label: 'Sets & Logic', color: '#8b5cf6' }, position: { x: -250, y: 50 } },
  { id: '2', type: 'mindMap', data: { label: 'Intervals', color: '#06b6d4' }, position: { x: -250, y: 150 } },
  { id: '3', type: 'mindMap', data: { label: 'Functions', color: '#f59e0b' }, position: { x: 250, y: 100 } },
];

const calculusEdges: Edge[] = [
  { id: 'e1-1', source: 'root', target: '1', animated: true, style: { stroke: '#8b5cf6' } },
  { id: 'e1-2', source: 'root', target: '2', animated: true, style: { stroke: '#06b6d4' } },
  { id: 'e1-3', source: 'root', target: '3', animated: true, style: { stroke: '#f59e0b' } },
];

const Flow = () => {
  const { bookId } = useParams();
  const isCalculus = bookId === 'calculus-mastery';

  const [nodes, setNodes, onNodesChange] = useNodesState(isCalculus ? calculusNodes : initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(isCalculus ? calculusEdges : initialEdges);
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

  const onAddChild = useCallback((parentId: string) => {
    const parentNode = nodes.find((n) => n.id === parentId);
    if (!parentNode) return;

    const existingChildren = edges.filter(e => e.source === parentId);
    const childCount = existingChildren.length;

    const verticalSpacing = 100;
    const verticalOffset = childCount === 0 ? 0 :
      (childCount % 2 === 1 ? 1 : -1) * Math.ceil(childCount / 2) * verticalSpacing;

    const newId = `${parentId}-${Date.now()}`;
    const newNode: Node = {
      id: newId,
      type: 'mindMap',
      data: { label: 'New Node', color: parentNode.data.color }, 
      position: {
        x: parentNode.position.x + 250, 
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
    <div className="w-full h-full relative bg-[#111111] overflow-hidden">
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
        <Background gap={24} size={1} color="#262626" />
        <Controls className="!bg-[#1a1a1a] !border-[#262626] !text-white !rounded-xl overflow-hidden [&_button]:!bg-transparent [&_button]:!border-b-[#262626] [&_button:last-child]:!border-none [&_button:hover]:!bg-[#2a2a2a] mb-6 ml-6" />

        {/* Top Controls Panel */}
        <Panel position="top-right" className="flex gap-2 mr-4 mt-4">
          <button
            onClick={() => onLayout('TB')}
            className="px-4 py-2 rounded-xl border border-[#262626] bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] transition-colors flex items-center gap-2 text-[13px] font-medium"
            title="Vertical Layout"
          >
            <Layout size={16} className="text-[#a1a1aa]" /> Tree
          </button>
          <button
            onClick={() => onLayout('LR')}
            className="px-4 py-2 rounded-xl border border-[#262626] bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] transition-colors flex items-center gap-2 text-[13px] font-medium"
            title="Horizontal Layout"
          >
            <Layout size={16} className="rotate-90 text-[#a1a1aa]" /> Flow
          </button>
        </Panel>

        {/* Legend Panel */}
        <Panel position="bottom-left" className="m-6">
          <div className="rounded-[20px] border border-[#262626] bg-[#1a1a1a] p-5 w-56">
            <h4 className="text-[11px] font-bold uppercase text-[#71717a] tracking-wider mb-3">Key</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#0066FF]"></div>
                <span className="text-[13px] font-medium text-[#d4d4d8]">Sub Topic</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-[13px] font-medium text-[#d4d4d8]">Main Branch</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
                <span className="text-[13px] font-medium text-[#d4d4d8]">Central Concept</span>
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

export default function MindMapPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { isSidebarHidden, setIsSidebarHidden } = useSidebar();
  const lesson = bookId ? lessonsData[bookId] : null;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0c0c0c]">
        <div className="flex flex-1 flex-col">
            {/* Header */}
            <header className="flex h-14 items-center justify-between border-b border-[#262626] bg-[#0c0c0c] px-4 shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="text-[#a1a1aa] hover:text-white transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <h1 className="text-[15px] font-semibold tracking-tight text-white">
                        {lesson?.title || "Psychology of Learning"}
                    </h1>
                </div>
                <div className="flex items-center gap-5 text-[13px] font-medium text-[#a1a1aa]">
                    <button className="flex items-center gap-2 hover:text-white transition-colors">
                        <Share2 size={14} /> Share
                    </button>
                    <button className="flex items-center gap-2 hover:text-white transition-colors">
                        <Download size={14} /> Export
                    </button>
                    <button 
                        onClick={() => setIsSidebarHidden(!isSidebarHidden)} 
                        className="flex items-center gap-1 hover:text-white transition-colors"
                    >
                        {isSidebarHidden ? "Show sidebar" : "Hide sidebar"}
                        {!isSidebarHidden && <ChevronRight size={14} className="ml-1" />}
                    </button>
                </div>
            </header>

            {/* Main Canvas */}
            <div className="flex-1 w-full relative">
                <ReactFlowProvider>
                    <Flow />
                </ReactFlowProvider>
            </div>
        </div>

        {/* Right Sidebar */}
        {!isSidebarHidden && (
            <div className="flex w-[350px] shrink-0 flex-col bg-[#0c0c0c] border-l border-[#262626]">
                <div className="flex h-14 items-center px-4 border-b border-[#262626]">
                    <div className="flex w-full gap-1 p-1 bg-[#1a1a1a] rounded-xl text-[13px] font-medium">
                        <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#2a2a2a] py-1.5 text-white">
                            <MessageSquare size={14} /> Chat
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 rounded-lg py-1.5 text-[#7c7c7c] hover:text-white transition-colors">
                            <Layout size={14} /> Content
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 rounded-lg py-1.5 text-[#7c7c7c] hover:text-white transition-colors">
                            <Edit2 size={14} /> Notes
                        </button>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center text-center px-6">
                    <div className="flex flex-col items-center opacity-60">
                        <div className="h-12 w-12 rounded-xl bg-[#1f1f1f] flex items-center justify-center mb-4 border border-[#2a2a2a]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                        </div>
                        <p className="text-[14px] text-[#a1a1aa]">Here to help you learn</p>
                    </div>
                </div>
                <div className="p-4 border-t border-[#262626]">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Ask me anything about the material..." 
                            className="w-full rounded-2xl border border-[#262626] bg-[#141414] py-3 pl-4 pr-12 text-sm text-white placeholder:text-[#52525b] outline-none hover:border-[#3f3f46] focus:border-[#0066FF] transition-colors"
                        />
                        <div className="absolute left-4 bottom-[-24px] flex items-center gap-1.5 text-[11px] text-[#52525b]">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 21v-5h5" /></svg> 
                            Reset chat
                        </div>
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-xl bg-[#2a2a2a] text-[#a1a1aa] hover:bg-[#3f3f46] hover:text-white transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}