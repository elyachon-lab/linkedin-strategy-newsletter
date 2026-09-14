'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Linkedin, Mail, Sparkles, BookOpen, Layers } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand / Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Linkedin className="w-6 h-6 fill-current" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
                LinkedIn Strategy <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full border border-blue-200">Pro</span>
              </span>
              <span className="text-xs text-slate-500 block font-normal">
                Guide & Veille Tech Newsletter
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                pathname === '/'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-4 h-4 text-slate-500" />
              Vue d'ensemble
            </Link>

            <Link
              href="/linkedin-strategy"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                pathname === '/linkedin-strategy'
                  ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              Centre de Stratégie
            </Link>

            <Link
              href="/newsletter"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                pathname.startsWith('/newsletter')
                  ? 'bg-purple-50 text-purple-700 font-semibold border border-purple-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Mail className="w-4 h-4 text-purple-600" />
              Newsletter de Veille
            </Link>
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center space-x-3">
            <Link
              href="/newsletter/create"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm transition-all hover:shadow hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-4 h-4" />
              Nouvelle Édition
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
