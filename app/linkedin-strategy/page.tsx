'use client';

import { useState, useEffect } from 'react';
import { StrategyCard, StrategyCategory } from '@/lib/types';
import { INITIAL_STRATEGIES } from '@/lib/supabase/fallback-data';
import { StrategyCardComponent } from '@/components/linkedin/strategy-card';
import { StrategyModal } from '@/components/linkedin/strategy-modal';
import { Search, Plus, BookOpen, Filter, Pin, RefreshCw, Sparkles } from 'lucide-react';

export default function StrategyCenterPage() {
  const [strategies, setStrategies] = useState<StrategyCard[]>(INITIAL_STRATEGIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<StrategyCard | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['Tous', 'Hook', 'Algorithme', 'Planning', 'Format', 'Engagement', 'Copywriting'];

  const fetchStrategies = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/linkedin-strategies');
      const data = await res.json();
      if (data.strategies) {
        setStrategies(data.strategies);
      }
    } catch {
      // Keep state
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStrategies();
  }, []);

  const handleSaveCard = async (cardData: Partial<StrategyCard>) => {
    if (cardData.id) {
      // Update
      setStrategies((prev) =>
        prev.map((c) => (c.id === cardData.id ? ({ ...c, ...cardData } as StrategyCard) : c))
      );
      try {
        await fetch('/api/linkedin-strategies', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cardData),
        });
      } catch {}
    } else {
      // Insert
      const newCard: StrategyCard = {
        id: 'strat-' + Date.now(),
        title: cardData.title || '',
        category: (cardData.category as StrategyCategory) || 'Hook',
        tags: cardData.tags || [],
        summary: cardData.summary || '',
        content: cardData.content || '',
        examples: cardData.examples || [],
        is_pinned: cardData.is_pinned || false,
        created_at: new Date().toISOString(),
      };
      setStrategies([newCard, ...strategies]);
      try {
        await fetch('/api/linkedin-strategies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cardData),
        });
      } catch {}
    }
  };

  const handleDeleteCard = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette fiche ?')) {
      setStrategies((prev) => prev.filter((c) => c.id !== id));
      try {
        await fetch(`/api/linkedin-strategies?id=${id}`, { method: 'DELETE' });
      } catch {}
    }
  };

  const handleEdit = (card: StrategyCard) => {
    setEditingCard(card);
    setIsModalOpen(true);
  };

  const filteredStrategies = strategies
    .filter((strat) => {
      // Category filter
      if (selectedCategory !== 'Tous' && strat.category !== selectedCategory) {
        return false;
      }
      // Keyword search
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        strat.title.toLowerCase().includes(q) ||
        strat.summary.toLowerCase().includes(q) ||
        strat.content.toLowerCase().includes(q) ||
        strat.category.toLowerCase().includes(q) ||
        (strat.tags && strat.tags.some((t) => t.toLowerCase().includes(q))) ||
        (strat.examples && strat.examples.some((ex) => ex.toLowerCase().includes(q)))
      );
    })
    .sort((a, b) => {
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      return 0;
    });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <BookOpen className="w-7 h-7 text-blue-600" />
            Centre de Stratégie LinkedIn
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Recherchez et gérez vos fiches stratégiques, formules d'accroches et consignes algorithmiques.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchStrategies}
            className="p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            title="Rafraîchir"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => {
              setEditingCard(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" /> Nouvelle Fiche
          </button>
        </div>
      </div>

      {/* Search & Filters Toolbar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        
        {/* Keyword Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Recherche intelligente par mots-clés (titre, tag, exemple, notion d'algorithme)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5" /> Catégories :
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Strategy Grid */}
      {filteredStrategies.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-3">
          <Sparkles className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Aucune fiche ne correspond à votre recherche</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Essayez de modifier votre mot-clé "{searchQuery}" ou de sélectionner une autre catégorie.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Tous');
            }}
            className="text-xs font-semibold text-blue-600 hover:underline pt-2 inline-block"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredStrategies.map((card) => (
            <StrategyCardComponent
              key={card.id}
              card={card}
              searchQuery={searchQuery}
              onEdit={handleEdit}
              onDelete={handleDeleteCard}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <StrategyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCard}
        initialData={editingCard}
      />

    </div>
  );
}
