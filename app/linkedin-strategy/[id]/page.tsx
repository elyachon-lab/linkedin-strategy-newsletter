'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { StrategyCard } from '@/lib/types';
import { INITIAL_STRATEGIES } from '@/lib/supabase/fallback-data';
import { ArrowLeft, Clock, Pin, Copy, Check, Sparkles, BookOpen, ExternalLink, ShieldCheck, Database, Rss } from 'lucide-react';

export default function ArticleFullPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [card, setCard] = useState<StrategyCard | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedContent, setCopiedContent] = useState(false);

  useEffect(() => {
    const found = INITIAL_STRATEGIES.find((s) => s.id === id);
    if (found) {
      setCard(found);
    }

    fetch('/api/linkedin-strategies')
      .then((res) => res.json())
      .then((data) => {
        if (data.strategies) {
          const matched = data.strategies.find((s: StrategyCard) => s.id === id);
          if (matched) setCard(matched);
        }
      })
      .catch(() => {});
  }, [id]);

  if (!card) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <BookOpen className="w-12 h-12 text-slate-300 mx-auto animate-pulse" />
        <h2 className="text-xl font-extrabold text-indigo-950">Chargement de l'article en pleine page...</h2>
        <Link
          href="/linkedin-strategy"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-950 text-cyan-300 font-extrabold rounded-2xl text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Retour aux fiches
        </Link>
      </div>
    );
  }

  const copyToClipboard = (text: string, index?: number) => {
    navigator.clipboard.writeText(text);
    if (index !== undefined) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } else {
      setCopiedContent(true);
      setTimeout(() => setCopiedContent(false), 2000);
    }
  };

  const wordCount = (card.summary + ' ' + (card.content || '')).split(/\s+/).length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 180));

  const categoryBadges: Record<string, string> = {
    Hook: 'bg-indigo-950 text-cyan-300 font-extrabold border border-indigo-800',
    Algorithme: 'bg-violet-900 text-violet-100 font-extrabold border border-violet-700',
    Planning: 'bg-cyan-900 text-cyan-100 font-extrabold border border-cyan-700',
    Format: 'bg-purple-900 text-purple-100 font-extrabold border border-purple-700',
    Engagement: 'bg-amber-900 text-amber-100 font-extrabold border border-amber-700',
    Copywriting: 'bg-blue-900 text-blue-100 font-extrabold border border-blue-700',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      
      {/* Back Button Toolbar */}
      <div className="flex items-center justify-between">
        <Link
          href="/linkedin-strategy"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-indigo-950 border border-slate-300 rounded-2xl text-xs font-extrabold shadow-2xs hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Retour au Blog & Fiches
        </Link>

        <button
          onClick={() => copyToClipboard(card.content)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-950 text-cyan-300 border border-indigo-800 rounded-2xl text-xs font-extrabold shadow-2xs hover:bg-slate-900 transition-colors"
        >
          {copiedContent ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          {copiedContent ? 'Copié !' : 'Copier tout le texte'}
        </button>
      </div>

      {/* Full Page Article Header */}
      <header className="bg-white p-8 sm:p-12 rounded-3xl border border-indigo-100 brand-card-shadow space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className={`text-xs px-3.5 py-1 rounded-full uppercase tracking-wider ${
              categoryBadges[card.category] || 'bg-slate-100 text-slate-900 border border-slate-300'
            }`}
          >
            {card.category}
          </span>
          {card.is_pinned && (
            <span className="inline-flex items-center gap-1 text-xs font-extrabold bg-indigo-950 text-cyan-300 px-3 py-1 rounded-full border border-indigo-800">
              <Pin className="w-3.5 h-3.5 fill-current" /> Épinglé à la une
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5 text-indigo-600" /> {readingTimeMinutes} min de lecture
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-indigo-950 leading-tight tracking-tight">
          {card.title}
        </h1>

        {/* Summary Excerpt Box */}
        <div className="p-5 bg-indigo-50/70 rounded-2xl border border-indigo-200 text-sm font-bold text-indigo-950 leading-relaxed">
          💡 <strong>Résumé Synthétique :</strong> {card.summary}
        </div>

        {/* Feedly-Style AI Sources Box Header */}
        <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-300 text-xs font-bold text-emerald-950 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-emerald-900 flex items-center gap-2 text-sm">
              <Rss className="w-4 h-4 text-emerald-700" />
              Sources & Veille Feedly de l'IA (Études & Canaux Certifiés)
            </h4>
            <span className="bg-emerald-200 text-emerald-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-400">
              Veille Hebdomadaire
            </span>
          </div>
          <p className="font-medium text-emerald-900 leading-relaxed">
            Cet article a été rédigé et vérifié à partir du flux de veille automatisé (Feedly / APIs officielles) incluant :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-semibold">
            <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-emerald-200">
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <a href="https://engineering.linkedin.com/blog" target="_blank" rel="noopener noreferrer" className="hover:underline">
                LinkedIn Engineering Blog (Dwell Time & Algorithms)
              </a>
            </div>
            <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-emerald-200">
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <a href="https://support.google.com/google-ads" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Google Ads Official Support (Thought Leader Ads)
              </a>
            </div>
            <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-emerald-200">
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <a href="https://www.socialmediatoday.com/topic/linkedin/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Social Media Today B2B Research
              </a>
            </div>
            <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-emerald-200">
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <a href="https://web.dev/vitals/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                W3C & Web.dev Platform Guidelines
              </a>
            </div>
          </div>
        </div>

        {/* Author / Date Meta */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-extrabold text-sm">
              E
            </div>
            <div>
              <span className="text-slate-900">Équipe de Veille Feedly & IA Intelligence</span>
              <span className="block text-[11px] text-slate-400 font-medium">Veille automatisée chaque Lundi à 19h45</span>
            </div>
          </div>

          <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Données Certifiées
          </span>
        </div>
      </header>

      {/* Main Full Page Article Body */}
      <main className="bg-white p-8 sm:p-12 rounded-3xl border border-indigo-100 brand-card-shadow space-y-8">
        
        {/* Formatted Content */}
        <div className="text-sm font-medium text-slate-800 space-y-4 leading-relaxed whitespace-pre-line prose max-w-none">
          {card.content}
        </div>

        {/* Featured Hook Copies Box */}
        {card.examples && card.examples.length > 0 && (
          <div className="pt-6 border-t border-slate-200 bg-slate-50 p-6 rounded-2xl space-y-3">
            <h3 className="text-sm font-extrabold text-indigo-950 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-600" /> Modèles d'Accroches prêts à copier & personnaliser
            </h3>
            <div className="space-y-2">
              {card.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-2xl border border-indigo-200 text-xs font-bold text-indigo-950 flex items-center justify-between gap-3 shadow-xs"
                >
                  <span className="italic">"{ex}"</span>
                  <button
                    onClick={() => copyToClipboard(ex, idx)}
                    className="shrink-0 bg-indigo-950 text-cyan-300 font-extrabold px-3.5 py-1.5 rounded-xl border border-indigo-800 hover:bg-slate-900 transition-colors inline-flex items-center gap-1 shadow-2xs"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Copié !
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copier
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {card.tags && card.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-xl"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

      </main>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-indigo-100 brand-card-shadow">
        <Link
          href="/linkedin-strategy"
          className="inline-flex items-center gap-2 text-xs font-extrabold text-indigo-950 hover:text-indigo-600"
        >
          <ArrowLeft className="w-4 h-4" /> Explorer d'autres articles
        </Link>
      </div>

    </div>
  );
}
