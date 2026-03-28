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
  const isBookPage = location.pathname.startsWith('/book/');
  const isLibraryPage = location.pathname === '/library' || location.pathname === '/dashboard';
  const usePlainDarkBackground = isBookPage || isLibraryPage;

  const showSidebar = !isLandingPage && !isAuthPage && !isSidebarHidden;

  return (
    <div className={`${usePlainDarkBackground ? 'bg-black' : 'dot-grid-bg'} relative min-h-screen font-sans text-[#f4f4f5] selection:bg-white/10`}>
      {!usePlainDarkBackground && <InteractiveBackground />}

      <div className={`relative z-10 min-h-screen flex flex-col transition-all duration-300 ${showSidebar ? (isCollapsed ? 'pl-0 lg:pl-[72px]' : 'pl-0 lg:pl-60') : ''
        }`}>
        <main className="flex-1 w-full max-w-[1920px] mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
