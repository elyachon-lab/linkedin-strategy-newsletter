'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Mail, Sparkles, Layers, PenTool, ArrowUpRight } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      
      {/* Metricool Top Gradient Announcement Bar */}
      <div className="metricool-gradient-bar py-1.5 px-4 text-center text-white text-xs font-semibold flex items-center justify-center gap-2">
        <span>⚡ Guide & Veille Tech LinkedIn • Moteur d'accroches & meilleures pratiques 2026</span>
        <span className="hidden sm:inline bg-white/20 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold">Pro</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Metricool Style */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-2xl bg-metricool-purple text-metricool-yellow flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-metricool-purple tracking-tight leading-none flex items-center gap-1">
                LinkedIn Blog <span className="w-2 h-2 rounded-full bg-metricool-pink inline-block animate-pulse" />
              </span>
              <span className="text-xs text-slate-500 font-medium mt-1">
                Guide des Réseaux Sociaux & Content Strategy
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link
              href="/"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                pathname === '/'
                  ? 'bg-metricool-lightBlue text-metricool-purple border border-metricool-blue/30'
                  : 'text-slate-700 hover:text-metricool-purple hover:bg-slate-100'
              }`}
            >
              Accueil Blog
            </Link>

            <Link
              href="/linkedin-strategy"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                pathname === '/linkedin-strategy'
                  ? 'bg-metricool-lightBlue text-metricool-purple border border-metricool-blue/30'
                  : 'text-slate-700 hover:text-metricool-purple hover:bg-slate-100'
              }`}
            >
              Fiches & Stratégie
            </Link>

            <Link
              href="/newsletter"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                pathname.startsWith('/newsletter')
                  ? 'bg-purple-50 text-purple-900 border border-purple-200'
                  : 'text-slate-700 hover:text-metricool-purple hover:bg-slate-100'
              }`}
            >
              Newsletter de Veille
            </Link>
          </nav>

          {/* Action CTA Button - Metricool Style */}
          <div className="flex items-center space-x-3">
            <Link
              href="/newsletter/create"
              className="inline-flex items-center gap-2 px-5 py-3 bg-metricool-purple hover:bg-black text-metricool-yellow rounded-2xl text-xs font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <PenTool className="w-4 h-4 text-metricool-yellow" />
              Rédiger une édition
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
