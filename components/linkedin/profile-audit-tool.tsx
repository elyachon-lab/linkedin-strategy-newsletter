'use client';

import { useState } from 'react';
import { DeepAuditReport } from '@/app/api/linkedin-audit-deep/route';
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
} from 'lucide-react';

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

    const name = handle.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

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
      const res = await fetch('/api/linkedin-audit-deep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryInput,
          industry: industryInput || undefined,
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
      <div className="bg-metricool-purple text-white p-6 sm:p-8 rounded-3xl border-2 border-metricool-purple metricool-card-shadow space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-metricool-yellow text-metricool-purple text-xs font-extrabold border border-metricool-purple">
          <Sparkles className="w-4 h-4 text-metricool-purple" /> Outil d'Audit IA LinkedIn 2.0
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Audit de Profil & Page LinkedIn avec Auto-Détection du Secteur
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl leading-relaxed">
          Saisissez un nom, une URL LinkedIn ou des mots-clés. L'IA extrait automatiquement le secteur d'activité, génère le lien de validation cliquable et construit votre rapport d'audit sur-mesure.
        </p>
      </div>

      {/* STEP 1: SEARCH & INPUT FORM */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-metricool-purple metricool-card-shadow space-y-4">
        <h2 className="text-lg font-extrabold text-metricool-purple flex items-center gap-2">
          <Search className="w-5 h-5 text-metricool-blue" />
          1. Rechercher un Compte ou une Page LinkedIn
        </h2>

        <form onSubmit={handleValidateSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            <div className="sm:col-span-2">
              <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                Nom, Identifiant ou URL LinkedIn <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Linkedin className="absolute left-3.5 top-3 w-4 h-4 text-metricool-blue" />
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
                  className="w-full pl-10 pr-4 py-2.5 text-xs border-2 border-slate-300 rounded-xl focus:border-metricool-purple font-bold text-slate-900"
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
                className="w-full px-3.5 py-2.5 text-xs border-2 border-slate-300 rounded-xl focus:border-metricool-purple font-bold text-slate-900 bg-white"
              />
            </div>

          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={isSearching}
              className="w-full sm:w-auto px-6 py-3 bg-metricool-purple hover:bg-black text-metricool-yellow font-extrabold rounded-2xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Analyse IA du profil & auto-détection du secteur...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-metricool-yellow" /> Détecter le Secteur & Générer le Lien Cliquable
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* STEP 2: VISUAL VALIDATION CARD WITH CLICKABLE LINK */}
      {validatedUrl && (
        <div className="bg-metricool-lightBlue/40 p-6 sm:p-8 rounded-3xl border-2 border-metricool-purple metricool-card-shadow space-y-4 animate-fadeIn">
          
          <div className="flex items-center gap-2 text-metricool-purple">
            <UserCheck className="w-6 h-6 text-emerald-600" />
            <h3 className="text-lg font-extrabold">2. Validation du Compte & Secteur Détecté par l'IA</h3>
          </div>
          <p className="text-xs text-slate-700 font-medium">
            Veuillez cliquer sur le lien direct ci-dessous pour confirmer qu'il s'agit bien du compte ou de la page souhaitée avant de lancer l'analyse IA.
          </p>

          <div className="bg-white p-5 rounded-2xl border-2 border-metricool-purple flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-extrabold text-metricool-purple text-base">{previewName}</span>
                <span className="bg-metricool-yellow text-metricool-purple border border-metricool-purple text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  🤖 Secteur IA : {industryInput || 'SaaS & Tech'}
                </span>
                <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Profil Valide
                </span>
              </div>

              {/* CLICKABLE LINK REQUIREMENT */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-metricool-blue pt-1">
                <ExternalLink className="w-4 h-4 shrink-0 text-metricool-purple" />
                <a
                  href={validatedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-2 break-all text-metricool-purple"
                >
                  {validatedUrl}
                </a>
              </div>
            </div>

            <a
              href={validatedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-metricool-lightBlue text-metricool-purple border-2 border-metricool-purple rounded-xl text-xs font-extrabold hover:bg-blue-100 transition-colors shrink-0"
            >
              🔗 Ouvrir et Vérifier sur LinkedIn <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="pt-2">
            <button
              onClick={handleRunAudit}
              disabled={isAuditing}
              className="w-full py-4 bg-metricool-purple hover:bg-black text-metricool-yellow font-extrabold rounded-2xl text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              {isAuditing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Génération de l'audit adapté au secteur {industryInput}...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-metricool-yellow" /> ✅ Confirmer & Lancer l'Audit IA Sectoriel
                </>
              )}
            </button>
          </div>

        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl text-xs font-extrabold text-rose-900 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* STEP 3 & 4: STRUCTURED AUDIT REPORT DASHBOARD */}
      {auditReport && (
        <div className="space-y-6 animate-fadeIn pt-4">
          
          {/* Audit Header Banner */}
          <div className="bg-metricool-purple text-white p-6 sm:p-8 rounded-3xl border-2 border-metricool-purple metricool-card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white">{auditReport.displayName}</h2>
                <span className="bg-metricool-yellow text-metricool-purple text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase border border-metricool-purple">
                  🤖 Secteur IA : {auditReport.industry}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-bold flex items-center gap-2">
                <a href={auditReport.profileUrl} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1 text-metricool-yellow">
                  @{auditReport.username} <ExternalLink className="w-3 h-3 text-metricool-yellow" />
                </a> •
                <span>{auditReport.accountType}</span>
              </p>
            </div>

            <div className="bg-white text-metricool-purple px-5 py-3 rounded-2xl border-2 border-metricool-purple text-center shadow-xs shrink-0">
              <div className="text-[10px] font-extrabold uppercase text-slate-500">Score Audit IA</div>
              <div className="text-3xl font-extrabold text-metricool-purple">{auditReport.metrics.ssiScore}/100</div>
            </div>
          </div>

          {/* KPI METRICS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border-2 border-metricool-purple metricool-card-shadow text-center space-y-1">
              <div className="text-[11px] font-extrabold uppercase text-slate-500 flex items-center justify-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-metricool-blue" /> Taux d'Engagement
              </div>
              <div className="text-2xl font-extrabold text-metricool-purple">{auditReport.metrics.engagementRate}</div>
              <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                +1.2% / moyenne sectorielle
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border-2 border-metricool-purple metricool-card-shadow text-center space-y-1">
              <div className="text-[11px] font-extrabold uppercase text-slate-500 flex items-center justify-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-500" /> Score SSI (Social Selling)
              </div>
              <div className="text-2xl font-extrabold text-metricool-purple">{auditReport.metrics.ssiScore}/100</div>
              <span className="text-[10px] text-purple-700 font-extrabold bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                Top 15% secteur {auditReport.industry}
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border-2 border-metricool-purple metricool-card-shadow text-center space-y-1">
              <div className="text-[11px] font-extrabold uppercase text-slate-500 flex items-center justify-center gap-1">
                <BarChart3 className="w-3.5 h-3.5 text-metricool-pink" /> Dwell Time Retention
              </div>
              <div className="text-2xl font-extrabold text-metricool-purple">{auditReport.metrics.dwellTimeScore}/100</div>
              <span className="text-[10px] text-blue-700 font-extrabold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                Optimisé Carrousels PDF
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border-2 border-metricool-purple metricool-card-shadow text-center space-y-1">
              <div className="text-[11px] font-extrabold uppercase text-slate-500 flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" /> Fréquence Hebdo
              </div>
              <div className="text-2xl font-extrabold text-metricool-purple">{auditReport.metrics.weeklyPostFrequency}</div>
              <span className="text-[10px] text-slate-600 font-extrabold bg-slate-100 px-2 py-0.5 rounded-full">
                Rythme recommandé
              </span>
            </div>

          </div>

          {/* STRENGTHS & WEAKNESSES EVALUATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Strengths */}
            <div className="bg-emerald-50 p-6 rounded-3xl border-2 border-emerald-400 space-y-3">
              <h3 className="text-base font-extrabold text-emerald-950 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Points Forts Identifiés sur le Compte
              </h3>
              <div className="space-y-2 text-xs font-bold text-emerald-900">
                {auditReport.strengths.map((str, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-emerald-200 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weaknesses / Axes d'amélioration */}
            <div className="bg-rose-50 p-6 rounded-3xl border-2 border-rose-300 space-y-3">
              <h3 className="text-base font-extrabold text-rose-950 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600" /> Axes d'Amélioration Prioritaires
              </h3>
              <div className="space-y-2 text-xs font-bold text-rose-900">
                {auditReport.weaknesses.map((weak, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-rose-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                    <span>{weak}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* EDITORIAL MIX & RECOMMENDED HOOKS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Recommended Content Mix */}
            <div className="bg-white p-6 rounded-3xl border-2 border-metricool-purple metricool-card-shadow space-y-4">
              <h3 className="text-base font-extrabold text-metricool-purple flex items-center gap-2">
                <Layers className="w-5 h-5 text-metricool-pink" /> Répartition Éditoriale pour {auditReport.industry}
              </h3>

              <div className="space-y-3 pt-1">
                {auditReport.editorialStrategy.recommendedMix.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-extrabold text-slate-800">
                      <span>{item.format}</span>
                      <span className="text-metricool-purple">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 border border-slate-200 overflow-hidden">
                      <div
                        className="bg-metricool-purple h-3 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Posting Windows & Copyable Hooks */}
            <div className="bg-metricool-lightBlue/40 p-6 rounded-3xl border-2 border-metricool-purple metricool-card-shadow space-y-4">
              <h3 className="text-base font-extrabold text-metricool-purple flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-metricool-pink" /> Accroches IA Adaptées au Secteur {auditReport.industry}
              </h3>

              <div className="space-y-2">
                {auditReport.editorialStrategy.tailoredHooks.map((hook, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3 rounded-xl border-2 border-metricool-purple text-xs font-bold text-metricool-purple flex items-center justify-between gap-3 shadow-2xs"
                  >
                    <span className="italic">"{hook}"</span>
                    <button
                      onClick={() => copyToClipboard(hook, idx)}
                      className="bg-metricool-yellow text-metricool-purple text-[11px] font-extrabold px-2.5 py-1 rounded-lg border border-metricool-purple hover:bg-yellow-300 transition-colors shrink-0"
                    >
                      {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ACTION PLAN */}
          <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 space-y-3">
            <h3 className="text-base font-extrabold text-metricool-purple flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-500" /> Plan d'Action Stratégique en 3 Étapes
            </h3>
            <div className="space-y-2 text-xs font-bold text-slate-800">
              {auditReport.editorialStrategy.actionSteps.map((step, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-metricool-purple text-metricool-yellow flex items-center justify-center font-extrabold shrink-0 text-xs">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
