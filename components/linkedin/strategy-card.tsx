'use client';

import { useState } from 'react';
import { StrategyCard } from '@/lib/types';
import { Pin, Copy, Check, Edit2, Trash2, ChevronDown, ChevronUp, Sparkles, Clock, ArrowRight } from 'lucide-react';

interface StrategyCardProps {
  card: StrategyCard;
  searchQuery?: string;
  onEdit?: (card: StrategyCard) => void;
  onDelete?: (id: string) => void;
}

export function StrategyCardComponent({ card, searchQuery = '', onEdit, onDelete }: StrategyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedContent, setCopiedContent] = useState(false);

  // Metricool signature category badge colors
  const categoryBadges: Record<string, string> = {
    Hook: 'bg-metricool-yellow text-metricool-purple font-extrabold border-2 border-metricool-purple',
    Algorithme: 'bg-metricool-pink text-white font-extrabold border-2 border-metricool-purple',
    Planning: 'bg-metricool-lightBlue text-metricool-purple font-extrabold border-2 border-metricool-purple',
    Format: 'bg-purple-200 text-purple-950 font-extrabold border-2 border-metricool-purple',
    Engagement: 'bg-amber-200 text-amber-950 font-extrabold border-2 border-metricool-purple',
    Copywriting: 'bg-blue-200 text-blue-950 font-extrabold border-2 border-metricool-purple',
  };

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

      {/* Article Title */}
      <h2 className="text-xl sm:text-2xl font-extrabold text-metricool-purple leading-snug hover:text-metricool-blue transition-colors">
        {highlightText(card.title)}
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

      {/* Expandable Article Content */}
      {card.content && (
        <div className="pt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full inline-flex items-center justify-between text-xs font-extrabold text-metricool-purple hover:text-metricool-blue transition-colors py-2 px-4 bg-slate-100 rounded-2xl border border-slate-200"
          >
            <span>{isExpanded ? 'Masquer l\'article détaillé' : 'Lire le guide complet & consignes'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isExpanded && (
            <div className="mt-3 p-5 bg-white rounded-2xl border-2 border-metricool-purple text-xs font-medium text-slate-800 space-y-3 leading-relaxed whitespace-pre-line shadow-xs">
              <div className="flex justify-end mb-1">
                <button
                  onClick={() => copyToClipboard(card.content)}
                  className="text-xs font-bold text-metricool-purple bg-metricool-yellow border border-metricool-purple px-3 py-1 rounded-xl shadow-2xs"
                >
                  {copiedContent ? 'Copié !' : 'Copier tout le texte'}
                </button>
              </div>
              {highlightText(card.content)}
            </div>
          )}
        </div>
      )}

    </article>
  );
}
