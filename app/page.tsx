'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { StrategyCard, NewsletterIssue } from '@/lib/types';
import { INITIAL_STRATEGIES, INITIAL_NEWSLETTERS } from '@/lib/supabase/fallback-data';
import { StrategyCardComponent } from '@/components/linkedin/strategy-card';
import { TimingGridComponent } from '@/components/linkedin/timing-grid';
import { Search, BookOpen, Mail, Sparkles, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export default function DashboardPage() {
  const [strategies, setStrategies] = useState<StrategyCard[]>(INITIAL_STRATEGIES);
  const [newsletters, setNewsletters] = useState<NewsletterIssue[]>(INITIAL_NEWSLETTERS);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/linkedin-strategies')
      .then((res) => res.json())
      .then((data) => {
        if (data.strategies) setStrategies(data.strategies);
      })
      .catch(() => {});

    fetch('/api/newsletter')
      .then((res) => res.json())
      .then((data) => {
        if (data.newsletters) setNewsletters(data.newsletters);
      })
      .catch(() => {});
  }, []);

  const filteredStrategies = strategies.filter((strat) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      strat.title.toLowerCase().includes(q) ||
      strat.summary.toLowerCase().includes(q) ||
      strat.category.toLowerCase().includes(q) ||
      strat.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8">
      
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl">
        <div className="absolute right-0 top-0 -mt-12 -mr-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5" /> Centre de Commandement Content & Veille Tech
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Optimisez vos publications LinkedIn & pilotez votre Newsletter de Veille.
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Retrouvez instantanément la bonne accroche, appliquez les règles algorithmiques de l'année, et rédigez votre curation hebdomadaire en quelques clics.
          </p>

          {/* Quick Search Bar */}
          <div className="pt-2">
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher un conseil ('hook', 'carrousel', 'dwell time', 'planning')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-slate-900/80 text-sm transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{strategies.length}</div>
            <div className="text-xs text-slate-500 font-medium">Fiches Stratégiques LinkedIn</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xl">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{newsletters.length}</div>
            <div className="text-xs text-slate-500 font-medium">Éditions Newsletter</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">4 Plages</div>
            <div className="text-xs text-slate-500 font-medium">Créneaux Viraux / Semaine</div>
          </div>
        </div>
      </div>

      {/* Best Posting Times Heatmap */}
      <TimingGridComponent />

      {/* Strategy Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            {searchQuery ? `Résultats pour "${searchQuery}" (${filteredStrategies.length})` : 'Fiches Stratégiques Populaires'}
          </h2>
          <Link
            href="/linkedin-strategy"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            Tout explorer <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStrategies.slice(0, 4).map((card) => (
            <StrategyCardComponent key={card.id} card={card} searchQuery={searchQuery} />
          ))}
        </div>
      </div>

      {/* Newsletter Preview Section */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-purple-600" />
            Dernières Éditions Newsletter
          </h2>
          <Link
            href="/newsletter"
            className="text-xs font-semibold text-purple-600 hover:text-purple-800 flex items-center gap-1"
          >
            Gérer les éditions <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {newsletters.map((issue) => (
            <div key={issue.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-md">
                  Édition #{issue.issue_number}
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    issue.status === 'sent'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {issue.status === 'sent' ? 'Envoyé' : 'Brouillon'}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base leading-snug">{issue.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-2">{issue.subject_line}</p>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <span className="text-xs text-slate-400">
                  {issue.articles ? `${issue.articles.length} article(s) curé(s)` : '0 article'}
                </span>
                <Link
                  href="/newsletter/create"
                  className="text-xs font-semibold text-purple-600 hover:underline"
                >
                  Ouvrir l'éditeur →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
