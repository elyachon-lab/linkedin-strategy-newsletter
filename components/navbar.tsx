'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Mail, Sparkles, Layers, PenTool } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo - Native Blog Style */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-serif text-lg font-bold shadow-sm group-hover:bg-blue-600 transition-colors">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
                LinkedIn Strategy <span className="font-sans text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full ml-1 border border-blue-100">Journal</span>
              </span>
              <span className="text-[11px] text-slate-500 font-sans mt-0.5">
                Guide, Best Practices & Veille Tech
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 font-sans">
            <Link
              href="/"
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                pathname === '/'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Accueil Blog
            </Link>

            <Link
              href="/linkedin-strategy"
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                pathname === '/linkedin-strategy'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Fiches & Stratégie
            </Link>

            <Link
              href="/newsletter"
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                pathname.startsWith('/newsletter')
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              Éditions Newsletter
            </Link>
          </nav>

          {/* Action */}
          <div className="flex items-center space-x-3">
            <Link
              href="/newsletter/create"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-full text-xs font-semibold transition-all shadow-xs hover:shadow"
            >
              <PenTool className="w-3.5 h-3.5" />
              Nouvel Article
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
