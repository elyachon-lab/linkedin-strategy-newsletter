'use client';

import { useState } from 'react';
import { LinkedInUserProfile } from '@/lib/types';
import { X, Linkedin, Lock, Sparkles, UserCheck, KeyRound, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClientLoginSuccess: (profile: LinkedInUserProfile) => void;
  onAdminLoginSuccess: () => void;
}

const INDUSTRIES = [
  'SaaS & Tech',
  'Marketing & Growth',
  'FinTech & Finance',
  'RH & Recrutement',
  'E-Commerce & Retail',
  'Conseil & Consulting',
  'Immobilier',
  'Santé & MedTech',
  'Création de Contenu',
];

export function AuthModal({ isOpen, onClose, onClientLoginSuccess, onAdminLoginSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'client' | 'admin'>('client');

  // Client LinkedIn Form State
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [role, setRole] = useState('');
  const [followerCount, setFollowerCount] = useState('2500');
  const [isAuditing, setIsAuditing] = useState(false);

  // Admin Password Form State
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  if (!isOpen) return null;

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !fullName.trim()) return;

    setIsAuditing(true);

    try {
      const res = await fetch('/api/ai-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.replace('@', '').trim(),
          fullName,
          industry,
          role: role || 'Créateur B2B',
          followerCount: parseInt(followerCount) || 1000,
        }),
      });

      const data = await res.json();

      const profile: LinkedInUserProfile = {
        username: username.replace('@', '').trim(),
        fullName,
        industry,
        role: role || 'Créateur B2B',
        followerCount: parseInt(followerCount) || 1000,
        auditResult: data.auditResult,
      };

      onClientLoginSuccess(profile);
      onClose();
    } catch {
      const fallbackProfile: LinkedInUserProfile = {
        username: username.replace('@', '').trim(),
        fullName,
        industry,
        role: role || 'Créateur B2B',
        followerCount: parseInt(followerCount) || 1000,
      };
      onClientLoginSuccess(fallbackProfile);
      onClose();
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
            <h2 className="text-base font-extrabold text-white">Connexion & Audit LinkedIn IA</h2>
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
            <Linkedin className="w-4 h-4 text-metricool-blue" /> Client Newsletter & Profil IA
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
            <form onSubmit={handleClientSubmit} className="space-y-4">
              <div className="bg-metricool-lightBlue/40 p-4 rounded-2xl border-2 border-metricool-purple text-xs space-y-1">
                <h4 className="font-extrabold text-metricool-purple flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-metricool-pink" /> Audit IA & Conseils Sectoriels Adaptés
                </h4>
                <p className="text-slate-600 font-medium">
                  Renseignez votre compte LinkedIn pour recevoir nos recommandations d'accroches, d'heures et de formats adaptées à votre branche.
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
                    Secteur d'Activité <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3 py-2 text-xs border-2 border-slate-300 rounded-xl focus:border-metricool-purple font-bold bg-white"
                  >
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
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

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">
                  Intitulé de Poste / Rôle
                </label>
                <input
                  type="text"
                  placeholder="ex: CEO & Fondateur, Head of Growth, Consultant B2B..."
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border-2 border-slate-300 rounded-xl focus:border-metricool-purple font-medium"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isAuditing}
                  className="w-full py-3 bg-metricool-purple hover:bg-black text-metricool-yellow font-extrabold rounded-2xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isAuditing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Analyse IA du profil en cours...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-metricool-yellow" /> Connecter & Lancer l'Audit IA
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: ADMIN LOGIN */}
          {activeTab === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 text-xs space-y-1">
                <h4 className="font-extrabold text-metricool-purple flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-purple-700" /> Connexion Espace Administrateur
                </h4>
                <p className="text-slate-600 font-medium">
                  Accès réservé à la gestion des abonnés et à la rédaction des éditions.
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
