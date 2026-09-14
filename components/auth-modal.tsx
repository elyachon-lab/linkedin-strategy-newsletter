'use client';

import { useState, useEffect } from 'react';
import { LinkedInUserProfile } from '@/lib/types';
import { X, Linkedin, Lock, Sparkles, UserCheck, KeyRound, Loader2, ArrowRight, ShieldCheck, UserPlus, AlertTriangle } from 'lucide-react';

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

  // Client LinkedIn Form State
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('');
  const [followerCount, setFollowerCount] = useState('2500');
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

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setClientError('');

    if (!username.trim() || !fullName.trim()) return;

    setIsAuditing(true);

    try {
      const res = await fetch('/api/ai-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.replace('@', '').trim(),
          fullName,
          role: role || 'Créateur B2B',
          followerCount: parseInt(followerCount) || 2500,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.isValidAccount === false) {
        setClientError(data.error || '⚠️ Compte LinkedIn invalide ou fictif détecté.');
        setIsAuditing(false);
        return;
      }

      const detectedIndustry = data.detectedIndustry || 'SaaS & Tech';

      const newProfile: LinkedInUserProfile = {
        username: username.replace('@', '').trim(),
        fullName,
        industry: detectedIndustry,
        role: role || 'Créateur B2B',
        followerCount: parseInt(followerCount) || 2500,
        auditResult: data.auditResult,
      };

      // Save profile to registered accounts in localStorage
      const updatedList = [newProfile, ...savedProfiles.filter((p) => p.username !== newProfile.username)];
      setSavedProfiles(updatedList);
      localStorage.setItem('registered_linkedin_accounts', JSON.stringify(updatedList));

      onClientLoginSuccess(newProfile);
      onClose();
    } catch {
      setClientError('⚠️ Impossible de vérifier le compte LinkedIn. Veuillez vérifier la connexion.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border-2 border-metricool-purple overflow-hidden my-8 transform transition-all">
        
        {/* Header */}
        <div className="px-6 py-4 bg-metricool-purple text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-metricool-yellow text-metricool-purple flex items-center justify-center font-extrabold text-base">
              L
            </div>
            <h2 className="text-base font-extrabold text-white">Connexion & Verification IA LinkedIn</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b-2 border-slate-100 bg-slate-50 p-2 gap-2">
          <button
            onClick={() => setActiveTab('client')}
            className={`flex-1 py-2.5 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'client'
                ? 'bg-metricool-yellow text-metricool-purple border-2 border-metricool-purple shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Linkedin className="w-4 h-4 text-metricool-blue" /> Compte LinkedIn & Audit IA
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`flex-1 py-2.5 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'admin'
                ? 'bg-metricool-purple text-metricool-yellow shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Lock className="w-4 h-4 text-metricool-pink" /> Administrateur
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          
          {/* TAB 1: CLIENT LINKEDIN LOGIN & AI SCANNER */}
          {activeTab === 'client' && (
            <div className="space-y-4">
              
              {/* SAVED ACCOUNTS LIST IF PRESENT */}
              {savedProfiles.length > 0 && !showNewProfileForm ? (
                <div className="space-y-4">
                  <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-300 text-xs space-y-1">
                    <h4 className="font-extrabold text-emerald-950 flex items-center gap-1.5 text-sm">
                      <UserCheck className="w-4 h-4 text-emerald-600" /> Vos Comptes LinkedIn Vérifiés
                    </h4>
                    <p className="text-emerald-900 font-medium">
                      Sélectionnez votre compte enregistré pour accéder instantanément à votre espace et à vos conseils IA sectoriels.
                    </p>
                  </div>

                  <div className="space-y-2">
                    {savedProfiles.map((p) => (
                      <button
                        key={p.username}
                        onClick={() => handleSelectSavedProfile(p)}
                        className="w-full bg-white hover:bg-purple-50 p-3.5 rounded-2xl border-2 border-metricool-purple text-left transition-all flex items-center justify-between group shadow-2xs"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-xl bg-metricool-purple text-metricool-yellow flex items-center justify-center font-extrabold text-sm border border-metricool-purple">
                            {p.fullName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-metricool-purple text-xs">{p.fullName}</span>
                              <span className="bg-metricool-yellow text-metricool-purple text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                                🤖 {p.industry}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 font-bold">
                              @{p.username} • {p.followerCount.toLocaleString()} abonnés
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs font-extrabold text-metricool-purple group-hover:translate-x-1 transition-transform">
                          Connexion <ArrowRight className="w-3.5 h-3.5 text-metricool-purple" />
                        </div>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowNewProfileForm(true)}
                    className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold rounded-2xl text-xs border-2 border-slate-300 transition-all flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-4 h-4 text-metricool-purple" /> Connecter un autre compte LinkedIn
                  </button>
                </div>
              ) : (
                /* NEW PROFILE FORM WITH REAL ACCOUNT VERIFICATION & AI SECTOR AUTO-DETECTION */
                <form onSubmit={handleClientSubmit} className="space-y-4">
                  {savedProfiles.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowNewProfileForm(false)}
                      className="text-xs font-bold text-metricool-purple hover:underline flex items-center gap-1 mb-2"
                    >
                      ← Choisir parmi mes comptes enregistrés
                    </button>
                  )}

                  <div className="bg-metricool-lightBlue/40 p-4 rounded-2xl border-2 border-metricool-purple text-xs space-y-1.5">
                    <h4 className="font-extrabold text-metricool-purple flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-metricool-pink" /> Vérification IA du Compte Réel & Auto-Détection
                    </h4>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      L'IA va <strong>vérifier l'authenticité de votre profil LinkedIn</strong> et analyser automatiquement votre secteur sans saisie manuelle.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                        Nom & Prénom <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="ex: Jean Dupont"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border-2 border-slate-300 rounded-xl focus:border-metricool-purple font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                        Identifiant / Pseudo LinkedIn <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="ex: jeandupont (sans @)"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border-2 border-slate-300 rounded-xl focus:border-metricool-purple font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                        Intitulé de Poste / Bio
                      </label>
                      <input
                        type="text"
                        placeholder="ex: Lead Tech, Head of Marketing, DRH..."
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border-2 border-slate-300 rounded-xl focus:border-metricool-purple font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                        Nombre d'Abonnés LinkedIn
                      </label>
                      <input
                        type="number"
                        placeholder="ex: 5000"
                        value={followerCount}
                        onChange={(e) => setFollowerCount(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border-2 border-slate-300 rounded-xl focus:border-metricool-purple font-bold"
                      />
                    </div>
                  </div>

                  {clientError && (
                    <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-xs font-extrabold text-rose-900 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{clientError}</span>
                    </div>
                  )}

                  {/* AI Auto-Detection Highlight Banner */}
                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-[11px] font-bold text-purple-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>🔍 Vérification d'authenticité et détection du secteur exécutées par l'IA.</span>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isAuditing}
                      className="w-full py-3 bg-metricool-purple hover:bg-black text-metricool-yellow font-extrabold rounded-2xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      {isAuditing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Vérification du compte LinkedIn par l'IA...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-metricool-yellow" /> Vérifier le Compte & Lancer l'Analyse
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
              <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 text-xs space-y-1">
                <h4 className="font-extrabold text-metricool-purple flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-purple-700" /> Connexion Espace Administrateur
                </h4>
                <p className="text-slate-600 font-medium">
                  Accès réservé à la gestion des abonnés, à la suppression de contenu et à la programmation.
                </p>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-metricool-purple mb-1.5 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-metricool-pink" /> Mot de passe Administrateur
                </label>
                <input
                  type="password"
                  required
                  placeholder="Entrez votre mot de passe administrateur"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-3 text-sm border-2 border-metricool-purple rounded-2xl focus:outline-none focus:ring-4 focus:ring-metricool-yellow/50 font-bold"
                />
              </div>

              {adminError && (
                <p className="text-xs font-bold text-rose-600 text-center bg-rose-50 p-2 rounded-xl border border-rose-200">
                  {adminError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-metricool-purple hover:bg-black text-metricool-yellow font-extrabold rounded-2xl text-xs shadow-md transition-all hover:scale-105"
              >
                Se connecter en tant qu'Administrateur
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
