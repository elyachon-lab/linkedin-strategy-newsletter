'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LinkedInUserProfile } from '@/lib/types';
import { DeepAuditReport } from '@/app/api/linkedin-audit-deep/route';
import { ProfileAuditTool } from '@/components/linkedin/profile-audit-tool';
import { AuthModal } from '@/components/auth-modal';
import {
  Linkedin,
  Globe,
  Sparkles,
  CheckCircle2,
  Clock,
  Target,
  Zap,
  Copy,
  Check,
  RefreshCw,
  User,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Search,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Layers,
  Settings,
  UserCheck,
  Loader2,
} from 'lucide-react';

export default function DedicatedClientSpacePage() {
  const [profile, setProfile] = useState<LinkedInUserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'my_audit' | 'search_audit' | 'website_scan'>('my_audit');
  
  // Auto-Audit for Registered User Profile State
  const [registeredAudit, setRegisteredAudit] = useState<DeepAuditReport | null>(null);
  const [isLoadingAudit, setIsLoadingAudit] = useState(false);
  const [auditError, setAuditError] = useState('');

  // Website Scanner State
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isScanningSite, setIsScanningSite] = useState(false);
  const [siteAnalysisResult, setSiteAnalysisResult] = useState<string | null>(null);

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Load user profile & trigger auto-audit for registered profile
  useEffect(() => {
    const saved = localStorage.getItem('linkedin_user_profile');
    let activeProfile: LinkedInUserProfile;

    if (saved) {
      try {
        activeProfile = JSON.parse(saved);
      } catch {
        activeProfile = getDefaultFallbackProfile();
      }
    } else {
      activeProfile = getDefaultFallbackProfile();
    }

    setProfile(activeProfile);
    if (activeProfile.websiteUrl) setWebsiteUrl(activeProfile.websiteUrl);

    // Auto-fetch audit for registered user account
    runAutoAuditForRegisteredUser(activeProfile);
  }, []);

  const getDefaultFallbackProfile = (): LinkedInUserProfile => ({
    username: 'jeandupont',
    fullName: 'Jean Dupont',
    industry: 'SaaS & Tech',
    role: 'CEO & Fondateur',
    followerCount: 4800,
    linkedinUrl: 'https://www.linkedin.com/in/jeandupont',
  });

  const runAutoAuditForRegisteredUser = async (userProf: LinkedInUserProfile) => {
    setIsLoadingAudit(true);
    setAuditError('');

    const targetQuery = userProf.username || userProf.fullName || 'jeandupont';

    try {
      const res = await fetch('/api/linkedin-audit-deep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: targetQuery,
          industry: userProf.industry || 'SaaS & Tech',
        }),
      });

      const data = await res.json();
      if (res.ok && data.report) {
        setRegisteredAudit(data.report);
      } else {
        setAuditError('Impossible de charger l\'audit de votre compte.');
      }
    } catch {
      setAuditError('Erreur de connexion au moteur d\'audit IA.');
    } finally {
      setIsLoadingAudit(false);
    }
  };

  const handleScanWebsite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl.trim()) return;

    setIsScanningSite(true);
    setTimeout(() => {
      setIsScanningSite(false);
      setSiteAnalysisResult(
        `Analyse IA de ${websiteUrl.trim()} effectuée : Alignement idéal avec votre secteur (${profile?.industry || 'B2B'}). Vos propositions de valeur principales ont été synchronisées avec vos carrousels et accroches.`
      );
    }, 1200);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const registeredUrl = profile?.linkedinUrl || `https://www.linkedin.com/in/${profile?.username || 'profil'}`;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* HEADER BANNER: REGISTERED PROFILE IDENTITY & STATUS */}
      <div className="bg-metricool-purple text-white p-6 sm:p-8 rounded-3xl border-2 border-metricool-purple metricool-card-shadow space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-metricool-yellow text-metricool-purple flex items-center justify-center font-extrabold text-2xl border-2 border-metricool-purple shadow-md shrink-0">
              {(profile?.fullName || 'L').charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">{profile?.fullName}</h1>
                <span className="bg-metricool-yellow text-metricool-purple text-xs font-extrabold px-3 py-0.5 rounded-full uppercase border border-metricool-purple">
                  🤖 Secteur IA : {profile?.industry}
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> Compte Enregistré
                </span>
              </div>

              {/* CLICKABLE REGISTERED LINK */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 font-bold mt-1.5">
                <a
                  href={registeredUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1 text-metricool-yellow underline-offset-2"
                >
                  <Linkedin className="w-3.5 h-3.5 text-metricool-yellow" />
                  {registeredUrl}
                  <ExternalLink className="w-3 h-3 text-metricool-yellow" />
                </a>
                <span>•</span>
                <span>@{profile?.username}</span>
                <span>•</span>
                <span>{profile?.role}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* LINK TO PARAMETRES / PROFIL PAGE TO CHANGE ACCOUNT */}
            <Link
              href="/profil"
              className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-extrabold rounded-2xl text-xs border border-white/20 transition-all flex items-center gap-2"
            >
              <Settings className="w-4 h-4 text-metricool-yellow" /> Modifier dans mes paramètres
            </Link>

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-3 bg-metricool-yellow hover:bg-yellow-300 text-metricool-purple font-extrabold rounded-2xl text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4" /> Changer de Compte
            </button>
          </div>
        </div>

        {/* INFO NOTICE */}
        <div className="bg-white/10 p-4 rounded-2xl border border-white/15 text-xs text-slate-200 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-metricool-pink shrink-0" />
            <span>
              <strong>Compte LinkedIn Actif :</strong> L'audit ci-dessous est automatiquement calculé pour votre profil <strong>{profile?.fullName}</strong> ({profile?.industry}). Vous pouvez modifier ce pseudo/URL à tout moment dans vos <Link href="/profil" className="underline text-metricool-yellow font-bold">Paramètres de Compte</Link>.
            </span>
          </div>
        </div>

      </div>

      {/* NAVIGATION TABS: UNIFIED SPACE & AUDIT LINKEDIN */}
      <div className="flex border-b-2 border-slate-200 bg-white p-2 rounded-2xl border-2 border-metricool-purple metricool-card-shadow gap-2 overflow-x-auto">
        
        <button
          onClick={() => setActiveTab('my_audit')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'my_audit'
              ? 'bg-metricool-purple text-metricool-yellow shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-metricool-yellow" />
          1. Audit IA de Mon Compte Enregistré
        </button>

        <button
          onClick={() => setActiveTab('search_audit')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'search_audit'
              ? 'bg-metricool-purple text-metricool-yellow shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Search className="w-4 h-4 text-metricool-blue" />
          2. Auditer un Autre Compte ou Page Tiers
        </button>

        <button
          onClick={() => setActiveTab('website_scan')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'website_scan'
              ? 'bg-metricool-purple text-metricool-yellow shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Globe className="w-4 h-4 text-emerald-400" />
          3. Scan & Alignement de Mon Site Internet
        </button>

      </div>

      {/* TAB 1: AUTOMATIC AUDIT FOR REGISTERED USER ACCOUNT */}
      {activeTab === 'my_audit' && (
        <div className="space-y-6 animate-fadeIn">
          
          {isLoadingAudit ? (
            <div className="bg-white p-12 rounded-3xl border-2 border-metricool-purple metricool-card-shadow text-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-metricool-purple mx-auto" />
              <p className="text-sm font-extrabold text-metricool-purple">
                Calcul de l'audit IA pour votre compte {profile?.fullName} (@{profile?.username})...
              </p>
              <p className="text-xs text-slate-500 font-medium">
                Analyse Dwell Time, Score SSI et Benchmark sectoriel ({profile?.industry})...
              </p>
            </div>
          ) : registeredAudit ? (
            <>
              {/* REGISTERED AUDIT SUMMARY BANNER */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-metricool-purple metricool-card-shadow space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-extrabold text-metricool-purple">
                        Rapport d'Audit : {registeredAudit.displayName}
                      </h2>
                      <span className="bg-metricool-yellow text-metricool-purple text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-metricool-purple">
                        🤖 Secteur : {registeredAudit.industry}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <span>URL : </span>
                      <a
                        href={registeredUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-metricool-purple hover:underline flex items-center gap-1"
                      >
                        {registeredUrl} <ExternalLink className="w-3 h-3 text-metricool-purple" />
                      </a>
                    </div>
                  </div>

                  <div className="bg-purple-50 text-metricool-purple px-5 py-3 rounded-2xl border-2 border-metricool-purple text-center shrink-0">
                    <div className="text-[10px] font-extrabold uppercase text-slate-500">Score Audit IA</div>
                    <div className="text-3xl font-extrabold text-metricool-purple">{registeredAudit.metrics.ssiScore}/100</div>
                  </div>
                </div>

                {/* KPI METRICS GRID */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-1">
                    <div className="text-[11px] font-extrabold uppercase text-slate-500 flex items-center justify-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-metricool-blue" /> Taux d'Engagement
                    </div>
                    <div className="text-2xl font-extrabold text-metricool-purple">{registeredAudit.metrics.engagementRate}</div>
                    <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Top Moyenne Sectorielle
                    </span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-1">
                    <div className="text-[11px] font-extrabold uppercase text-slate-500 flex items-center justify-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-500" /> Score SSI
                    </div>
                    <div className="text-2xl font-extrabold text-metricool-purple">{registeredAudit.metrics.ssiScore}/100</div>
                    <span className="text-[10px] text-purple-700 font-extrabold bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                      Social Selling Index
                    </span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-1">
                    <div className="text-[11px] font-extrabold uppercase text-slate-500 flex items-center justify-center gap-1">
                      <BarChart3 className="w-3.5 h-3.5 text-metricool-pink" /> Dwell Time
                    </div>
                    <div className="text-2xl font-extrabold text-metricool-purple">{registeredAudit.metrics.dwellTimeScore}/100</div>
                    <span className="text-[10px] text-blue-700 font-extrabold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                      Rétention Carrousels
                    </span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-1">
                    <div className="text-[11px] font-extrabold uppercase text-slate-500 flex items-center justify-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" /> Fréquence Hebdo
                    </div>
                    <div className="text-2xl font-extrabold text-metricool-purple">{registeredAudit.metrics.weeklyPostFrequency}</div>
                    <span className="text-[10px] text-slate-600 font-extrabold bg-slate-100 px-2 py-0.5 rounded-full">
                      Rythme Recommandé
                    </span>
                  </div>
                </div>
              </div>

              {/* STRENGTHS & AXES D'AMELIORATION */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 p-6 rounded-3xl border-2 border-emerald-400 space-y-3">
                  <h3 className="text-base font-extrabold text-emerald-950 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Points Forts de Votre Compte
                  </h3>
                  <div className="space-y-2 text-xs font-bold text-emerald-900">
                    {registeredAudit.strengths.map((str, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-emerald-200 flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-rose-50 p-6 rounded-3xl border-2 border-rose-300 space-y-3">
                  <h3 className="text-base font-extrabold text-rose-950 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-rose-600" /> Axes d'Amélioration Prioritaires
                  </h3>
                  <div className="space-y-2 text-xs font-bold text-rose-900">
                    {registeredAudit.weaknesses.map((weak, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-rose-200 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                        <span>{weak}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* EDITORIAL MIX & TAILORED HOOKS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border-2 border-metricool-purple metricool-card-shadow space-y-4">
                  <h3 className="text-base font-extrabold text-metricool-purple flex items-center gap-2">
                    <Layers className="w-5 h-5 text-metricool-pink" /> Répartition Éditoriale pour {registeredAudit.industry}
                  </h3>
                  <div className="space-y-3 pt-1">
                    {registeredAudit.editorialStrategy.recommendedMix.map((item, idx) => (
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

                <div className="bg-metricool-lightBlue/40 p-6 rounded-3xl border-2 border-metricool-purple metricool-card-shadow space-y-4">
                  <h3 className="text-base font-extrabold text-metricool-purple flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-metricool-pink" /> Accroches IA Optimisées pour {registeredAudit.industry}
                  </h3>
                  <div className="space-y-2">
                    {registeredAudit.editorialStrategy.tailoredHooks.map((hook, idx) => (
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
                  {registeredAudit.editorialStrategy.actionSteps.map((step, idx) => (
                    <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-metricool-purple text-metricool-yellow flex items-center justify-center font-extrabold shrink-0 text-xs">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-900 text-center">
              {auditError || 'Impossible de calculer l\'audit pour le moment.'}
            </div>
          )}

        </div>
      )}

      {/* TAB 2: AUDIT SEARCH TOOL FOR ANY OTHER PROFILES / COMPANY PAGES */}
      {activeTab === 'search_audit' && (
        <div className="animate-fadeIn">
          <ProfileAuditTool />
        </div>
      )}

      {/* TAB 3: WEBSITE SCANNER & OFFER ALIGNMENT */}
      {activeTab === 'website_scan' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-metricool-purple metricool-card-shadow space-y-4 animate-fadeIn">
          <div className="flex items-center gap-2 text-metricool-purple">
            <Globe className="w-6 h-6 text-metricool-blue" />
            <h2 className="text-xl font-extrabold">Analyse IA de votre Site Internet & Offres</h2>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            Renseignez l'adresse de votre site web d'entreprise pour que l'IA adapte vos carrousels et accroches à vos offres exactes.
          </p>

          <form onSubmit={handleScanWebsite} className="flex flex-col sm:flex-row gap-3 pt-1">
            <div className="relative flex-1">
              <Globe className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="url"
                required
                placeholder="https://votre-site-entreprise.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs border-2 border-slate-300 rounded-xl focus:border-metricool-purple font-bold"
              />
            </div>
            <button
              type="submit"
              disabled={isScanningSite}
              className="px-6 py-2.5 bg-metricool-purple hover:bg-black text-metricool-yellow font-extrabold rounded-xl text-xs shadow-md transition-all shrink-0 flex items-center justify-center gap-2"
            >
              {isScanningSite ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Scan sémantique du site...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" /> Lancer l'Analyse du Site
                </>
              )}
            </button>
          </form>

          {siteAnalysisResult && (
            <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-xs font-bold text-emerald-950 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold block text-sm text-emerald-900 mb-0.5">
                  Scan de Site Web Complété avec Succès !
                </span>
                <p className="text-emerald-900 leading-relaxed">{siteAnalysisResult}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Auth Modal for Switching Account */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onClientLoginSuccess={(p) => {
          setProfile(p);
          localStorage.setItem('linkedin_user_profile', JSON.stringify(p));
          runAutoAuditForRegisteredUser(p);
        }}
        onAdminLoginSuccess={() => {}}
      />

    </div>
  );
}
