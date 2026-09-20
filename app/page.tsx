'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { StrategyCard, NewsletterIssue, LinkedInUserProfile } from '@/lib/types';
import { INITIAL_STRATEGIES, INITIAL_NEWSLETTERS } from '@/lib/supabase/fallback-data';
import { StrategyCardComponent } from '@/components/linkedin/strategy-card';
import { TimingGridComponent } from '@/components/linkedin/timing-grid';
import { SubscribeWidget } from '@/components/newsletter/subscribe-widget';
import { AIAuditRecommendations } from '@/components/linkedin/ai-recommendations';
import { Search, ArrowRight, Sparkles, BookOpen, Calendar, Mail, Filter, CheckCircle2 } from 'lucide-react';

export default function DashboardPage() {
  const [strategies, setStrategies] = useState<StrategyCard[]>(INITIAL_STRATEGIES);
  const [newsletters, setNewsletters] = useState<NewsletterIssue[]>(INITIAL_NEWSLETTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [clientProfile, setClientProfile] = useState<LinkedInUserProfile | null>(null);

  const categories = ['Tous', 'Hook', 'Algorithme', 'Planning', 'Format', 'Engagement', 'Copywriting'];

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

    const saved = localStorage.getItem('linkedin_user_profile');
    if (saved) {
      try {
        setClientProfile(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const featuredCard = strategies.find((s) => s.is_pinned) || strategies[0];

  const filteredStrategies = strategies.filter((strat) => {
    if (selectedCategory !== 'Tous' && strat.category !== selectedCategory) {
      return false;
    }
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
    <div className="space-y-12 max-w-7xl mx-auto">
      
      {/* Hero Banner Header */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-indigo-100 brand-card-shadow text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-extrabold border border-indigo-200 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-indigo-600" /> Blog & Centre de Ressources LinkedIn
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-indigo-950 tracking-tight leading-tight max-w-4xl mx-auto">
          Blog LinkedIn : Votre guide ultime pour dompter l'algorithme & captiver votre audience.
        </h1>

        <p className="text-base font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Conseils utiles, statistiques d'audiences, structures d'accroches virales et récapitulatifs hebdomadaires de veille tech.
        </p>

        {/* Big Search Bar */}
        <div className="pt-2 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-5 top-4 w-6 h-6 text-slate-400" />
            <input
              type="text"
              placeholder="Que recherchez-vous ? ('hook', 'carrousel', 'dwell time', 'planning')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-32 py-4 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:bg-white text-sm font-bold shadow-xs transition-all"
            />
            <button
              onClick={() => {}}
              className="absolute right-2 top-2 bottom-2 px-5 bg-indigo-950 text-cyan-300 font-extrabold rounded-xl text-xs hover:bg-slate-900 transition-colors"
            >
              Rechercher
            </button>
          </div>
        </div>

        {/* Category Pills (Filter Buttons) */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all border ${
                selectedCategory === cat
                  ? 'bg-indigo-950 text-cyan-300 border-indigo-800 shadow-sm scale-105'
                  : 'bg-slate-50 text-slate-700 border-slate-300 hover:border-indigo-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* AI Personalized Recommendations Widget for Logged In Profile */}
      {clientProfile && <AIAuditRecommendations profile={clientProfile} />}

      {/* Featured Main Article (Spotlight) */}
      {!searchQuery && selectedCategory === 'Tous' && featuredCard && (
        <section className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-indigo-800/50 brand-card-shadow relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-block bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full">
              À La Une • {featuredCard.category}
            </span>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight text-white">
              {featuredCard.title}
            </h2>

            <p className="text-slate-200 text-sm sm:text-base font-medium leading-relaxed">
              {featuredCard.summary}
            </p>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/linkedin-strategy"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-2xl font-extrabold text-xs shadow-lg shadow-indigo-600/20 transition-all hover:scale-105"
              >
                Lire l'article complet <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Best Posting Times Heatmap */}
      <TimingGridComponent />

      {/* Articles Feed */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-extrabold text-indigo-950 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            {searchQuery
              ? `Résultats pour "${searchQuery}" (${filteredStrategies.length})`
              : `Articles & Guides LinkedIn (${filteredStrategies.length})`}
          </h2>
          <Link
            href="/linkedin-strategy"
            className="text-xs font-extrabold text-indigo-600 hover:text-indigo-950 flex items-center gap-1"
          >
            Voir toutes les fiches <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {filteredStrategies.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
            <Sparkles className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-extrabold text-slate-800">Aucune fiche ne correspond à votre filtre</h3>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Tous');
              }}
              className="text-xs font-extrabold text-indigo-950 underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStrategies.map((card) => (
              <StrategyCardComponent key={card.id} card={card} searchQuery={searchQuery} />
            ))}
          </div>
        )}
      </section>

      {/* Public Newsletter Subscribe Widget */}
      <SubscribeWidget />

      {/* Newsletter Section Banner */}
      <section className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-indigo-800/50 brand-card-shadow space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-bold border border-indigo-400/30">
              <Mail className="w-3.5 h-3.5" /> Newsletter Hebdomadaire
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Restez à la pointe de la Veille Tech & des Tendances Social Media.
            </h2>
            <p className="text-sm text-slate-300 font-medium">
              Chaque semaine, recevez nos curations d'articles, études de cas et mises à jour fonctionnelles.
            </p>
          </div>

          <Link
            href="/newsletter/create"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-950 text-cyan-300 hover:bg-slate-800 font-extrabold text-xs rounded-2xl shadow-md shrink-0 transition-all hover:scale-105 border border-indigo-800"
          >
            Accéder au Studio de Rédaction <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Newsletter Issues Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-indigo-800/50">
          {newsletters.map((issue) => (
            <div
              key={issue.id}
              className="bg-white text-indigo-950 p-6 rounded-2xl border border-indigo-100 space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-indigo-900 bg-indigo-100 px-3 py-0.5 rounded-full border border-indigo-300">
                  Édition #{issue.issue_number}
                </span>
                <span
                  className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                    issue.status === 'sent'
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {issue.status === 'sent' ? 'Envoyé' : 'Brouillon'}
                </span>
              </div>

              <h3 className="text-lg font-extrabold leading-snug">{issue.title}</h3>
              <p className="text-xs text-slate-600 font-medium line-clamp-2">{issue.subject_line}</p>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs font-bold">
                <span className="text-slate-500">
                  {issue.articles ? `${issue.articles.length} article(s) curé(s)` : ''}
                </span>
                <Link href="/newsletter/create" className="text-indigo-600 hover:underline">
                  Ouvrir l'édition →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
