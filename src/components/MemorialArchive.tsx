import React from 'react';
import { History, Heart, BookOpen, ChevronLeft, Sparkles } from 'lucide-react';
import { Person } from '../types/database';

interface MemorialArchiveProps {
  deceasedPersons: Person[];
  onSelectPerson: (p: Person) => void;
  onOpenContribution: (p: Person) => void;
}

export const MemorialArchive: React.FC<MemorialArchiveProps> = ({
  deceasedPersons,
  onSelectPerson,
  onOpenContribution
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Memorial Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="w-14 h-14 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 flex items-center justify-center mx-auto text-2xl font-serif">
          رحمهم الله
        </div>

        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
          أَثَـرٌ لَا يَغِـيب
        </h2>
        
        <p className="text-sm sm:text-base text-amber-200/90 font-serif leading-relaxed">
          ﴿ وَالَّذِينَ جَاءُوا مِن بَعْدِهِمْ يَقُولُونَ رَبَّنَا اغْفِرْ لَنَا وَلإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالإِيمَانِ ﴾
        </p>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          أرشيف مخصص لتكريم أجدادنا وآبائنا الراحلين من عائلة آل راضي، تخليدًا لذكراهم الطيبة وتوثيقًا لمسيرتهم المباركة ودعاءً دائمًا لهم بالرحمة والمغفرة.
        </p>
      </div>

      {/* Memorial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deceasedPersons.map(person => (
          <div
            key={person.id}
            className="glass-panel p-6 border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="badge badge-rose text-xs">
                  رحمه الله وغفر له
                </span>
                <span className="text-xs text-amber-400 font-medium">
                  الجيل {person.generation}
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-xl text-white">
                  {person.first_name}
                </h3>
                <div className="text-xs text-slate-400 mt-0.5">
                  {person.full_name}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-300 leading-relaxed">
                {person.bio || 'من رجالات عائلة آل راضي الأوائل وأعيان قرية شارونة.'}
              </div>

              <div className="text-xs text-slate-400 space-y-1">
                <div>
                  <span className="font-medium text-slate-300">الفرع: </span>
                  <span>{person.branch_name || 'الأصل المؤسس'}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-300">المسيرة: </span>
                  <span>{person.occupation || 'عمودية ومشيخة وتجارة'}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => onSelectPerson(person)}
                className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1"
              >
                <span>السيرة الكاملة</span>
                <ChevronLeft size={13} />
              </button>

              <button
                onClick={() => onOpenContribution(person)}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
              >
                <Heart size={14} />
                <span>إضافة ذكرى أو قصة</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
