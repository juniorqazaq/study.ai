import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Bold,
  ChevronLeft,
  Code,
  Italic,
  Layout,
  List,
  Maximize2,
  MessageSquare,
  Minimize2,
  Quote,
  Send,
  Underline,
  X,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import PageTransition from '../components/PageTransition';
import { chatWithAI } from '../services/geminiService';
import { useSidebar } from '../context/SidebarContext';
import { lessonsData } from '../shared/data/lessonData';

const NotesPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const { setIsSidebarHidden } = useSidebar();
  const lesson = bookId ? lessonsData[bookId] : null;

  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(350);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: "I'm here to help you with your notes or explain concepts from the material." },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (event: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = window.innerWidth - event.clientX;
      if (newWidth > 250 && newWidth < 800) {
        setSidebarWidth(newWidth);
      }
    },
    [isResizing],
  );

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  const toggleFullScreen = () => {
    const nextState = !isFullScreen;
    setIsFullScreen(nextState);
    setIsSidebarHidden(nextState);
    if (nextState) {
      setIsChatOpen(false);
    }
  };

  useEffect(() => {
    return () => setIsSidebarHidden(false);
  }, [setIsSidebarHidden]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setMessages((previous) => [...previous, { role: 'user', text: userMsg }]);
    setInputValue('');
    setIsLoading(true);

    const aiResponse = await chatWithAI(
      userMsg,
      'The user is studying Psychology notes about Tabula Rasa and Unlearned Behaviors.',
    );
    setMessages((previous) => [...previous, { role: 'ai', text: aiResponse }]);
    setIsLoading(false);
  };

  const toolbarButtonClass =
    'flex h-9 w-9 items-center justify-center rounded-[10px] border border-transparent text-[#8d8d8d] transition-colors hover:border-[#2a2a2a] hover:bg-[#1b1b1b] hover:text-white';

  return (
    <PageTransition className="flex h-screen overflow-hidden bg-[#0c0c0c]">
      {!isFullScreen && (
        <div className="absolute inset-x-0 top-0 z-20 flex h-14 items-center justify-between border-b border-[#262626] bg-[#141414] px-5 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="rounded-full p-2 text-[#8d8d8d] transition-colors hover:bg-[#1d1d1d] hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>
            <h1 className="text-lg font-semibold text-white">{lesson?.title || 'Psychology of Learning'}</h1>
          </div>

          <div className="flex items-center gap-6 text-sm text-[#7c7c7c]">
            <span className="hidden md:block">{lesson ? 'Last updated 114 days ago' : 'Unsaved draft'}</span>
            <button
              onClick={() => setIsChatOpen((previous) => !previous)}
              className="font-medium text-[#d4d4d8] transition-colors hover:text-white"
            >
              {isChatOpen ? 'Hide sidebar' : 'Show sidebar'}
            </button>
          </div>
        </div>
      )}

      <div className={`flex flex-1 overflow-hidden ${!isFullScreen ? 'pt-14' : ''}`}>
        <div className="flex min-w-0 flex-1 flex-col border-r border-[#262626] bg-[#0c0c0c]">
          <div className="flex h-14 items-center gap-2 border-b border-[#262626] bg-[#141414] px-4 lg:px-5">
            <button className={toolbarButtonClass}>
              <Bold size={16} />
            </button>
            <button className={toolbarButtonClass}>
              <Italic size={16} />
            </button>
            <button className={toolbarButtonClass}>
              <Underline size={16} />
            </button>
            <div className="mx-1 h-5 w-px bg-[#2a2a2a]" />
            <button className={toolbarButtonClass}>
              <List size={16} />
            </button>
            <button className={toolbarButtonClass}>
              <Layout size={16} />
            </button>
            <button className={toolbarButtonClass}>
              <Quote size={16} />
            </button>
            <button className={toolbarButtonClass}>
              <Code size={16} />
            </button>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={toggleFullScreen}
                className="app-secondary-button flex items-center gap-2 px-4 py-2 text-xs"
              >
                {isFullScreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                <span>{isFullScreen ? 'Exit Full' : 'Full Screen'}</span>
              </button>
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto px-6 py-8 lg:px-8"
            contentEditable={!lesson}
            suppressContentEditableWarning={!lesson}
          >
            <div className="mx-auto max-w-4xl">
              {lesson ? (
                <div className="[&_h1]:mb-8 [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-white [&_h2]:mb-5 [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-white [&_h3]:mb-4 [&_h3]:mt-10 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-white [&_p]:mb-5 [&_p]:text-[17px] [&_p]:leading-9 [&_p]:text-[#c2c2c2] [&_strong]:text-white [&_ul]:mb-6 [&_ul]:space-y-3 [&_ul]:pl-6 [&_li]:text-[17px] [&_li]:leading-8 [&_li]:text-[#c2c2c2]">
                  <div dangerouslySetInnerHTML={{ __html: lesson.notes }} />
                </div>
              ) : (
                <>
                  <h1 className="mb-6 text-5xl font-semibold leading-tight tracking-tight text-white">
                    🧠 The Psychology of Learning:<br />Part 1
                  </h1>
                  <p className="mb-10 text-[17px] leading-9 text-[#c2c2c2]">
                    This is the first part of a two-part series exploring the psychology of learning. It focuses on
                    foundational concepts, including unlearned behaviors and the principles of classical conditioning.
                    The overarching ideas discussed are that all organisms are born with unlearned behaviors, learning
                    is a permanent change in behavior resulting from experience, and various psychological models explain
                    how learning occurs.
                  </p>

                  <h2 className="mb-5 mt-12 text-3xl font-semibold tracking-tight text-white">📜 Tabula Rasa Theory: The Blank Slate</h2>
                  <p className="mb-10 text-[17px] leading-9 text-[#c2c2c2]">
                    The term &quot;Tabula Rasa&quot; means &quot;blank slate.&quot; According to this theory, the mind is entirely
                    blank at birth, and external factors like education, environment, and experiences shape a child&apos;s
                    learning and development, leaving lasting effects on personality and thinking.
                  </p>

                  <h2 className="mb-5 mt-12 text-3xl font-semibold tracking-tight text-white">🧬 Unlearned Behaviors: Reflexes &amp; Instincts</h2>
                  <p className="mb-8 text-[17px] leading-9 text-[#c2c2c2]">
                    Despite the Tabula Rasa theory, humans are born with unlearned behaviors known as reflexes and
                    instincts. These are innate, genetically hardwired behaviors passed down through evolution to aid
                    an organism&apos;s adaptation to its environment.
                  </p>

                  <h3 className="mb-4 mt-10 text-2xl font-semibold text-white">⚡️ Reflexes</h3>
                  <p className="text-[17px] leading-9 text-[#c2c2c2]">
                    Reflexes are motor and neural reactions to stimuli, involving primitive centers of the central
                    nervous system. They are involuntary and often used as basic examples of unlearned behavior.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {isChatOpen && (
          <div
            onMouseDown={startResizing}
            className="relative hidden w-px cursor-col-resize bg-[#262626] transition-colors hover:bg-[#3a3a3a] lg:block"
          />
        )}

        {isChatOpen && (
          <div
            ref={sidebarRef}
            style={{ width: `${sidebarWidth}px` }}
            className="hidden shrink-0 flex-col bg-[#141414] lg:flex"
          >
            <div className="flex h-14 items-center justify-between border-b border-[#262626] px-4">
              <div className="flex gap-1 rounded-[12px] bg-[#1c1c1c] p-1">
                <button className="flex items-center gap-2 rounded-[10px] bg-[#2a2a2a] px-5 py-1.5 text-[13px] font-medium text-white">
                  <MessageSquare size={14} /> Chat
                </button>
                <button className="flex items-center gap-2 rounded-[10px] px-5 py-1.5 text-[13px] font-medium text-[#7c7c7c] hover:text-white transition-colors">
                  <Layout size={14} /> Content
                </button>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="rounded-full p-2 text-[#7c7c7c] transition-colors hover:bg-[#1c1c1c] hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-[#6b6b6b]">
                  <MessageSquare className="mb-4 h-8 w-8" />
                  <p>Here to help you learn</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[88%] rounded-[18px] border px-4 py-3 text-sm leading-7 ${
                          message.role === 'user'
                            ? 'border-[#3b2a22] bg-[#2a1d17] text-white'
                            : 'border-[#262626] bg-[#181818] text-[#d4d4d8]'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="rounded-[18px] border border-[#262626] bg-[#181818] px-4 py-3 text-sm text-[#8d8d8d]">
                        Thinking...
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="border-t border-[#262626] p-4">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={(event) => event.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about the material..."
                  className="app-input w-full pr-12"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#1d1d1d] text-[#b9b9b9] transition-colors hover:text-white disabled:opacity-40"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default NotesPage;
