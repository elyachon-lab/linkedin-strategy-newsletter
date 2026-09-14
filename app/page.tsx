'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { StrategyCard, NewsletterIssue } from '@/lib/types';
import { INITIAL_STRATEGIES, INITIAL_NEWSLETTERS } from '@/lib/supabase/fallback-data';
import { StrategyCardComponent } from '@/components/linkedin/strategy-card';
import { TimingGridComponent } from '@/components/linkedin/timing-grid';
import { Search, ArrowRight, Sparkles, BookOpen, Calendar, Clock, Feather, Mail } from 'lucide-react';

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

  const featuredCard = strategies.find((s) => s.is_pinned) || strategies[0];

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
    <div className="space-y-12 max-w-6xl mx-auto">
      
      {/* Blog Editorial Header & Search */}
      <div className="border-b border-slate-200 pb-10 pt-4 text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200/60">
          <Feather className="w-3.5 h-3.5" /> Le Journal & Guide Stratégique
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          L'art de publier sur LinkedIn & de réussir sa veille tech.
        </h1>

        <p className="font-sans text-base text-slate-600 leading-relaxed">
          Analyses de l'algorithme, structures d'accroches virales, heatmaps d'audience et récapitulatifs hebdomadaires rédigés pour les créateurs.
        </p>

        {/* Editorial Search Bar */}
        <div className="pt-4 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un article ou un conseil ('hook', 'carrousel', 'dwell time')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm shadow-xs transition-all"
            />
          </div>
        </div>
      </div>

      {/* Featured Main Story Hero */}
      {!searchQuery && featuredCard && (
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="inline-block bg-blue-500/30 text-blue-200 border border-blue-400/30 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              À La Une • {featuredCard.category}
            </span>
            
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight text-white">
              {featuredCard.title}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {featuredCard.summary}
            </p>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/linkedin-strategy"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 hover:bg-blue-50 rounded-full font-semibold text-xs shadow-md transition-all hover:scale-105"
              >
                Lire l'article complet <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Timing Grid Heatmap */}
      <TimingGridComponent />

      {/* Articles Feed */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            {searchQuery ? `Résultats de recherche ("${searchQuery}")` : 'Dernières Fiches & Guides Rédigés'}
          </h2>
          <Link
            href="/linkedin-strategy"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 font-sans"
          >
            Voir tous les articles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStrategies.map((card) => (
            <StrategyCardComponent key={card.id} card={card} searchQuery={searchQuery} />
          ))}
        </div>
      </section>

      {/* Newsletter Editions Feed (Substack / Blog Archive Style) */}
      <section className="space-y-6 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="font-serif text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-purple-600" />
            Archives de la Newsletter de Veille
          </h2>
          <Link
            href="/newsletter"
            className="text-xs font-semibold text-purple-600 hover:text-purple-800 flex items-center gap-1 font-sans"
          >
            Accéder au Studio <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsletters.map((issue) => (
            <article
              key={issue.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-purple-700 bg-purple-100/80 px-2.5 py-0.5 rounded-full border border-purple-200">
                    Édition #{issue.issue_number}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {issue.sent_at ? new Date(issue.sent_at).toLocaleDateString('fr-FR') : 'Brouillon'}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-slate-900 leading-snug hover:text-purple-700 transition-colors">
                  {issue.title}
                </h3>
                <p className="font-sans text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {issue.subject_line}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-500">
                  {issue.articles ? `${issue.articles.length} ressource(s) sélectionnée(s)` : ''}
                </span>
                <Link
                  href="/newsletter/create"
                  className="text-xs font-semibold text-purple-600 hover:underline flex items-center gap-1 font-sans"
                >
                  Lire l'édition →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
