'use client';

import { useState } from 'react';
import { LinkedInUserProfile, AIAuditResult } from '@/lib/types';
import { Sparkles, CheckCircle2, TrendingUp, Clock, Copy, Check, Linkedin, Zap, Award, Target, ArrowRight } from 'lucide-react';

interface AIAuditRecommendationsProps {
  profile: LinkedInUserProfile;
  onRefreshAudit?: () => void;
}

export function AIAuditRecommendations({ profile, onRefreshAudit }: AIAuditRecommendationsProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const audit: AIAuditResult | undefined = profile.auditResult;

  if (!audit) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-metricool-purple metricool-card-shadow p-6 sm:p-8 space-y-6">
      
      {/* Header Profile Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-metricool-purple text-white p-6 rounded-2xl border-2 border-metricool-purple">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-metricool-yellow text-metricool-purple flex items-center justify-center font-extrabold text-2xl border-2 border-metricool-purple shadow-md">
            {profile.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-white">{profile.fullName}</h3>
              <span className="bg-metricool-yellow text-metricool-purple text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1 border border-metricool-purple">
                🤖 Secteur IA : {profile.industry}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-bold mt-1">
              @{profile.username} • {profile.followerCount.toLocaleString()} abonnés • {profile.role}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-white text-metricool-purple px-4 py-2 rounded-2xl border-2 border-metricool-purple text-center shadow-xs">
            <div className="text-xs font-extrabold uppercase text-slate-500">Score IA Audit</div>
            <div className="text-2xl font-extrabold text-metricool-purple">{audit.score}/100</div>
          </div>
        </div>
      </div>

      {/* Grid of Sector Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Customized Hooks for Sector */}
        <div className="bg-metricool-lightBlue/40 p-6 rounded-2xl border-2 border-metricool-purple space-y-3">
          <h4 className="text-sm font-extrabold text-metricool-purple flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-metricool-pink" />
            Accroches IA Générées pour le secteur {audit.industry}
          </h4>
          <p className="text-xs text-slate-600 font-medium">
            Adaptées à votre taille d'audience ({profile.followerCount.toLocaleString()} abonnés).
          </p>

          <div className="space-y-2 pt-1">
            {audit.tailoredHooks.map((hook, idx) => (
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

        {/* Format Strategy & Best Posting Windows */}
        <div className="bg-purple-50 p-6 rounded-2xl border-2 border-metricool-purple space-y-4">
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-metricool-purple flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-700" />
              Recommandation de Formats & Fréquence
            </h4>
            <p className="text-xs font-medium text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-purple-200">
              {audit.formatStrategy}
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="text-xs font-extrabold uppercase text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-metricool-blue" /> Créneaux Horaires Optimaux pour votre secteur
            </h4>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {audit.bestPostingWindows.map((win, idx) => (
                <span
                  key={idx}
                  className="text-xs font-extrabold text-metricool-purple bg-white border border-metricool-purple px-2.5 py-1 rounded-lg"
                >
                  {win}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Action Plan */}
      <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 space-y-3">
        <h4 className="text-sm font-extrabold text-metricool-purple flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          Plan d'Action Immédiat pour Doubler la Portée de vos Posts
        </h4>
        <div className="space-y-2 text-xs font-bold text-slate-800">
          {audit.growthActionPlan.map((step, idx) => (
            <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
