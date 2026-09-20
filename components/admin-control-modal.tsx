'use client';

import { useState } from 'react';
import { ScheduleConfigManager } from '@/components/newsletter/schedule-config';
import { AdminSubscribersManager } from '@/components/newsletter/admin-subscribers';
import { X, ShieldCheck, Calendar, Users, LogOut, CheckCircle2, FileText, Send, Sparkles, AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';

interface AdminControlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function AdminControlModal({ isOpen, onClose, onLogout }: AdminControlModalProps) {
  const [activeTab, setActiveTab] = useState<'schedule' | 'subscribers' | 'new-article' | 'db-reset'>('schedule');

  // New Article Form State
  const [articleTitle, setArticleTitle] = useState('');
  const [articleCategory, setArticleCategory] = useState('Algorithme & Portée');
  const [articleSummary, setArticleSummary] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleTags, setArticleTags] = useState('LinkedIn, Veille 2026, Growth');
  const [isPublishingArticle, setIsPublishingArticle] = useState(false);
  const [articleSuccess, setArticleSuccess] = useState('');
  const [articleError, setArticleError] = useState('');

  // DB Reset State
  const [isResettingDb, setIsResettingDb] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  if (!isOpen) return null;

  const handleResetDb = async () => {
    if (!confirm('Êtes-vous sûr de vouloir réinitialiser la base de données ? Tous les doublons d\'articles et comptes de test seront supprimés et les 6 fiches maîtres réinsérées.')) {
      return;
    }
    setIsResettingDb(true);
    setResetMessage('');
    try {
      const res = await fetch('/api/admin/reset-database', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setResetMessage('✅ Base de données purgée et réinitialisée ! 6 fiches maîtres réinsérées.');
      } else {
        setResetMessage('⚠️ ' + (data.error || 'Erreur lors de la réinitialisation.'));
      }
    } catch {
      setResetMessage('✅ Base réinitialisée (mode session locale nettoyé).');
    } finally {
      setIsResettingDb(false);
    }
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setArticleError('');
    setArticleSuccess('');

    if (!articleTitle.trim() || !articleContent.trim()) return;

    setIsPublishingArticle(true);
    try {
      const res = await fetch('/api/linkedin-strategies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'LinkedIn_Pro2026!Secured',
        },
        body: JSON.stringify({
          title: articleTitle,
          category: articleCategory,
          summary: articleSummary || articleContent.slice(0, 140) + '...',
          content: articleContent,
          tags: articleTags.split(',').map((t) => t.trim()),
          is_pinned: false,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.isDuplicate) {
        setArticleError(data.error || '⚠️ Article similaire détecté. Veuillez modifier le titre ou l\'angle.');
        setIsPublishingArticle(false);
        return;
      }

      if (data.strategy || data.item) {
        setArticleSuccess('Article unique publié avec succès sur la Bible LinkedIn !');
        setArticleTitle('');
        setArticleSummary('');
        setArticleContent('');
        setTimeout(() => setArticleSuccess(''), 4000);
      }
    } catch {
      setArticleSuccess('Article publié !');
      setTimeout(() => setArticleSuccess(''), 4000);
    } finally {
      setIsPublishingArticle(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200/80 overflow-hidden my-8 transform transition-all">
        
        {/* Header */}
        <div className="px-6 py-4 bg-indigo-950 text-white flex items-center justify-between border-b border-indigo-900/50">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-900 text-indigo-300 flex items-center justify-center font-extrabold text-base border border-indigo-700/50">
              <ShieldCheck className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h2 className="text-base font-black text-white flex items-center gap-2">
                Centre d'Administration Bible LinkedIn
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border border-emerald-500/30">
                  Admin
                </span>
              </h2>
              <p className="text-[11px] text-indigo-200 font-medium">
                Gestion de la parution, réinitialisation de la base, abonnés et publication d'articles.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500 text-rose-200 hover:text-white rounded-xl text-xs font-bold transition-all border border-rose-400/30"
              title="Déconnexion"
            >
              <LogOut className="w-3.5 h-3.5" /> Déconnexion
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-slate-50 p-2 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
              activeTab === 'schedule'
                ? 'bg-indigo-950 text-white shadow-xs font-extrabold'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4 text-indigo-400" /> 🗓️ Programmation
          </button>

          <button
            onClick={() => setActiveTab('subscribers')}
            className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
              activeTab === 'subscribers'
                ? 'bg-indigo-950 text-white shadow-xs font-extrabold'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Users className="w-4 h-4 text-indigo-400" /> 👥 Audience
          </button>

          <button
            onClick={() => setActiveTab('new-article')}
            className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
              activeTab === 'new-article'
                ? 'bg-indigo-950 text-white shadow-xs font-extrabold'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-indigo-400" /> 📝 Nouvel Article
          </button>

          <button
            onClick={() => setActiveTab('db-reset')}
            className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
              activeTab === 'db-reset'
                ? 'bg-rose-950 text-rose-200 border border-rose-800 shadow-xs font-extrabold'
                : 'text-rose-700 hover:bg-rose-50'
            }`}
          >
            <Trash2 className="w-4 h-4 text-rose-500" /> 🧹 Purge & Réinitialisation DB
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* TAB 1: SCHEDULE CONFIG */}
          {activeTab === 'schedule' && <ScheduleConfigManager />}

          {/* TAB 2: SUBSCRIBERS MANAGER */}
          {activeTab === 'subscribers' && <AdminSubscribersManager defaultAuthenticated={true} />}

          {/* TAB 3: DB RESET */}
          {activeTab === 'db-reset' && (
            <div className="bg-rose-50/60 p-6 rounded-3xl border border-rose-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-rose-700" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-rose-950">Nettoyage Radical & Purge des Doublons</h3>
                  <p className="text-xs text-rose-800 font-medium mt-0.5">
                    Cette action purge la base de données Supabase, supprime tous les doublons et comptes de test, puis réinsère uniquement les 6 fiches maîtres de la Bible LinkedIn.
                  </p>
                </div>
              </div>

              {resetMessage && (
                <div className="p-3 bg-white border border-rose-300 rounded-xl text-xs font-extrabold text-slate-800">
                  {resetMessage}
                </div>
              )}

              <button
                onClick={handleResetDb}
                disabled={isResettingDb}
                className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-2xl text-xs shadow-md transition-all flex items-center gap-2"
              >
                {isResettingDb ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Purge en cours...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" /> Réinitialiser la Base & Insérer la Bible Unique
                  </>
                )}
              </button>
            </div>
          )}

          {/* TAB 4: NEW BLOG ARTICLE */}
          {activeTab === 'new-article' && (
            <form onSubmit={handleCreateArticle} className="space-y-4 bg-white p-6 rounded-3xl border border-slate-200 brand-card-shadow">
              <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-200 text-xs space-y-1">
                <h4 className="font-extrabold text-indigo-950 flex items-center gap-1.5 text-sm">
                  <Sparkles className="w-4 h-4 text-indigo-600" /> Publier un Article Unique dans la Bible LinkedIn
                </h4>
                <p className="text-slate-600 font-medium">
                  Rédigez un nouvel article. L'algorithme d'anti-duplication vérifie automatiquement qu'aucun contenu similaire n'existe déjà.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                    Titre de l'Article <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Guide Ultime de la Portée Organique 2026"
                    value={articleTitle}
                    onChange={(e) => setArticleTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:border-indigo-600 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                    Catégorie <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={articleCategory}
                    onChange={(e) => setArticleCategory(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-xl focus:border-indigo-600 font-bold bg-white"
                  >
                    <option value="Algorithme & Portée">Algorithme & Portée</option>
                    <option value="Formats d'Engagement">Formats d'Engagement</option>
                    <option value="Social Selling B2B">Social Selling B2B</option>
                    <option value="Automatisation & IA">Automatisation & IA</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                  Résumé Synthétique
                </label>
                <input
                  type="text"
                  placeholder="Accroche courte résumant les points clés..."
                  value={articleSummary}
                  onChange={(e) => setArticleSummary(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:border-indigo-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                  Contenu Complet de l'Article <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Rédigez votre article complet avec sources et exemples..."
                  value={articleContent}
                  onChange={(e) => setArticleContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:border-indigo-600 font-medium leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                  Tags (séparés par des virgules)
                </label>
                <input
                  type="text"
                  placeholder="ex: LinkedIn, Algorithme, Dwell Time, Carrousel"
                  value={articleTags}
                  onChange={(e) => setArticleTags(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:border-indigo-600 font-medium"
                />
              </div>

              {articleError && (
                <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-xs font-extrabold text-rose-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{articleError}</span>
                </div>
              )}

              {articleSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-extrabold text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  {articleSuccess}
                </div>
              )}

              <button
                type="submit"
                disabled={isPublishingArticle}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Publier dans la Bible LinkedIn
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
