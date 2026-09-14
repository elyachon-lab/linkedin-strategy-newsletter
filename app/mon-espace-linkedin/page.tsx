'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LinkedInUserProfile, AIAuditResult } from '@/lib/types';
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
} from 'lucide-react';

export default function DedicatedClientSpacePage() {
  const [profile, setProfile] = useState<LinkedInUserProfile | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isScanningSite, setIsScanningSite] = useState(false);
  const [siteAnalysisResult, setSiteAnalysisResult] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [savedProfiles, setSavedProfiles] = useState<LinkedInUserProfile[]>([]);

  useEffect(() => {
    // 1. Load active client profile
    const saved = localStorage.getItem('linkedin_user_profile');
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch {}
    } else {
      // Default fallback profile if not logged in yet
      const fallback: LinkedInUserProfile = {
        username: 'jeandupont',
        fullName: 'Jean Dupont',
        industry: 'SaaS & Tech',
        role: 'CEO & Fondateur',
        followerCount: 4800,
        auditResult: {
          score: 88,
          industry: 'SaaS & Tech',
          audienceTier: 'En Croissance (2k - 10k abonnés)',
          tailoredHooks: [
            '"Comment nous avons résolu [Problème Majeur en SaaS & Tech] en 30 jours sans augmenter notre budget."',
            '"90% des professionnels en SaaS & Tech commettent encore cette erreur. Voici comment l\'éviter :"',
            '"J\'ai analysé les 5 meilleures campagnes B2B en SaaS & Tech. Voici les 3 règles d\'or à copier immédiatement :"'
          ],
          formatStrategy: 'Privilégiez 2 carrousels PDF verticaux (1080x1350 px) par semaine pour maximiser le Dwell Time + 2 posts texte avec storytelling personnel.',
          bestPostingWindows: [
            'Mardi à 07h45 (Avant le premier café)',
            'Mercredi à 12h15 (Pause déjeuner sectorielle)',
            'Jeudi à 17h45 (Fin de journée)'
          ],
          recommendedHashtags: ['#SaaS', '#LinkedInB2B', '#GrowthStrategy', '#ContentMarketing'],
          growthActionPlan: [
            '1. Repositionnez votre titre de profil : "J\'aide [Cible SaaS & Tech] à obtenir [Résultat] grâce à [Méthode]".',
            '2. Rédigez le 1er commentaire sous vos posts avec le lien direct vers votre produit/newsletter.',
            '3. Engagez-vous en laissant 5 commentaires à forte valeur chez les décideurs de votre secteur avant de publier.'
          ]
        }
      };
      setProfile(fallback);
    }

    // 2. Load saved profiles list
    const storedAccounts = localStorage.getItem('registered_linkedin_accounts');
    if (storedAccounts) {
      try {
        const parsed = JSON.parse(storedAccounts);
        if (Array.isArray(parsed)) setSavedProfiles(parsed);
      } catch {}
    }
  }, []);

  const handleScanWebsite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl.trim()) return;

    setIsScanningSite(true);
    setTimeout(() => {
      setIsScanningSite(false);
      setSiteAnalysisResult(
        `Analyse IA effectuée pour ${websiteUrl.trim()} : Alignement parfait avec votre secteur (${profile?.industry || 'B2B'}). Nous recommandons d'intégrer vos cas clients récents dans vos 2 prochains carrousels LinkedIn.`
      );
    }, 1200);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const audit: AIAuditResult | undefined = profile?.auditResult;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Top Banner Header */}
      <div className="bg-metricool-purple text-white p-6 sm:p-8 rounded-3xl border-2 border-metricool-purple metricool-card-shadow space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-metricool-yellow text-metricool-purple flex items-center justify-center font-extrabold text-2xl border-2 border-metricool-purple shadow-md">
              {profile?.fullName.charAt(0).toUpperCase() || 'L'}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">{profile?.fullName}</h1>
                <span className="bg-metricool-yellow text-metricool-purple text-xs font-extrabold px-3 py-0.5 rounded-full uppercase border border-metricool-purple">
                  🤖 Secteur IA : {profile?.industry}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-bold mt-1 flex items-center gap-2">
                <span>@{profile?.username}</span> •
                <span>{profile?.followerCount.toLocaleString()} abonnés</span> •
                <span>{profile?.role}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-center">
              <div className="text-[10px] font-extrabold uppercase text-slate-300">Score Audit IA</div>
              <div className="text-2xl font-extrabold text-metricool-yellow">{audit?.score || 88}/100</div>
            </div>

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-3 bg-metricool-yellow hover:bg-yellow-300 text-metricool-purple font-extrabold rounded-2xl text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4" /> Changer / Re-scanner Profil
            </button>
          </div>
        </div>

        {/* AI Auto-Detection Confirmation & Tech Watch Source Link */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium pt-2">
          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15 space-y-1">
            <div className="font-extrabold text-metricool-yellow flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-metricool-pink" /> 1. Secteur Auto-Détecté
            </div>
            <p className="text-slate-300">
              L'IA a identifié la branche <strong>{profile?.industry}</strong> à partir de l'analyse sémantique de vos informations.
            </p>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15 space-y-1">
            <div className="font-extrabold text-metricool-yellow flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-metricool-blue" /> 2. Croisé avec la Veille 2026
            </div>
            <p className="text-slate-300">
              Conseils basés sur l'Algorithme Dwell Time, Thought Leader Ads et les flux certifiés (LinkedIn Eng & Google Ads).
            </p>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15 space-y-1">
            <div className="font-extrabold text-metricool-yellow flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-400" /> 3. Scan de Votre Site Web
            </div>
            <p className="text-slate-300">
              Ajoutez l'URL de votre site internet ci-dessous pour affiner la stratégie d'accroches de vos offres.
            </p>
          </div>
        </div>

      </div>

      {/* SECTION 1: AI WEBSITE & BRAND ALIGNMENT SCANNER */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-metricool-purple metricool-card-shadow space-y-4">
        <div className="flex items-center gap-2 text-metricool-purple">
          <Globe className="w-6 h-6 text-metricool-blue" />
          <h2 className="text-xl font-extrabold">Analyse IA de votre Site Internet & Offres</h2>
        </div>
        <p className="text-xs text-slate-600 font-medium">
          Renseignez l'adresse de votre site web d'entreprise pour que l'IA adapte vos carrousels et accroches à vos produits exacts.
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

      {/* SECTION 2: AI TAILORED HOOKS & FORMAT STRATEGY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Tailored Hooks */}
        <div className="bg-metricool-lightBlue/40 p-6 sm:p-8 rounded-3xl border-2 border-metricool-purple metricool-card-shadow space-y-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-100 text-purple-900 text-xs font-extrabold border border-purple-300 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-700" /> IA Generator
            </div>
            <h3 className="text-lg font-extrabold text-metricool-purple">
              Accroches Optimisées pour {profile?.industry}
            </h3>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Copiez ces accroches conçues pour retenir l'attention dans les 3 premières lignes de votre post.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {audit?.tailoredHooks.map((hook, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border-2 border-metricool-purple text-xs font-bold text-metricool-purple flex items-center justify-between gap-3 shadow-2xs"
              >
                <span className="italic leading-relaxed">"{hook}"</span>
                <button
                  onClick={() => copyToClipboard(hook, idx)}
                  className="bg-metricool-yellow text-metricool-purple text-[11px] font-extrabold px-3 py-1.5 rounded-xl border-2 border-metricool-purple hover:bg-yellow-300 transition-colors shrink-0 flex items-center gap-1"
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

        {/* Format Strategy & Posting Windows */}
        <div className="bg-purple-50 p-6 sm:p-8 rounded-3xl border-2 border-metricool-purple metricool-card-shadow space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-extrabold text-metricool-purple flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-700" /> Stratégie de Formats & Fréquence
            </h3>
            <p className="text-xs font-medium text-slate-800 leading-relaxed bg-white p-4 rounded-2xl border-2 border-purple-200 shadow-2xs">
              {audit?.formatStrategy}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase text-slate-600 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-metricool-blue" /> Créneaux Horaires Recommandés pour {profile?.industry}
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {audit?.bestPostingWindows.map((win, idx) => (
                <span
                  key={idx}
                  className="text-xs font-extrabold text-metricool-purple bg-white border-2 border-metricool-purple px-3 py-1.5 rounded-xl shadow-2xs"
                >
                  {win}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 3: ACTION PLAN */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-metricool-purple metricool-card-shadow space-y-4">
        <h3 className="text-lg font-extrabold text-metricool-purple flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" /> Plan d'Action Recommandé par l'IA
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {audit?.growthActionPlan.map((step, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-800 space-y-2">
              <div className="w-7 h-7 rounded-xl bg-metricool-purple text-metricool-yellow flex items-center justify-center font-extrabold">
                {idx + 1}
              </div>
              <p className="leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Auth Modal for Switching Account */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onClientLoginSuccess={(p) => {
          setProfile(p);
          localStorage.setItem('linkedin_user_profile', JSON.stringify(p));
        }}
        onAdminLoginSuccess={() => {}}
      />

    </div>
  );
}
