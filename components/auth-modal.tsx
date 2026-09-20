'use client';

import { useState, useEffect } from 'react';
import { LinkedInUserProfile } from '@/lib/types';
import { X, Linkedin, Lock, Sparkles, UserCheck, KeyRound, Loader2, ArrowRight, ShieldCheck, UserPlus, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClientLoginSuccess: (profile: LinkedInUserProfile) => void;
  onAdminLoginSuccess: () => void;
}

export function AuthModal({ isOpen, onClose, onClientLoginSuccess, onAdminLoginSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'client' | 'admin'>('client');
  const [savedProfiles, setSavedProfiles] = useState<LinkedInUserProfile[]>([]);
  const [showNewProfileForm, setShowNewProfileForm] = useState(false);

  // Client LinkedIn Form State (Zero manual inputs!)
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [clientError, setClientError] = useState('');

  // Admin Password Form State
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('registered_linkedin_accounts');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSavedProfiles(parsed);
          }
        } catch {}
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectSavedProfile = (profile: LinkedInUserProfile) => {
    onClientLoginSuccess(profile);
    onClose();
  };

  const extractHandleAndName = (input: string) => {
    const clean = input.trim();
    let handle = clean;
    if (clean.includes('linkedin.com/in/')) {
      handle = clean.split('linkedin.com/in/')[1].split('/')[0].split('?')[0];
    } else if (clean.includes('linkedin.com/company/')) {
      handle = clean.split('linkedin.com/company/')[1].split('/')[0].split('?')[0];
    }
    handle = handle.replace('@', '').trim();
    const rawName = handle.replace(/[-_]/g, ' ');
    const fullName = rawName
      ? rawName
          .split(' ')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ')
      : 'Membre B2B';

    return { handle, fullName };
  };

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setClientError('');

    if (!linkedinUrl.trim()) {
      setClientError('Veuillez renseigner votre URL ou identifiant LinkedIn.');
      return;
    }

    setIsAuditing(true);

    try {
      const { handle, fullName } = extractHandleAndName(linkedinUrl);

      const res = await fetch('/api/ai-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: handle,
          fullName,
          role: 'Membre LinkedIn B2B',
          followerCount: 0,
        }),
      });

      const data = await res.json();
      const detectedIndustry = data.detectedIndustry || 'SaaS & Tech';

      const newProfile: LinkedInUserProfile = {
        username: handle,
        fullName,
        industry: detectedIndustry,
        role: 'Créateur & Expert B2B',
        followerCount: 0,
        linkedinUrl: `https://www.linkedin.com/in/${handle}`,
        auditResult: data.auditResult,
      };

      // Save profile to registered accounts in localStorage
      const updatedList = [newProfile, ...savedProfiles.filter((p) => p.username !== newProfile.username)];
      setSavedProfiles(updatedList);
      localStorage.setItem('registered_linkedin_accounts', JSON.stringify(updatedList));

      onClientLoginSuccess(newProfile);
      onClose();
    } catch {
      setClientError('⚠️ Connexion au compte LinkedIn en cours...');
    } finally {
      setIsAuditing(false);
    }
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ROBUST_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'LinkedIn_Pro2026!Secured';
    if (adminPassword === ROBUST_PASS) {
      onAdminLoginSuccess();
      setAdminError('');
      onClose();
    } else {
      setAdminError('Mot de passe administrateur incorrect.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-8 transform transition-all">
        
        {/* Header */}
        <div className="px-6 py-4 bg-indigo-950 text-white flex items-center justify-between border-b border-indigo-900/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-900 text-indigo-300 flex items-center justify-center font-extrabold text-base border border-indigo-700/50">
              L
            </div>
            <h2 className="text-base font-black text-white">Bible LinkedIn • Connexion & Synchro IA</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-slate-50 p-2 gap-2">
          <button
            onClick={() => setActiveTab('client')}
            className={`flex-1 py-2.5 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'client'
                ? 'bg-indigo-950 text-white shadow-xs font-extrabold'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Linkedin className="w-4 h-4 text-indigo-400" /> Compte LinkedIn
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`flex-1 py-2.5 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'admin'
                ? 'bg-indigo-950 text-white shadow-xs font-extrabold'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Lock className="w-4 h-4 text-emerald-400" /> Administrateur
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          
          {/* TAB 1: CLIENT LINKEDIN LOGIN */}
          {activeTab === 'client' && (
            <div className="space-y-4">
              
              {/* SAVED ACCOUNTS LIST IF PRESENT */}
              {savedProfiles.length > 0 && !showNewProfileForm ? (
                <div className="space-y-4">
                  <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-200 text-xs space-y-1">
                    <h4 className="font-extrabold text-indigo-950 flex items-center gap-1.5 text-sm">
                      <UserCheck className="w-4 h-4 text-indigo-600" /> Vos Comptes LinkedIn Connectés
                    </h4>
                    <p className="text-slate-600 font-medium">
                      Sélectionnez votre profil enregistré pour accéder directement à votre espace et à vos rapports IA.
                    </p>
                  </div>

                  <div className="space-y-2">
                    {savedProfiles.map((p) => (
                      <button
                        key={p.username}
                        onClick={() => handleSelectSavedProfile(p)}
                        className="w-full bg-white hover:bg-indigo-50/50 p-3.5 rounded-2xl border border-slate-200 text-left transition-all flex items-center justify-between group brand-card-shadow"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-950 text-white flex items-center justify-center font-black text-sm border border-indigo-800">
                            {p.fullName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-indigo-950 text-xs">{p.fullName}</span>
                              <span className="bg-indigo-100 text-indigo-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                                🤖 {p.industry}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 font-bold">
                              @{p.username}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs font-extrabold text-indigo-600 group-hover:translate-x-1 transition-transform">
                          Accéder <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowNewProfileForm(true)}
                    className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold rounded-2xl text-xs border border-slate-300 transition-all flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-4 h-4 text-indigo-600" /> Connecter un autre profil LinkedIn
                  </button>
                </div>
              ) : (
                /* NEW PROFILE FORM - ZERO MANUAL INPUTS */
                <form onSubmit={handleClientSubmit} className="space-y-4">
                  {savedProfiles.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowNewProfileForm(false)}
                      className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 mb-2"
                    >
                      ← Choisir parmi mes comptes enregistrés
                    </button>
                  )}

                  <div className="space-y-3">
                    <Link
                      href="/connect-linkedin"
                      onClick={onClose}
                      className="w-full py-3.5 bg-[#0A66C2] hover:bg-[#004182] text-white font-extrabold rounded-2xl text-xs shadow-md transition-all flex items-center justify-center gap-2.5 border border-blue-900/20"
                    >
                      <Linkedin className="w-5 h-5 fill-white text-white" />
                      <span>Se Connecter via LinkedIn (1-Clic)</span>
                    </Link>
                    <div className="relative flex py-1 items-center">
                      <div className="flex-grow border-t border-slate-200"></div>
                      <span className="flex-shrink mx-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Ou via URL LinkedIn</span>
                      <div className="flex-grow border-t border-slate-200"></div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1 flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" /> URL ou Identifiant LinkedIn <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="https://www.linkedin.com/in/votre-profil"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full px-4 py-3 text-xs border border-slate-300 rounded-xl focus:border-indigo-600 font-bold text-slate-900"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      ✨ Extraction & détection IA 100% automatique du nom, du secteur et du profil.
                    </p>
                  </div>

                  {clientError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-extrabold text-rose-900 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{clientError}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isAuditing}
                      className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      {isAuditing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Connexion IA en cours...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-white" /> Connecter & Analyser par l'IA
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}

          {/* TAB 2: ADMIN LOGIN */}
          {activeTab === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-200 text-xs space-y-1">
                <h4 className="font-extrabold text-indigo-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" /> Espace Administrateur
                </h4>
                <p className="text-slate-600 font-medium">
                  Accès réservé à la purge de la base, à la gestion des abonnés et à la parution.
                </p>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-indigo-950 mb-1.5 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-indigo-600" /> Mot de passe Administrateur
                </label>
                <input
                  type="password"
                  required
                  placeholder="Entrez votre mot de passe administrateur"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-2xl focus:border-indigo-600 font-bold"
                />
              </div>

              {adminError && (
                <p className="text-xs font-bold text-rose-600 text-center bg-rose-50 p-2 rounded-xl border border-rose-200">
                  {adminError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-indigo-950 hover:bg-black text-white font-extrabold rounded-2xl text-xs shadow-md transition-all"
              >
                Connexion Administrateur 🔒
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
