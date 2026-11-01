import React, { useState } from 'react';
import { 
  X, 
  User, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  TreePine, 
  HeartHandshake, 
  Share2, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Users,
  ChevronLeft
} from 'lucide-react';
import { Person, Memory } from '../types/database';

interface PersonModalProps {
  person: Person | null;
  onClose: () => void;
  onSelectRelative: (p: Person) => void;
  onOpenContributionForPerson: (p: Person) => void;
  allPersons: Person[];
  memories?: Memory[];
}

export const PersonModal: React.FC<PersonModalProps> = ({
  person,
  onClose,
  onSelectRelative,
  onOpenContributionForPerson,
  allPersons,
  memories = []
}) => {
  const [copied, setCopied] = useState(false);

  if (!person) return null;

  // Find relatives
  const father = person.father_id 
    ? allPersons.find(p => p.id === person.father_id || p.legacy_id === person.father_id)
    : null;

  const children = allPersons.filter(p => 
    p.father_id === person.id || (person.legacy_id && p.father_id === person.legacy_id)
  );

  const siblings = father 
    ? allPersons.filter(p => 
        (p.father_id === father.id || (father.legacy_id && p.father_id === father.legacy_id)) && 
        p.id !== person.id
      )
    : [];

  const personMemories = memories.filter(m => m.person_id === person.id);

  const handleShare = () => {
    const url = `${window.location.origin}?person=${person.legacy_id || person.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        
        {/* Header with Cover Banner */}
        <div className="relative p-6 border-b border-white/10 bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-amber-500/10">
          <button
            onClick={onClose}
            className="absolute top-5 left-5 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 transition-colors"
            title="إغلاق"
          >
            <X size={18} />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 flex items-center justify-center font-display font-bold text-2xl shadow-lg shadow-amber-500/20 shrink-0">
              {person.first_name[0] || 'ر'}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  {person.first_name}
                </h3>
                {person.is_deceased && (
                  <span className="badge badge-rose text-xs">
                    رحمه الله
                  </span>
                )}
                <span className="badge badge-gold text-xs">
                  الجيل {person.generation}
                </span>
                <span className="badge badge-emerald text-xs">
                  {person.branch_name || 'الأصل المؤسس'}
                </span>
              </div>

              <div className="text-xs sm:text-sm text-slate-300 font-sans mt-1">
                {person.full_name}
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="glass-panel p-3.5 flex items-center gap-3">
              <MapPin size={18} className="text-amber-400 shrink-0" />
              <div>
                <div className="text-[11px] text-slate-400">الإقامة والموطن</div>
                <div className="text-xs font-semibold text-white">{person.residence || 'شارونة، المنيا'}</div>
              </div>
            </div>

            <div className="glass-panel p-3.5 flex items-center gap-3">
              <Briefcase size={18} className="text-emerald-400 shrink-0" />
              <div>
                <div className="text-[11px] text-slate-400">المهنة والمسيرة</div>
                <div className="text-xs font-semibold text-white">{person.occupation || 'غير محدد'}</div>
              </div>
            </div>

            <div className="glass-panel p-3.5 flex items-center gap-3">
              <Clock size={18} className="text-blue-400 shrink-0" />
              <div>
                <div className="text-[11px] text-slate-400">الميلاد والوفاة</div>
                <div className="text-xs font-semibold text-white">
                  {person.birth_date ? `م: ${person.birth_date}` : 'موثق بالنسب'} 
                  {person.death_date ? ` — ت: ${person.death_date}` : ''}
                </div>
              </div>
            </div>
          </div>

          {/* Biography & History */}
          <div className="glass-panel p-5 space-y-2">
            <h4 className="font-display font-bold text-sm text-amber-400 flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>السيرة الذاتية والتاريخ الموثق</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {person.bio || `من أبناء عائلة آل راضي بقرية شارونة، ${person.full_name}.`}
            </p>
          </div>

          {/* Relatives Quick Navigation */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <Users size={16} className="text-amber-400" />
              <span>الصلات والقرابة المباشرة</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Father */}
              <div className="glass-panel p-3">
                <div className="text-xs text-slate-400 mb-1.5 font-medium">الوالد</div>
                {father ? (
                  <button
                    onClick={() => onSelectRelative(father)}
                    className="w-full text-right p-2 rounded-lg bg-white/5 hover:bg-amber-500/10 hover:text-amber-300 transition-colors text-xs font-bold text-white flex items-center justify-between"
                  >
                    <span>{father.first_name}</span>
                    <ChevronLeft size={14} />
                  </button>
                ) : (
                  <div className="text-xs text-slate-400 p-2">الأصل المؤسس الأعلى</div>
                )}
              </div>

              {/* Children */}
              <div className="glass-panel p-3">
                <div className="text-xs text-slate-400 mb-1.5 font-medium">
                  الأبناء ({children.length})
                </div>
                {children.length > 0 ? (
                  <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                    {children.map(child => (
                      <button
                        key={child.id}
                        onClick={() => onSelectRelative(child)}
                        className="w-full text-right p-1.5 rounded-lg bg-white/5 hover:bg-amber-500/10 hover:text-amber-300 transition-colors text-xs text-slate-200 flex items-center justify-between"
                      >
                        <span>{child.first_name}</span>
                        <ChevronLeft size={12} />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 p-2">لا يوجد أبناء مسجلين حاليًا</div>
                )}
              </div>

              {/* Siblings */}
              <div className="glass-panel p-3">
                <div className="text-xs text-slate-400 mb-1.5 font-medium">
                  الإخوة ({siblings.length})
                </div>
                {siblings.length > 0 ? (
                  <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                    {siblings.map(sib => (
                      <button
                        key={sib.id}
                        onClick={() => onSelectRelative(sib)}
                        className="w-full text-right p-1.5 rounded-lg bg-white/5 hover:bg-amber-500/10 hover:text-amber-300 transition-colors text-xs text-slate-200 flex items-center justify-between"
                      >
                        <span>{sib.first_name}</span>
                        <ChevronLeft size={12} />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 p-2">لا يوجد إخوة مسجلين</div>
                )}
              </div>

            </div>
          </div>

          {/* Memories section if available */}
          {personMemories.length > 0 && (
            <div className="glass-panel p-4 space-y-2">
              <h4 className="font-display font-bold text-xs text-amber-400">
                ذكريات وشهادات من أفراد العائلة
              </h4>
              <div className="space-y-2">
                {personMemories.map(m => (
                  <div key={m.id} className="p-3 rounded-lg bg-white/5 text-xs text-slate-300">
                    <p className="italic">"{m.content}"</p>
                    <div className="text-[10px] text-amber-400/80 mt-1">
                      — {m.contributor_name} ({m.relationship_to_person})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenContributionForPerson(person);
              }}
              className="btn-primary text-xs sm:text-sm py-2 px-4 flex items-center gap-2"
            >
              <HeartHandshake size={16} />
              <span>ساهم بتعديل بيانات أو إضافة صورة لهذا الفرد</span>
            </button>

            <button
              onClick={handleShare}
              className="btn-secondary text-xs sm:text-sm py-2 px-4 flex items-center gap-1.5"
            >
              <Share2 size={15} />
              <span>{copied ? 'تم نسخ الرابط!' : 'مشاركة بطاقة الفرد'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
