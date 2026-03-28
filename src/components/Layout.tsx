import { ReactNode } from 'react';
import { InteractiveBackground } from './InteractiveBackground';
import { useLocation } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isCollapsed, isSidebarHidden } = useSidebar();
  const location = useLocation();

  // Check if we should show the main sidebar (vs book mode)
  // This logic is mirrored from App.tsx - ideally should be passed via context or props, 
  // but for now we infer it to set the correct padding.
  // const isBookPage = location.pathname.startsWith('/book/');
  const isLandingPage = location.pathname === '/';
  const isAuthPage = ['/login', '/register', '/pricing', '/email-verification-sent', '/features', '/resources', '/support'].includes(location.pathname);

  const showSidebar = !isLandingPage && !isAuthPage && !isSidebarHidden;

  return (
    <div className="min-h-screen relative bg-[#101010] font-sans text-[#f4f4f5] selection:bg-white/10">
      <InteractiveBackground />

      <div className={`relative z-10 min-h-screen flex flex-col transition-all duration-300 ${showSidebar ? (isCollapsed ? 'pl-0 lg:pl-[72px]' : 'pl-0 lg:pl-60') : ''
        }`}>
        <main className="flex-1 w-full max-w-[1920px] mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
