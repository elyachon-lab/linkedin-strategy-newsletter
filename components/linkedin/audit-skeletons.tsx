'use client';

import { Activity, Sparkles, TrendingUp, Award, BarChart3, Clock, PieChart, AlertCircle } from 'lucide-react';

export function AuditDiagnosticSkeleton({ queryName = 'le profil' }: { queryName?: string }) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-metricool-purple metricool-card-shadow space-y-6 animate-pulse">
      
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-100 pb-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-metricool-pink text-xs font-extrabold border border-pink-300">
            <Activity className="w-3.5 h-3.5 text-metricool-pink animate-spin" /> PHASE 1 : SCAN & EXTRACTION DES DONNÉES EN COURS...
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-metricool-purple pt-1 flex items-center gap-2">
            <span>Scan sémantique de {queryName}...</span>
          </h2>
          <div className="h-3 bg-slate-200 rounded-full w-3/4 max-w-md"></div>
        </div>

        <div className="bg-pink-50 text-metricool-purple px-6 py-4 rounded-2xl border-2 border-pink-200 text-center shrink-0 space-y-1">
          <div className="h-3 bg-pink-200 rounded w-20 mx-auto"></div>
          <div className="h-8 bg-pink-300 rounded w-16 mx-auto animate-pulse"></div>
        </div>
      </div>

      {/* Sector AI Detection Skeleton */}
      <div className="p-4 bg-pink-50/60 border-2 border-pink-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-metricool-pink shrink-0 animate-bounce" />
          <div className="space-y-1.5 flex-1">
            <div className="h-4 bg-pink-200 rounded w-64"></div>
            <div className="h-3 bg-pink-100 rounded w-80"></div>
          </div>
        </div>
        <div className="h-8 bg-pink-200 rounded-xl w-32 shrink-0"></div>
      </div>

      {/* Grid 4 Metrics Skeletons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Taux d'Engagement", icon: TrendingUp },
          { label: 'Score SSI', icon: Award },
          { label: 'Index Dwell Time', icon: BarChart3 },
          { label: 'Fréquence Publiée', icon: Clock },
        ].map((item, idx) => (
          <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-2">
            <div className="text-[11px] font-extrabold uppercase text-slate-400 flex items-center justify-center gap-1">
              <item.icon className="w-3.5 h-3.5 text-slate-400" /> {item.label}
            </div>
            <div className="h-7 bg-slate-200 rounded-lg w-20 mx-auto animate-pulse"></div>
            <div className="h-4 bg-slate-100 rounded-full w-24 mx-auto"></div>
          </div>
        ))}
      </div>

      {/* Format Distribution & Position Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
          <h3 className="text-xs font-extrabold uppercase text-slate-700 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-metricool-pink" /> Extractions des formats de publication...
          </h3>
          <div className="space-y-3 pt-1">
            <div className="space-y-1">
              <div className="h-3 bg-slate-200 rounded w-full"></div>
              <div className="h-2 bg-slate-200 rounded-full w-full"></div>
            </div>
            <div className="space-y-1">
              <div className="h-3 bg-slate-200 rounded w-3/4"></div>
              <div className="h-2 bg-slate-200 rounded-full w-3/4"></div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
          <h3 className="text-xs font-extrabold uppercase text-slate-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500" /> Audit du positionnement et accroches...
          </h3>
          <div className="space-y-2">
            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
              <div className="h-3 bg-slate-200 rounded w-32"></div>
              <div className="h-3 bg-slate-100 rounded w-full"></div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
              <div className="h-3 bg-slate-200 rounded w-36"></div>
              <div className="h-3 bg-slate-100 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
