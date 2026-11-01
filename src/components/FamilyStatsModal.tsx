import React, { useMemo } from 'react';
import { X, BarChart3, PieChart, Award } from 'lucide-react';
import { Person, FamilyBranch } from '../types/database';

interface FamilyStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  persons: Person[];
  branches: FamilyBranch[];
}

export const FamilyStatsModal: React.FC<FamilyStatsModalProps> = ({
  isOpen,
  onClose,
  persons,
  branches
}) => {
  // Compute analytics
  const analytics = useMemo(() => {
    const total = persons.length;
    const deceased = persons.filter(p => p.is_deceased).length;
    const living = total - deceased;

    // Branches breakdown
    const branchCounts: Record<string, number> = {};
    persons.forEach(p => {
      const b = p.branch_id || 'root';
      branchCounts[b] = (branchCounts[b] || 0) + 1;
    });

    // Generations breakdown
    const genCounts: Record<number, number> = {};
    persons.forEach(p => {
      genCounts[p.generation] = (genCounts[p.generation] || 0) + 1;
    });

    const maxGen = Math.max(...persons.map(p => p.generation), 1);

    // Most common first names
    const nameCounts: Record<string, number> = {};
    persons.forEach(p => {
      const name = p.first_name.trim();
      nameCounts[name] = (nameCounts[name] || 0) + 1;
    });

    const topNames = Object.entries(nameCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    return {
      total,
      deceased,
      living,
      branchCounts,
      genCounts,
      maxGen,
      topNames
    };
  }, [persons]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-4xl" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <BarChart3 size={22} />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                إحصائيات ومؤشرات عائلة آل راضي
              </h3>
              <p className="text-xs text-slate-300">
                تحليل رقمي شامل لأجيال العائلة، الفروع الكبرى، والأسماء الأكثر تكرارًا عبر القرون
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          
          {/* Top 4 KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="glass-panel p-4 text-center">
              <div className="text-2xl font-display font-bold text-white">
                {analytics.total}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-medium">إجمالي الأفراد الموثقين</div>
            </div>

            <div className="glass-panel p-4 text-center">
              <div className="text-2xl font-display font-bold text-amber-400">
                {analytics.maxGen}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-medium">أجيال ممتدة (١-١٠)</div>
            </div>

            <div className="glass-panel p-4 text-center">
              <div className="text-2xl font-display font-bold text-emerald-400">
                {analytics.living}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-medium">الأحياء حفظهم الله</div>
            </div>

            <div className="glass-panel p-4 text-center">
              <div className="text-2xl font-display font-bold text-slate-300">
                {analytics.deceased}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-medium">الراحلون رحمهم الله</div>
            </div>
          </div>

          {/* Branches Distribution */}
          <div className="glass-panel p-5 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-white">
              <span className="flex items-center gap-1.5 text-amber-400">
                <PieChart size={15} />
                <span>توزيع أفراد العائلة حسب الفروع الكبرى</span>
              </span>
              <span className="text-slate-400">٣ فروع رئيسية</span>
            </div>

            <div className="space-y-3">
              {branches.map(branch => {
                const count = analytics.branchCounts[branch.code] || 0;
                const pct = Math.round((count / analytics.total) * 100);
                return (
                  <div key={branch.code} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-200 font-medium">{branch.name}</span>
                      <span className="text-amber-400 font-mono">{count} فرد ({pct}%)</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-700" 
                        style={{ width: `${pct}%`, backgroundColor: branch.color || '#047857' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Generations Distribution */}
          <div className="glass-panel p-5 space-y-4">
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <BarChart3 size={15} />
              <span>أعداد الأفراد في كل جيل (من الجيل الأول إلى العاشر)</span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 text-center pt-2">
              {Array.from({ length: analytics.maxGen }, (_, i) => i + 1).map(gen => {
                const count = analytics.genCounts[gen] || 0;
                const heightPct = Math.max(15, (count / 25) * 100);
                return (
                  <div key={gen} className="flex flex-col items-center gap-1.5">
                    <div className="text-[10px] text-amber-400 font-bold">{count}</div>
                    <div className="w-full bg-slate-800 rounded-t h-20 flex items-end justify-center p-0.5">
                      <div 
                        className="w-full bg-gradient-to-t from-emerald-600 to-amber-400 rounded-t transition-all duration-500"
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">ج {gen}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Most Frequent Ancestral Names */}
          <div className="glass-panel p-5 space-y-3">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Award size={15} />
              <span>الأسماء الأكثر تكرارًا وتوارثًا عبر الأجيال</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {analytics.topNames.map(([name, count], idx) => (
                <div 
                  key={name}
                  className="glass-panel px-3 py-1.5 text-xs flex items-center gap-2 border-amber-500/20"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-white">{name}</span>
                  <span className="badge badge-gold text-[10px]">
                    {count} مرات
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

