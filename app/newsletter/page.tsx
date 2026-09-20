'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NewsletterIssue } from '@/lib/types';
import { INITIAL_NEWSLETTERS } from '@/lib/supabase/fallback-data';
import { SendModal } from '@/components/newsletter/send-modal';
import { SubscribeWidget } from '@/components/newsletter/subscribe-widget';
import { AdminSubscribersManager } from '@/components/newsletter/admin-subscribers';
import { ScheduleConfigManager } from '@/components/newsletter/schedule-config';
import { Mail, Plus, Sparkles, Send, CheckCircle2, Clock, Calendar, Globe, Shield, Users } from 'lucide-react';

export default function NewsletterDashboardPage() {
  const [newsletters, setNewsletters] = useState<NewsletterIssue[]>(INITIAL_NEWSLETTERS);
  const [selectedForSend, setSelectedForSend] = useState<NewsletterIssue | null>(null);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'public' | 'issues' | 'admin'>('public');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const savedAdmin = localStorage.getItem('is_admin_logged_in');
    if (savedAdmin === 'true') {
      setIsAdminLoggedIn(true);
    }

    fetch('/api/newsletter')
      .then((res) => res.json())
      .then((data) => {
        if (data.newsletters) setNewsletters(data.newsletters);
      })
      .catch(() => {});
  }, []);

  const handleOpenSend = (issue: NewsletterIssue) => {
    setSelectedForSend(issue);
    setIsSendModalOpen(true);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-indigo-100 brand-card-shadow">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-extrabold border border-indigo-200 mb-2">
            <Mail className="w-4 h-4 text-indigo-600" /> Newsletter & Veille Tech Hebdomadaire
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-950 tracking-tight">
            Veille IA & LinkedIn • Inscription & Éditions
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Recevez chaque semaine la synthèse certifiée des évolutions de l'algorithme, des études Dwell Time et des hacks B2B.
          </p>
        </div>

        {isAdminLoggedIn && (
          <Link
            href="/newsletter/create"
            className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-950 hover:bg-slate-900 text-cyan-300 border border-indigo-800 rounded-2xl font-extrabold text-xs shadow-md transition-all shrink-0 hover:scale-105"
          >
            <Plus className="w-4 h-4 text-cyan-300" /> Rédiger une Nouvelle Édition
          </Link>
        )}
      </div>

      {/* Navigation Sub-Tabs (Conditionned by Admin Access) */}
      {isAdminLoggedIn && (
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('public')}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
              activeTab === 'public'
                ? 'bg-indigo-950 text-cyan-300 shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Mail className="w-3.5 h-3.5 inline mr-1.5" /> Widget d'Inscription Public
          </button>

          <button
            onClick={() => setActiveTab('issues')}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
              activeTab === 'issues'
                ? 'bg-indigo-950 text-cyan-300 shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 inline mr-1.5" /> Éditions & Brouillons ({newsletters.length})
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
              activeTab === 'admin'
                ? 'bg-indigo-950 text-cyan-300 border border-indigo-800 shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5 inline mr-1.5 text-cyan-400" /> Espace Administrateur Abonnés 🔒
          </button>
        </div>
      )}

      {/* TAB 1: Public Subscribe Form */}
      {activeTab === 'public' && (
        <div className="space-y-6">
          <SubscribeWidget />

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-lg font-extrabold text-indigo-950 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" /> Pourquoi s'abonner à cette Veille ?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-slate-700 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <h4 className="font-extrabold text-indigo-950 text-sm">🤖 1. Curation Automatisée par IA</h4>
                <p className="text-slate-600">Synthèse des pépites dev, frameworks et modèles LLM de la semaine.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <h4 className="font-extrabold text-indigo-950 text-sm">📈 2. Mises à Jour LinkedIn 2.0</h4>
                <p className="text-slate-600">Décryptage des changements d'algorithme et conseils de reach.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <h4 className="font-extrabold text-indigo-950 text-sm">🔒 3. Respect de la Vie Privée</h4>
                <p className="text-slate-600">Aucune revente de données, désinscription instantanée en 1 clic.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Issues List */}
      {activeTab === 'issues' && (
        <div className="space-y-4">
          {newsletters.map((issue) => (
            <div
              key={issue.id}
              className="bg-white p-6 rounded-3xl border border-indigo-100 brand-card-shadow transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-extrabold text-indigo-900 bg-indigo-100 px-3 py-0.5 rounded-full border border-indigo-300">
                    Édition #{issue.issue_number}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-extrabold px-3 py-0.5 rounded-full ${
                      issue.status === 'sent'
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {issue.status === 'sent' ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Envoyé
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5 text-amber-600" /> Brouillon
                      </>
                    )}
                  </span>
                  {issue.sent_at && (
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Envoyé le {new Date(issue.sent_at).toLocaleDateString('fr-FR')}
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-extrabold text-indigo-950 leading-snug">{issue.title}</h2>
                <p className="text-xs text-slate-600 font-bold">Objet : {issue.subject_line}</p>

                {issue.articles && issue.articles.length > 0 && (
                  <div className="flex items-center gap-2 pt-1">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-medium text-slate-500">
                      {issue.articles.length} article(s) : {issue.articles.map((a) => a.title).join(', ')}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3 shrink-0">
                <Link
                  href="/newsletter/create"
                  className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Éditer / Prévisualiser
                </Link>
                <button
                  onClick={() => handleOpenSend(issue)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-extrabold text-cyan-300 bg-indigo-950 border border-indigo-800 hover:bg-slate-900 rounded-xl shadow-2xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" /> Envoi aux abonnés
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Admin Workspace & Schedule Config */}
      {activeTab === 'admin' && (
        <div className="space-y-8">
          <ScheduleConfigManager />
          <AdminSubscribersManager />
        </div>
      )}

      {/* Send Modal */}
      {selectedForSend && (
        <SendModal
          isOpen={isSendModalOpen}
          onClose={() => setIsSendModalOpen(false)}
          issue={selectedForSend}
          onSuccessSent={() => {
            setNewsletters((prev) =>
              prev.map((n) =>
                n.id === selectedForSend.id ? { ...n, status: 'sent', sent_at: new Date().toISOString() } : n
              )
            );
          }}
        />
      )}

    </div>
  );
}
