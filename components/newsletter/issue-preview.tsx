'use client';

import { useState } from 'react';
import { NewsletterIssue } from '@/lib/types';
import { generateEmailHtml } from '@/lib/resend';
import { Monitor, Smartphone, Check, Copy } from 'lucide-react';

interface IssuePreviewProps {
  issue: Partial<NewsletterIssue>;
}

export function IssuePreview({ issue }: IssuePreviewProps) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);

  const html = generateEmailHtml({
    title: issue.title || 'Titre de votre édition',
    previewText: issue.preview_text || '',
    contentMarkdown: issue.content_markdown || 'Votre contenu apparaîtra ici...',
    articles: issue.articles || [],
  });

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      
      {/* Header Preview Toolbar */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setDevice('desktop')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              device === 'desktop'
                ? 'bg-white text-purple-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-4 h-4" /> Desktop (640px)
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              device === 'mobile'
                ? 'bg-white text-purple-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4" /> Mobile (375px)
          </button>
        </div>

        <button
          onClick={handleCopyHtml}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'HTML Copié !' : 'Copier Code HTML'}
        </button>
      </div>

      {/* Frame Container */}
      <div className="bg-slate-100 p-4 sm:p-6 flex-1 flex items-center justify-center overflow-auto min-h-[500px]">
        <div
          className={`transition-all duration-300 bg-white shadow-xl rounded-xl overflow-hidden ${
            device === 'mobile' ? 'w-[375px]' : 'w-full max-w-[640px]'
          }`}
        >
          {/* Simulated Email Client Bar */}
          <div className="bg-slate-200/80 px-4 py-2 text-[11px] text-slate-600 flex items-center justify-between border-b border-slate-300">
            <span className="truncate">
              <strong>De :</strong> newsletter@vosdomaine.com
            </span>
            <span className="font-semibold text-slate-700">Aperçu E-mail</span>
          </div>

          <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs text-slate-800 space-y-1">
            <div>
              <strong>Objet :</strong> {issue.subject_line || '(Pas d\'objet spécifié)'}
            </div>
            {issue.preview_text && (
              <div className="text-slate-500 truncate">
                <strong>Preheader :</strong> {issue.preview_text}
              </div>
            )}
          </div>

          {/* Render HTML content via iframe srcDoc */}
          <iframe
            srcDoc={html}
            title="Aperçu Newsletter"
            className="w-full h-[550px] border-0"
          />
        </div>
      </div>

    </div>
  );
}
