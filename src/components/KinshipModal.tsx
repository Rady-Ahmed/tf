import React, { useState, useMemo } from 'react';
import { GitCompare, X, Compass } from 'lucide-react';
import { Person } from '../types/database';
import { calculateKinship } from '../utils/kinship';

interface KinshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  persons: Person[];
  initialPersonAId?: string;
  onSelectPerson?: (p: Person) => void;
}

export const KinshipModal: React.FC<KinshipModalProps> = ({
  isOpen,
  onClose,
  persons,
  initialPersonAId
}) => {
  const [personAId, setPersonAId] = useState<string>(initialPersonAId || (persons[0]?.id || ''));
  const [personBId, setPersonBId] = useState<string>(persons[1]?.id || '');

  const personMap = useMemo(() => {
    const map = new Map<string, Person>();
    persons.forEach(p => {
      map.set(p.id, p);
      if (p.legacy_id) map.set(p.legacy_id, p);
    });
    return map;
  }, [persons]);

  const kinship = useMemo(() => {
    if (!personAId || !personBId) return null;
    return calculateKinship(personAId, personBId, personMap);
  }, [personAId, personBId, personMap]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-3xl" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <GitCompare size={22} />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                حاسبة صلة القرابة والنسب
              </h3>
              <p className="text-xs text-slate-300">
                اختر أي شخصين من شجرة آل راضي لاكتشاف الجد المشترك ودرجة القرابة بدقة
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Person A */}
            <div className="glass-panel p-4 border-amber-500/30 space-y-2">
              <label className="block text-xs font-bold text-amber-400">
                الشخص الأول (أ)
              </label>
              <select
                value={personAId}
                onChange={e => setPersonAId(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                {persons.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.first_name} (ج {p.generation}) — {p.full_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Person B */}
            <div className="glass-panel p-4 border-emerald-500/30 space-y-2">
              <label className="block text-xs font-bold text-emerald-400">
                الشخص الثاني (ب)
              </label>
              <select
                value={personBId}
                onChange={e => setPersonBId(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                {persons.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.first_name} (ج {p.generation}) — {p.full_name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Kinship Result Presentation */}
          {kinship && (
            <div className="space-y-6">
              
              {/* Summary Banner */}
              <div className="glass-panel p-5 text-center space-y-2 border-amber-500/40 bg-gradient-to-b from-amber-500/10 to-transparent">
                <div className="text-xs text-amber-400 font-serif">نتيجة فحص النسب والقرابة</div>
                <div className="font-display font-bold text-xl sm:text-2xl text-white">
                  {kinship.relationshipTerm}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl mx-auto">
                  {kinship.relationshipDescription}
                </p>
              </div>

              {/* Common Ancestor Card */}
              {kinship.commonAncestor && (
                <div className="glass-panel p-4 text-center max-w-md mx-auto border-gold-500/30 space-y-1">
                  <div className="text-[11px] text-amber-400 font-bold flex items-center justify-center gap-1">
                    <Compass size={14} />
                    <span>الجد المشترك الأقرب الجامع بينهما</span>
                  </div>
                  <div className="font-display font-bold text-lg text-white">
                    {kinship.commonAncestor.first_name}
                  </div>
                  <div className="text-xs text-slate-300">
                    {kinship.commonAncestor.full_name}
                  </div>
                  <span className="badge badge-gold text-[10px] mt-1">
                    الجيل {kinship.commonAncestor.generation}
                  </span>
                </div>
              )}

              {/* Step-by-Step Ancestry Paths */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                {/* Path from A up to Common Ancestor */}
                <div className="glass-panel p-4 space-y-3 border-amber-500/20">
                  <div className="text-xs font-bold text-amber-300 border-b border-white/5 pb-2">
                    مسار صعود نسب: {kinship.personA.first_name}
                  </div>
                  <div className="space-y-2">
                    {kinship.pathA.map((p, idx) => (
                      <div key={p.id} className="flex items-center gap-2 text-xs">
                        <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-[10px] shrink-0">
                          {idx + 1}
                        </span>
                        <span className={`font-medium ${idx === 0 ? 'text-amber-300 font-bold' : 'text-slate-300'}`}>
                          {p.first_name}
                        </span>
                        <span className="text-[10px] text-slate-400 mr-auto">
                          ج {p.generation}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Path from B up to Common Ancestor */}
                <div className="glass-panel p-4 space-y-3 border-emerald-500/20">
                  <div className="text-xs font-bold text-emerald-300 border-b border-white/5 pb-2">
                    مسار صعود نسب: {kinship.personB.first_name}
                  </div>
                  <div className="space-y-2">
                    {kinship.pathB.map((p, idx) => (
                      <div key={p.id} className="flex items-center gap-2 text-xs">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-[10px] shrink-0">
                          {idx + 1}
                        </span>
                        <span className={`font-medium ${idx === 0 ? 'text-emerald-300 font-bold' : 'text-slate-300'}`}>
                          {p.first_name}
                        </span>
                        <span className="text-[10px] text-slate-400 mr-auto">
                          ج {p.generation}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

