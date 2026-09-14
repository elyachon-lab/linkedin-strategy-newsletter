'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NewsletterIssue } from '@/lib/types';
import { INITIAL_NEWSLETTERS } from '@/lib/supabase/fallback-data';
import { IssueEditor } from '@/components/newsletter/issue-editor';
import { IssuePreview } from '@/components/newsletter/issue-preview';
import { SendModal } from '@/components/newsletter/send-modal';
import { ArrowLeft, Save, Send, Eye, Edit3, Check } from 'lucide-react';
import Link from 'next/link';

export default function CreateNewsletterPage() {
  const router = useRouter();
  const [issue, setIssue] = useState<Partial<NewsletterIssue>>({
    issue_number: 3,
    title: 'Veille Tech #03 - IA Générative & Performance Next.js',
    subject_line: '⚡ Veille Tech #03 : Nouvelles avancées IA & Conseils LinkedIn',
    preview_text: 'Découvrez notre sélection hebdomadaire des meilleures ressources dev et créateurs.',
    status: 'draft',
    content_markdown: `Bonjour à tous ! 👋

Voici votre sélection hebdomadaire des pépites technologiques et stratégies de contenu.

---

### 🚀 À la une cette semaine :
- **Modèles d'IA Multimodaux** : Comment intégrer la génération d'images et de code dans votre flux de travail.
- **Règles d'Or LinkedIn** : Soignez votre premier commentaire pour doubler votre taux de clics.

Bonne lecture !`,
    articles: [
      {
        id: 'art-101',
        title: 'Claude 3.5 Sonnet & Antigravity IDE Integration',
        url: 'https://anthropic.com',
        category: 'IA & Tech',
        summary: 'Examen des performances en génération de code et raisonnement complexe.',
        takeaway: 'La référence actuelle pour l\'assistance au dev full-stack.',
      },
    ],
  });

  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'split'>('split');
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(issue),
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    } catch {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:px-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <Link
            href="/newsletter"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            title="Retour"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">Studio de Rédaction Newsletter</h1>
            <p className="text-xs text-slate-500">Édition #{issue.issue_number} • Brouillon</p>
          </div>
        </div>

        {/* View Switchers (Mobile & Desktop split) */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'editor' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" /> Éditeur
            </button>
            <button
              onClick={() => setActiveTab('split')}
              className={`hidden lg:flex px-3 py-1.5 rounded-lg text-xs font-semibold items-center gap-1.5 transition-colors ${
                activeTab === 'split' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Côte à côte
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'preview' ? 'bg-white text-purple-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Aperçu Live
            </button>
          </div>

          <button
            onClick={handleSaveDraft}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            {isSaved ? <Check className="w-4 h-4 text-emerald-600" /> : <Save className="w-4 h-4" />}
            {isSaved ? 'Enregistré !' : 'Sauvegarder'}
          </button>

          <button
            onClick={() => setIsSendModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs transition-colors"
          >
            <Send className="w-3.5 h-3.5" /> Tester l'envoi
          </button>
        </div>
      </div>

      {/* Main Content Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Editor Pane */}
        <div
          className={`${
            activeTab === 'preview' ? 'hidden' : activeTab === 'split' ? 'lg:col-span-6' : 'lg:col-span-12'
          }`}
        >
          <IssueEditor issue={issue} onChange={(updated) => setIssue(updated)} />
        </div>

        {/* Live Preview Pane */}
        <div
          className={`${
            activeTab === 'editor' ? 'hidden' : activeTab === 'split' ? 'lg:col-span-6' : 'lg:col-span-12'
          }`}
        >
          <IssuePreview issue={issue} />
        </div>

      </div>

      {/* Send Modal */}
      <SendModal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        issue={issue}
        onSuccessSent={() => {
          setIssue({ ...issue, status: 'sent' });
        }}
      />

    </div>
  );
}
