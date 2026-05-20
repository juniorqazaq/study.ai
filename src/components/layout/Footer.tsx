import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-transparent bg-transparent py-8 text-neutral-400 font-sans text-sm mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center md:text-left">
          <Link to="/" className="text-white font-bold tracking-tight hover:opacity-85 transition-opacity">
            Study.ai
          </Link>
          <span className="text-neutral-500">© 2026. All rights reserved.</span>
          <div className="flex items-center gap-4 text-xs">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-neutral-700">|</span>
            <Link to="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="text-neutral-500 hover:text-white transition-colors" aria-label="Twitter">
            <Twitter size={18} />
          </a>
          <a href="#" className="text-neutral-500 hover:text-white transition-colors" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href="#" className="text-neutral-500 hover:text-white transition-colors" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
