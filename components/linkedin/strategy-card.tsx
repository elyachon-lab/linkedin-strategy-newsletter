'use client';

import { useState } from 'react';
import Link from 'next/link';
import { StrategyCard } from '@/lib/types';
import { Pin, Copy, Check, Edit2, Trash2, Sparkles, Clock, ArrowRight, BookOpen } from 'lucide-react';

interface StrategyCardProps {
  card: StrategyCard;
  searchQuery?: string;
  onEdit?: (card: StrategyCard) => void;
  onDelete?: (id: string) => void;
}

export function StrategyCardComponent({ card, searchQuery = '', onEdit, onDelete }: StrategyCardProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Metricool signature category badge colors
  const categoryBadges: Record<string, string> = {
    Hook: 'bg-metricool-yellow text-metricool-purple font-extrabold border-2 border-metricool-purple',
    Algorithme: 'bg-metricool-pink text-white font-extrabold border-2 border-metricool-purple',
    Planning: 'bg-metricool-lightBlue text-metricool-purple font-extrabold border-2 border-metricool-purple',
    Format: 'bg-purple-200 text-purple-950 font-extrabold border-2 border-metricool-purple',
    Engagement: 'bg-amber-200 text-amber-950 font-extrabold border-2 border-metricool-purple',
    Copywriting: 'bg-blue-200 text-blue-950 font-extrabold border-2 border-metricool-purple',
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const wordCount = (card.summary + ' ' + (card.content || '')).split(/\s+/).length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 180));

  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text;
    const parts = text.split(new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <mark key={i} className="bg-metricool-yellow text-metricool-purple font-bold px-1 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <article className="bg-white rounded-3xl border-2 border-metricool-purple p-6 sm:p-7 metricool-card-shadow transition-all duration-300 flex flex-col justify-between space-y-4">
      
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider ${
              categoryBadges[card.category] || 'bg-slate-100 text-slate-900 border-2 border-slate-900'
            }`}
          >
            {card.category}
          </span>
          {card.is_pinned && (
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-metricool-purple text-metricool-yellow px-2.5 py-0.5 rounded-full">
              <Pin className="w-3 h-3 fill-current" /> Épinglé
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5 text-metricool-blue" /> {readingTimeMinutes} min de lecture
          </span>
          {onEdit && (
            <button
              onClick={() => onEdit(card)}
              className="p-1.5 text-slate-400 hover:text-metricool-purple rounded-lg hover:bg-slate-100 transition-colors"
              title="Modifier"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(card.id)}
              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
              title="Supprimer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Article Title - Click to open Full Page */}
      <h2 className="text-xl sm:text-2xl font-extrabold text-metricool-purple leading-snug hover:text-metricool-blue transition-colors">
        <Link href={`/linkedin-strategy/${card.id}`}>
          {highlightText(card.title)}
        </Link>
      </h2>

      {/* Summary */}
      <p className="text-sm font-medium text-slate-600 leading-relaxed">
        {highlightText(card.summary)}
      </p>

      {/* Tags */}
      {card.tags && card.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-lg"
            >
              #{highlightText(tag)}
            </span>
          ))}
        </div>
      )}

      {/* Metricool Style Hook Copy Box */}
      {card.examples && card.examples.length > 0 && (
        <div className="pt-3 border-t-2 border-slate-100 bg-metricool-lightBlue/30 -mx-6 -mb-6 p-6 space-y-2 rounded-b-3xl">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-metricool-purple flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-metricool-pink" /> Modèles de Hooks prêts à copier
          </h4>
          <div className="space-y-2">
            {card.examples.map((ex, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-2xl border-2 border-metricool-purple text-xs font-bold text-metricool-purple flex items-center justify-between gap-3 shadow-xs hover:border-metricool-blue transition-colors"
              >
                <span className="italic font-medium">"{highlightText(ex)}"</span>
                <button
                  onClick={() => copyToClipboard(ex, idx)}
                  className="shrink-0 bg-metricool-yellow text-metricool-purple font-extrabold px-3 py-1.5 rounded-xl border border-metricool-purple hover:bg-yellow-300 transition-colors inline-flex items-center gap-1 shadow-2xs"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" /> Copié !
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

      {/* Direct Full Page Link Button */}
      <div className="pt-3">
        <Link
          href={`/linkedin-strategy/${card.id}`}
          className="w-full inline-flex items-center justify-between text-xs font-extrabold text-metricool-purple hover:text-metricool-blue transition-colors py-2.5 px-4 bg-slate-100 hover:bg-metricool-yellow rounded-2xl border-2 border-metricool-purple shadow-2xs"
        >
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-metricool-purple" />
            Lire l'article complet en pleine page
          </span>
          <ArrowRight className="w-4 h-4 text-metricool-purple" />
        </Link>
      </div>

    </article>
  );
}
