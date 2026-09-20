'use client';

import { useState } from 'react';
import { DeepAuditReport, AdviceSource } from '@/app/api/linkedin-audit-deep/route';
import {
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  TrendingUp,
  Clock,
  Target,
  Copy,
  Check,
  Loader2,
  RefreshCw,
  Award,
  BarChart3,
  Layers,
  ArrowRight,
  UserCheck,
  Building2,
  Linkedin,
  Activity,
  PieChart,
  Lightbulb,
  ChevronDown,
  BookOpen,
} from 'lucide-react';

import Link from 'next/link';
import { AuditDiagnosticSkeleton } from './audit-skeletons';
import { LINKEDIN_INDUSTRIES, formatCleanLinkedInName } from '@/lib/types';

function CollapsibleSourceAccordion({ source, darkTheme = true }: { source?: AdviceSource; darkTheme?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!source) return null;

  return (
    <div className="pt-2">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left px-3.5 py-2.5 border rounded-xl text-[11px] font-extrabold flex items-center justify-between transition-colors ${
          darkTheme
            ? 'bg-white/10 hover:bg-white/20 border-white/20 text-indigo-300'
            : 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-900'
        }`}
      >
        <span className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          📚 Source vérifiée & Justification algorithmique
        </span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={`mt-2 p-3.5 border rounded-xl text-xs space-y-2 animate-fadeIn ${
            darkTheme
              ? 'bg-black/40 border-white/15 text-slate-200'
              : 'bg-white border-pink-200 text-slate-800 shadow-2xs'
          }`}
        >
          <div className="font-extrabold text-cyan-300 text-[11px] uppercase tracking-wider flex items-center gap-1">
            <span>{source.title}</span>
          </div>
          <p className="text-[11px] text-slate-300 font-bold">
            Référence étude : <span className="text-white italic">{source.reference}</span>
          </p>
          <p className="text-[11px] leading-relaxed font-medium bg-white/5 p-2 rounded-lg border border-white/10">
            💡 <strong>Justification de l'algorithme :</strong> {source.rationale}
          </p>

          {source.internalArticleUrl && (
            <div className="pt-1 border-t border-white/10">
              <Link
                href={source.internalArticleUrl}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-cyan-300 hover:underline"
              >
                <span>🔗 Fiche Stratégique Associée : {source.internalArticleTitle || 'Consulter la fiche'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ProfileAuditTool() {
  const [queryInput, setQueryInput] = useState('');
  const [industryInput, setIndustryInput] = useState('');
  const [detectedConfidence, setDetectedConfidence] = useState<number | null>(null);
  const [validatedUrl, setValidatedUrl] = useState<string | null>(null);
  const [previewHandle, setPreviewHandle] = useState<string | null>(null);
  const [previewName, setPreviewName] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditReport, setAuditReport] = useState<DeepAuditReport | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Step 1 -> Step 2: Validate input, call AI Industry Detector, and show clickable preview link
  const handleValidateSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!queryInput.trim()) return;

    setIsSearching(true);
    const input = queryInput.trim();

    let url = '';
    let handle = '';

    if (input.includes('linkedin.com/company/')) {
      handle = input.split('linkedin.com/company/')[1].split('/')[0].split('?')[0];
      url = `https://www.linkedin.com/company/${handle}`;
    } else if (input.includes('linkedin.com/in/')) {
      handle = input.split('linkedin.com/in/')[1].split('/')[0].split('?')[0];
      url = `https://www.linkedin.com/in/${handle}`;
    } else {
      handle = input.toLowerCase().replace(/[^a-zA-Z0-9_-]/g, '') || 'profil-linkedin';
      url = `https://www.linkedin.com/in/${handle}`;
    }

    const name = formatCleanLinkedInName(handle);

    // Call AI Industry Auto-Detection API
    try {
      const res = await fetch('/api/ai-detect-industry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkedinUrl: url, username: handle, fullName: name, role: input }),
      });
      const data = await res.json();

      if (data.detectedIndustry) {
        setIndustryInput(data.detectedIndustry);
        setDetectedConfidence(data.confidenceScore || 98);
      }
    } catch {}

    setValidatedUrl(url);
    setPreviewHandle(handle);
    setPreviewName(name);
    setIsSearching(false);
  };

  // Step 2 -> Step 3 & 4: Trigger Audit Analysis
  const handleRunAudit = async () => {
    if (!queryInput.trim()) return;

    setIsAuditing(true);
    setErrorMessage('');

    try {
      let csvMetrics = undefined;
      if (typeof window !== 'undefined') {
        const savedCsv = localStorage.getItem('linkedin_imported_csv_stats');
        if (savedCsv) {
          try {
            csvMetrics = JSON.parse(savedCsv);
          } catch {}
        }
      }

      const res = await fetch('/api/linkedin-audit-deep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryInput,
          industry: industryInput || undefined,
          csvMetrics,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.report) {
        setErrorMessage(data.error || 'Erreur lors du calcul de l\'audit.');
        setIsAuditing(false);
        return;
      }

      setAuditReport(data.report);
    } catch {
      setErrorMessage('Une erreur est survenue lors de l\'analyse du profil.');
    } finally {
      setIsAuditing(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* HEADER HERO */}
      <div className="bg-indigo-950 text-white p-6 sm:p-8 rounded-3xl border border-indigo-900 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-900 text-indigo-200 text-xs font-bold border border-indigo-700/50">
          <Sparkles className="w-4 h-4 text-indigo-300" /> Outil d'Audit IA LinkedIn 2.0
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Audit de Profil & Page LinkedIn avec Sources Algorithmiques Vérifiées
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl leading-relaxed">
          Saisissez un nom, une URL LinkedIn ou des mots-clés. L'IA extrait automatiquement le secteur d'activité, génère le lien de validation cliquable et construit votre rapport d'audit avec justifications algorithmiques repliables.
        </p>
      </div>

      {/* STEP 1: SEARCH & INPUT FORM */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 brand-card-shadow space-y-4">
        <h2 className="text-lg font-black text-indigo-950 flex items-center gap-2">
          <Search className="w-5 h-5 text-indigo-600" />
          1. Rechercher un Compte ou une Page LinkedIn
        </h2>

        <form onSubmit={handleValidateSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            <div className="sm:col-span-2">
              <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                Nom, Identifiant ou URL LinkedIn <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Linkedin className="absolute left-3.5 top-3 w-4 h-4 text-[#0A66C2]" />
                <input
                  type="text"
                  required
                  placeholder="ex: Jean Dupont ou https://www.linkedin.com/in/jeandupont"
                  value={queryInput}
                  onChange={(e) => {
                    setQueryInput(e.target.value);
                    setValidatedUrl(null);
                    setAuditReport(null);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-300 rounded-xl focus:border-indigo-600 font-bold text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1 flex items-center justify-between">
                <span>Secteur d'Activité</span>
                {detectedConfidence && (
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                    🤖 IA {detectedConfidence}%
                  </span>
                )}
              </label>
              <input
                type="text"
                placeholder="Détecté automatiquement par l'IA..."
                value={industryInput}
                onChange={(e) => setIndustryInput(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:border-indigo-600 font-bold text-slate-900 bg-white"
              />
            </div>

          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={isSearching}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Analyse IA du profil & auto-détection du secteur...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" /> Détecter le Secteur & Générer le Lien Cliquable
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* STEP 2: VISUAL VALIDATION CARD WITH CLICKABLE LINK */}
      {validatedUrl && (
        <div className="bg-indigo-50/50 p-6 sm:p-8 rounded-3xl border border-indigo-200 brand-card-shadow space-y-4 animate-fadeIn">
          
          <div className="flex items-center gap-2 text-indigo-950">
            <UserCheck className="w-6 h-6 text-emerald-600" />
            <h3 className="text-lg font-extrabold">2. Validation du Compte & Secteur Détecté par l'IA</h3>
          </div>
          <p className="text-xs text-slate-700 font-medium">
            Veuillez cliquer sur le lien direct ci-dessous pour confirmer qu'il s'agit bien du compte ou de la page souhaitée avant de lancer l'analyse IA.
          </p>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-extrabold text-indigo-950 text-base">{previewName}</span>
                <span className="bg-indigo-100 text-indigo-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  🤖 Secteur IA : {industryInput || 'SaaS & Tech'}
                </span>
                <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Profil Valide
                </span>
              </div>

              {/* CLICKABLE LINK REQUIREMENT */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 pt-1">
                <ExternalLink className="w-4 h-4 shrink-0 text-indigo-600" />
                <a
                  href={validatedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-2 break-all text-indigo-950"
                >
                  {validatedUrl}
                </a>
              </div>
            </div>

            <a
              href={validatedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl text-xs font-extrabold hover:bg-indigo-100 transition-colors shrink-0"
            >
              🔗 Ouvrir et Vérifier sur LinkedIn <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="pt-2">
            <button
              onClick={handleRunAudit}
              disabled={isAuditing}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              {isAuditing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Génération de l'audit adapté au secteur {industryInput}...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-white" /> ✅ Confirmer & Lancer l'Audit IA Sectoriel
                </>
              )}
            </button>
          </div>

        </div>
      )}

      {isAuditing && (
        <div className="pt-4">
          <AuditDiagnosticSkeleton queryName={queryInput || 'le profil'} />
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl text-xs font-extrabold text-rose-900 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* STEP 3 & 4: STRUCTURED 2-PHASE AUDIT REPORT DASHBOARD */}
      {auditReport && (
        <div className="space-y-8 animate-fadeIn pt-4">
          
          {/* ========================================================================= */}
          {/* PHASE 1: ÉTAT DES LIEUX & DIAGNOSTIC DE LA COMMUNICATION ACTUELLE */}
          {/* ========================================================================= */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 brand-card-shadow space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-900 text-xs font-extrabold border border-indigo-200">
                  <Activity className="w-3.5 h-3.5 text-indigo-600" /> PHASE 1 : DIAGNOSTIC DU PROFIL SCANNE
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-indigo-950 pt-1">
                  📊 État des Lieux & Diagnostic de la Communication Actuelle
                </h2>
                <p className="text-xs text-slate-600 font-medium">
                  Analyse de ce qui est actuellement observé sur le compte <strong>{auditReport.displayName}</strong>.
                </p>
              </div>

              <div className="bg-indigo-950 text-white px-5 py-3 rounded-2xl border border-indigo-800 text-center shrink-0">
                <div className="text-[10px] font-bold uppercase text-indigo-200">Score Audit IA</div>
                <div className="text-3xl font-black text-indigo-300">
                  {auditReport.currentDiagnostic?.ssiScore || auditReport.metrics.ssiScore}/100
                </div>
              </div>
            </div>

            {/* AI AUTO-DETECTION SECTOR BADGE */}
            <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
                <div>
                  <span className="text-xs font-extrabold text-indigo-950 block">
                    🤖 Secteur d'activité déduit par l'IA : {auditReport.industry} (Certitude {auditReport.industryConfidence || 98}%)
                  </span>
                  <span className="text-[11px] text-slate-600 font-medium">
                    Toutes les métriques et benchmarks sont personnalisés pour le secteur {auditReport.industry}.
                  </span>
                </div>
              </div>
              <a
                href={auditReport.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-extrabold text-indigo-600 hover:underline shrink-0 bg-white px-3 py-1.5 rounded-xl border border-indigo-200"
              >
                🔗 Lien Direct LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* CURRENT METRICS DIAGNOSTIC GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-1">
                <div className="text-[11px] font-extrabold uppercase text-slate-500 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-600" /> Taux d'Engagement Constaté
                </div>
                <div className="text-2xl font-black text-indigo-950">
                  {auditReport.currentDiagnostic?.engagementRate || auditReport.metrics.engagementRate}
                </div>
                <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Moyenne Sectorielle
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-1">
                <div className="text-[11px] font-extrabold uppercase text-slate-500 flex items-center justify-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" /> Score SSI Actuel
                </div>
                <div className="text-2xl font-black text-indigo-950">
                  {auditReport.currentDiagnostic?.ssiScore || auditReport.metrics.ssiScore}/100
                </div>
                <span className="text-[10px] text-purple-700 font-extrabold bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                  Index Social Selling
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-1">
                <div className="text-[11px] font-extrabold uppercase text-slate-500 flex items-center justify-center gap-1">
                  <BarChart3 className="w-3.5 h-3.5 text-cyan-600" /> Index Dwell Time
                </div>
                <div className="text-2xl font-black text-indigo-950">
                  {auditReport.currentDiagnostic?.dwellTimeScore || auditReport.metrics.dwellTimeScore}/100
                </div>
                <span className="text-[10px] text-blue-700 font-extrabold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  Rétention Actuelle
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-1">
                <div className="text-[11px] font-extrabold uppercase text-slate-500 flex items-center justify-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" /> Fréquence Publiée
                </div>
                <div className="text-sm font-black text-indigo-950 pt-1">
                  {auditReport.currentDiagnostic?.currentPublishingFrequency || auditReport.metrics.weeklyPostFrequency}
                </div>
                <span className="text-[10px] text-slate-600 font-extrabold bg-slate-100 px-2 py-0.5 rounded-full block">
                  Rythme Observé
                </span>
              </div>
            </div>

            {/* CURRENT FORMAT DISTRIBUTION & PROFILE DIAGNOSTIC */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-extrabold uppercase text-slate-700 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-600" /> Répartition Actuelle des Formats Publiés
                </h3>
                <div className="space-y-2 text-xs font-bold">
                  {(auditReport.currentDiagnostic?.observedFormatDistribution || [
                    { format: 'Texte Brut & Court', percentage: 55 },
                    { format: 'Images / Photos Simples', percentage: 25 },
                    { format: 'Liens Externe en Corps de Post', percentage: 20 },
                  ]).map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-slate-700">
                        <span>{item.format}</span>
                        <span className="text-indigo-950 font-black">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-extrabold uppercase text-slate-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600" /> Diagnostic du Positionnement de Profil
                </h3>
                <div className="space-y-2 text-xs font-bold text-slate-800">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-500 uppercase text-[10px] font-extrabold block">Titre & Accroche Bio :</span>
                    <p className="text-rose-900">
                      {auditReport.currentDiagnostic?.profileHeadlineStatus || 'Titre générique sans bénéfice client explicite.'}
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-500 uppercase text-[10px] font-extrabold block">Placement des Liens Externes :</span>
                    <p className="text-rose-900">
                      {auditReport.currentDiagnostic?.linkPlacementStatus || 'Liens insérés dans le corps du texte (réduction algorithmique).'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* PHASE 2: RECOMMANDATIONS & CONSEILS PERSONNALISÉS IA AVEC SOURCES REPLIABLES */}
          {/* ========================================================================= */}
          <div className="bg-indigo-950 text-white p-6 sm:p-8 rounded-3xl border border-indigo-900 shadow-xl space-y-6">
            
            <div className="border-b border-white/10 pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-900 text-indigo-200 text-xs font-bold border border-indigo-700 mb-2">
                <Lightbulb className="w-3.5 h-3.5 text-indigo-300" /> PHASE 2 : CONSEILS PERSONNALISÉS IA
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                🎯 Recommandations & Conseils Personnalisés Sur-Mesure IA
              </h2>
              <p className="text-xs text-slate-300 font-medium mt-1">
                Plan d'action et hooks rédigés sur-mesure pour le secteur <strong>{auditReport.industry}</strong>, appuyés par des sources et justifications algorithmiques.
              </p>
            </div>

            {/* STRENGTHS & WEAKNESSES */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-emerald-950/40 p-5 rounded-2xl border border-emerald-400/40 space-y-3">
                  <h3 className="text-sm font-extrabold text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Points Forts à Conserver
                  </h3>
                  <div className="space-y-2 text-xs font-bold text-slate-200">
                    {(auditReport.recommendations?.strengths || auditReport.strengths).map((str, idx) => (
                      <div key={idx} className="bg-white/10 p-3 rounded-xl border border-white/10 flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-rose-950/40 p-5 rounded-2xl border border-rose-400/40 space-y-3">
                  <h3 className="text-sm font-extrabold text-rose-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400" /> Axes d'Amélioration Prioritaires
                  </h3>
                  <div className="space-y-2 text-xs font-bold text-slate-200">
                    {(auditReport.recommendations?.weaknesses || auditReport.weaknesses).map((weak, idx) => (
                      <div key={idx} className="bg-white/10 p-3 rounded-xl border border-white/10 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                        <span>{weak}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* COLLAPSIBLE SOURCE FOR STRENGTHS / WEAKNESSES */}
              <CollapsibleSourceAccordion source={auditReport.recommendations?.sources?.strengthsWeaknesses} />
            </div>

            {/* RECOMMENDED EDITORIAL MIX & TAILORED HOOKS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Recommended Format Mix */}
              <div className="bg-white/10 p-5 rounded-2xl border border-white/15 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-sm font-extrabold text-cyan-300 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-400" /> Nouvelle Répartition Éditoriale Recommandée
                  </h3>
                  <div className="space-y-3 pt-1">
                    {(auditReport.recommendations?.recommendedFormatMix || auditReport.editorialStrategy.recommendedMix).map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-extrabold text-slate-200">
                          <span>{item.format}</span>
                          <span className="text-cyan-300">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden">
                          <div className="bg-cyan-400 h-2.5 rounded-full" style={{ width: `${item.percentage}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* COLLAPSIBLE SOURCE FOR EDITORIAL MIX */}
                <CollapsibleSourceAccordion source={auditReport.recommendations?.sources?.editorialMix} />
              </div>

              {/* Tailored Hooks with Copy Button */}
              <div className="bg-white/10 p-5 rounded-2xl border border-white/15 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-sm font-extrabold text-cyan-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" /> Accroches IA Optimisées pour {auditReport.industry}
                  </h3>
                  <div className="space-y-2">
                    {(auditReport.recommendations?.tailoredHooks || auditReport.editorialStrategy.tailoredHooks).map((hook, idx) => (
                      <div
                        key={idx}
                        className="bg-white text-indigo-950 p-3 rounded-xl text-xs font-bold flex items-center justify-between gap-3 shadow-xs"
                      >
                        <span className="italic">"{hook}"</span>
                        <button
                          onClick={() => copyToClipboard(hook, idx)}
                          className="bg-indigo-50 text-indigo-900 text-[11px] font-extrabold px-2.5 py-1 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors shrink-0"
                        >
                          {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* COLLAPSIBLE SOURCE FOR TAILORED HOOKS */}
                <CollapsibleSourceAccordion source={auditReport.recommendations?.sources?.tailoredHooks} />
              </div>

            </div>

            {/* ACTION PLAN */}
            <div className="space-y-4 pt-2">
              <div className="bg-white/10 p-5 rounded-2xl border border-white/15 space-y-4">
                <h3 className="text-sm font-extrabold text-cyan-300 flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-400" /> Plan d'Action Stratégique en 3 Étapes
                </h3>
                <div className="space-y-2 text-xs font-bold text-slate-900">
                  {(auditReport.recommendations?.actionSteps || auditReport.editorialStrategy.actionSteps).map((step, idx) => (
                    <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-indigo-950 text-indigo-300 flex items-center justify-center font-black shrink-0 text-xs">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                {/* COLLAPSIBLE SOURCE FOR ACTION PLAN */}
                <CollapsibleSourceAccordion source={auditReport.recommendations?.sources?.actionPlan} />
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
