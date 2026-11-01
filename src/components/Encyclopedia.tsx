import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Filter, MapPin, Briefcase, ChevronLeft, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Person } from '../types/database';

interface EncyclopediaProps {
  persons: Person[];
  onSelectPerson: (p: Person) => void;
  onOpenContribution: (p?: Person) => void;
}

export const Encyclopedia: React.FC<EncyclopediaProps> = ({
  persons,
  onSelectPerson,
  onOpenContribution
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBranch, setFilterBranch] = useState('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'living' | 'deceased'>('all');
  const [filterGen, setFilterGen] = useState<number | 'all'>('all');

  const filteredPersons = useMemo(() => {
    return persons.filter(p => {
      const matchSearch = searchQuery === '' || 
        p.full_name.includes(searchQuery) || 
        p.first_name.includes(searchQuery) ||
        (p.occupation && p.occupation.includes(searchQuery)) ||
        (p.residence && p.residence.includes(searchQuery));

      const matchBranch = filterBranch === 'all' || p.branch_id === filterBranch;
      const matchStatus = filterStatus === 'all' 
        ? true 
        : filterStatus === 'deceased' ? p.is_deceased : !p.is_deceased;
      const matchGen = filterGen === 'all' || p.generation === filterGen;

      return matchSearch && matchBranch && matchStatus && matchGen;
    });
  }, [persons, searchQuery, filterBranch, filterStatus, filterGen]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-2">
          <BookOpen size={24} />
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
          موسوعة أفراد عائلة آل راضي
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          دليل توثيقي شامل لكل فرد من أبناء العائلة، أجيالهم، نسبهم المتصل، إسهاماتهم، ومسيرتهم المباركة
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="glass-panel p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="ابحث بالاسم، المهنة، أو الإقامة..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-full pr-10 pl-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <select
            value={filterBranch}
            onChange={e => setFilterBranch(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-full px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value="all">كل الفروع</option>
            <option value="abdel-samad">فرع عبدالصمد</option>
            <option value="hamad">فرع حمد</option>
            <option value="waqqad">فرع وقاد</option>
          </select>
        </div>

        <div>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as any)}
            className="w-full bg-slate-900 border border-white/10 rounded-full px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          >
            <option value="all">الأحياء والراحلين</option>
            <option value="living">الأحياء حفظهم الله</option>
            <option value="deceased">الراحلون رحمهم الله</option>
          </select>
        </div>

        <div className="flex items-center justify-between px-2 text-xs text-slate-400">
          <span>نتائج البحث:</span>
          <span className="font-bold text-amber-400">{filteredPersons.length} فردًا</span>
        </div>
      </div>

      {/* Persons Encyclopedia Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPersons.map(person => (
          <div
            key={person.id}
            onClick={() => onSelectPerson(person)}
            className="glass-panel p-5 cursor-pointer hover:border-amber-400 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600/30 to-amber-400/30 border border-amber-500/30 text-amber-300 font-display font-bold text-lg flex items-center justify-center shrink-0">
                    {person.first_name[0] || 'ر'}
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                      {person.first_name}
                    </h3>
                    <div className="text-[11px] text-slate-400 truncate max-w-[200px]" title={person.full_name}>
                      {person.full_name}
                    </div>
                  </div>
                </div>

                <span className="badge badge-gold text-[10px]">
                  ج {person.generation}
                </span>
              </div>

              <div className="mt-4 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-amber-400/80 shrink-0" />
                  <span className="truncate">{person.residence || 'شارونة، المنيا'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Briefcase size={13} className="text-emerald-400/80 shrink-0" />
                  <span className="truncate">{person.occupation || 'غير محدد'}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-amber-400/90 font-medium">
                {person.branch_name || 'الأصل المؤسس'}
              </span>

              <span className="text-slate-400 group-hover:text-white flex items-center gap-1 transition-colors">
                <span>عرض الملف</span>
                <ChevronLeft size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
