import React, { useState, useMemo } from 'react';
import { 
  TreePine, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  GitCompare,
  BarChart3,
  Printer
} from 'lucide-react';
import { Person, FamilyBranch } from '../types/database';
import { RadialTree } from './RadialTree';

interface FamilyTreeCanvasProps {
  persons: Person[];
  branches: FamilyBranch[];
  onSelectPerson: (person: Person) => void;
  selectedPersonId?: string;
  onOpenKinship?: () => void;
  onOpenStats?: () => void;
}

export const FamilyTreeCanvas: React.FC<FamilyTreeCanvasProps> = ({
  persons,
  branches,
  onSelectPerson,
  selectedPersonId,
  onOpenKinship,
  onOpenStats
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [selectedGeneration, setSelectedGeneration] = useState<number | 'all'>('all');
  const [viewMode, setViewMode] = useState<
    'vertical' | 'radial' | 'cards' | 'branches' | 'lineage' | 'timeline'
  >('vertical');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [lineageTargetId, setLineageTargetId] = useState<string>('mcijm5u');
  
  // "Me" Mode
  const [myPersonId, setMyPersonId] = useState<string>(() => {
    return localStorage.getItem('al_rady_me_id') || '';
  });
  const [showMePicker, setShowMePicker] = useState(false);

  // Map persons by ID for instant tree traversal
  const personMap = useMemo(() => {
    const map = new Map<string, Person>();
    persons.forEach(p => {
      map.set(p.id, p);
      if (p.legacy_id) map.set(p.legacy_id, p);
    });
    return map;
  }, [persons]);

  // Ancestor set for "Me"
  const myAncestorsSet = useMemo(() => {
    const set = new Set<string>();
    if (!myPersonId) return set;
    let curr = personMap.get(myPersonId);
    while (curr) {
      set.add(curr.id);
      if (curr.legacy_id) set.add(curr.legacy_id);
      curr = curr.father_id ? personMap.get(curr.father_id) : undefined;
    }
    return set;
  }, [myPersonId, personMap]);

  const handleSelectMe = (id: string) => {
    setMyPersonId(id);
    localStorage.setItem('al_rady_me_id', id);
    setShowMePicker(false);
  };

  // Filtered persons based on search, branch, and generation
  const filteredPersons = useMemo(() => {
    return persons.filter(p => {
      const matchesSearch = searchQuery === '' || 
        p.full_name.includes(searchQuery) || 
        p.first_name.includes(searchQuery) ||
        (p.legacy_id && p.legacy_id.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesBranch = selectedBranch === 'all' || p.branch_id === selectedBranch;
      const matchesGen = selectedGeneration === 'all' || p.generation === selectedGeneration;

      return matchesSearch && matchesBranch && matchesGen;
    });
  }, [persons, searchQuery, selectedBranch, selectedGeneration]);

  // Build tree hierarchy: root -> children
  const childrenMap = useMemo(() => {
    const map = new Map<string, Person[]>();
    persons.forEach(p => {
      if (p.father_id) {
        const existing = map.get(p.father_id) || [];
        existing.push(p);
        map.set(p.father_id, existing);
      }
    });
    return map;
  }, [persons]);

  // Compute Lineage path from root "راضي" to selected person
  const lineageChain = useMemo(() => {
    const chain: Person[] = [];
    let curr = personMap.get(lineageTargetId);
    while (curr) {
      chain.unshift(curr);
      curr = curr.father_id ? personMap.get(curr.father_id) : undefined;
    }
    return chain;
  }, [lineageTargetId, personMap]);

  // Group persons by generation for timeline view
  const generationGroups = useMemo(() => {
    const groups = new Map<number, Person[]>();
    persons.forEach(p => {
      const list = groups.get(p.generation) || [];
      list.push(p);
      groups.set(p.generation, list);
    });
    return Array.from(groups.entries()).sort((a, b) => a[0] - b[0]);
  }, [persons]);

  const maxGen = Math.max(...persons.map(p => p.generation), 1);

  // Render individual person card
  const renderPersonCard = (p: Person, isCompact = false) => {
    const isSelected = selectedPersonId === p.id || selectedPersonId === p.legacy_id;
    const isMe = myPersonId === p.id || myPersonId === p.legacy_id;
    const isMyAncestor = myAncestorsSet.has(p.id) || (p.legacy_id && myAncestorsSet.has(p.legacy_id));
    const children = childrenMap.get(p.id) || childrenMap.get(p.legacy_id || '') || [];

    const branchColor = p.branch_id === 'abdel-samad' ? '#047857' :
                        p.branch_id === 'hamad' ? '#b45309' :
                        p.branch_id === 'waqqad' ? '#1d4ed8' : '#d97706';

    return (
      <div
        key={p.id}
        onClick={() => onSelectPerson(p)}
        className={`node-card cursor-pointer transition-all ${
          isSelected ? 'active ring-2 ring-amber-400' : ''
        } ${isMe ? 'ring-2 ring-emerald-400 bg-emerald-950/40' : ''} ${
          isMyAncestor && !isMe ? 'border-amber-400 shadow-md shadow-amber-500/10' : ''
        } ${isCompact ? 'p-3' : 'p-4'}`}
        style={{
          borderTop: `4px solid ${branchColor}`
        }}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-base sm:text-lg text-white hover:text-amber-300 transition-colors">
                {p.first_name}
              </span>
              {isMe && (
                <span className="badge badge-emerald text-[9px] py-0.5">
                  أنت 🙋
                </span>
              )}
              {p.is_deceased && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                  رحمه الله
                </span>
              )}
            </div>
            
            <div className="text-xs text-slate-300 truncate max-w-[220px] mt-0.5" title={p.full_name}>
              {p.full_name}
            </div>
          </div>

          <span className="badge badge-gold text-[10px]">
            ج {p.generation}
          </span>
        </div>

        <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span>{p.branch_name || 'الأصل'}</span>
          <span className="text-amber-400/90 font-medium">
            {children.length > 0 ? `${children.length} أبناء` : '—'}
          </span>
        </div>
      </div>
    );
  };

  // Render Recursive Node in Vertical Tree View
  const renderTreeNode = (p: Person) => {
    const children = childrenMap.get(p.id) || childrenMap.get(p.legacy_id || '') || [];
    return (
      <div key={p.id} className="flex flex-col items-center">
        {renderPersonCard(p, true)}

        {children.length > 0 && (
          <div className="flex flex-col items-center w-full">
            <div className="w-[2px] h-6 bg-amber-500/40" />
            <div className="relative flex items-start justify-center gap-4 sm:gap-6 pt-2">
              {children.length > 1 && (
                <div className="absolute top-0 right-8 left-8 h-[2px] bg-amber-500/30" />
              )}
              {children.map(child => (
                <div key={child.id} className="relative flex flex-col items-center">
                  <div className="w-[2px] h-4 bg-amber-500/40 -mt-2" />
                  {renderTreeNode(child)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const rootPerson = persons.find(p => p.legacy_id === 'w5n4zuk' || p.generation === 1);
  const myPerson = personMap.get(myPersonId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header & Controls Bar */}
      <div className="glass-panel p-5 space-y-4">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
              <TreePine className="text-amber-400" />
              <span>شجرة عائلة آل راضي التفاعلية</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              تنقل بين الأجيال والفروع، وابحث عن أي فرد، واطلع على نسبه وتفاصيل سيرته
            </p>
          </div>

          {/* Quick Action Tools: Me Mode, Kinship, Stats, Print */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Me Mode Button */}
            <div className="relative">
              <button
                onClick={() => setShowMePicker(!showMePicker)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  myPersonId 
                    ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
                title="تحديد ملفك الشخصي لإبراز نسبك المباشر"
              >
                <span>🙋</span>
                <span>{myPerson ? `أنا (${myPerson.first_name})` : 'وضع أنا'}</span>
              </button>

              {showMePicker && (
                <div className="absolute left-0 top-full mt-2 w-72 glass-panel p-3 z-30 space-y-2 border-emerald-500/40 bg-slate-950/95 shadow-2xl">
                  <div className="text-xs font-bold text-emerald-400">حدد نفسك من شجرة العائلة:</div>
                  <select
                    value={myPersonId}
                    onChange={e => handleSelectMe(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-xs text-white"
                  >
                    <option value="">— اختر اسمك —</option>
                    {persons.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.first_name} (ج {p.generation}) — {p.full_name}
                      </option>
                    ))}
                  </select>
                  {myPersonId && (
                    <button
                      onClick={() => handleSelectMe('')}
                      className="text-[10px] text-rose-400 hover:underline block text-center pt-1"
                    >
                      إلغاء وضع أنا
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Kinship Calculator trigger */}
            {onOpenKinship && (
              <button
                onClick={onOpenKinship}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <GitCompare size={14} />
                <span>صلة القرابة</span>
              </button>
            )}

            {/* Stats trigger */}
            {onOpenStats && (
              <button
                onClick={onOpenStats}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <BarChart3 size={14} />
                <span>إحصائيات</span>
              </button>
            )}

            {/* Print Tree */}
            <button
              onClick={() => window.print()}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 text-xs transition-colors"
              title="طباعة الشجرة"
            >
              <Printer size={15} />
            </button>
          </div>
        </div>

        {/* View Modes Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full border-t border-white/5 pt-3">
          {[
            { id: 'vertical', label: 'الشجرة الهرمية' },
            { id: 'radial', label: 'حلقات آل راضي (شعاعية)' },
            { id: 'cards', label: 'شبكة البطاقات' },
            { id: 'branches', label: 'الفروع الكبرى' },
            { id: 'lineage', label: 'مسار النسب' },
            { id: 'timeline', label: 'الأجيال الزمنية' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setViewMode(m.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                viewMode === m.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-white/5">
          
          {/* Search box */}
          <div className="relative">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type="text"
              placeholder="ابحث بالاسم أو المعرف..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 border border-amber-500/20 rounded-full pr-10 pl-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Branch filter */}
          <div>
            <select
              value={selectedBranch}
              onChange={e => setSelectedBranch(e.target.value)}
              className="w-full bg-slate-900/80 border border-amber-500/20 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
            >
              <option value="all">كل فروع العائلة</option>
              {branches.map(b => (
                <option key={b.code} value={b.code}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Generation filter */}
          <div>
            <select
              value={selectedGeneration}
              onChange={e => setSelectedGeneration(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="w-full bg-slate-900/80 border border-amber-500/20 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
            >
              <option value="all">كل الأجيال (١ - ١٠)</option>
              {Array.from({ length: maxGen }, (_, i) => i + 1).map(g => (
                <option key={g} value={g}>الجيل {g}</option>
              ))}
            </select>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setZoomLevel(prev => Math.max(0.6, prev - 0.1))}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300"
              title="تصغير"
            >
              <ZoomOut size={16} />
            </button>
            <span className="text-xs text-slate-400 font-mono w-12 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(1.5, prev + 0.1))}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300"
              title="تكبير"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300"
              title="إعادة ضبط"
            >
              <Maximize2 size={16} />
            </button>
          </div>

        </div>

      </div>

      {/* Tree Canvas Views Container */}
      <div className="glass-panel p-6 overflow-hidden min-h-[550px] relative">
        
        {/* VIEW 1: Vertical Hierarchical Tree */}
        {viewMode === 'vertical' && (
          <div 
            className="overflow-auto max-h-[750px] p-6 flex justify-center transition-transform origin-top"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {rootPerson ? (
              renderTreeNode(rootPerson)
            ) : (
              <div className="text-center text-slate-400 py-12">
                لم يتم العثور على أفراد الشجرة
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: Radial Concentric Rings Tree (حلقات ودوامة آل راضي) */}
        {viewMode === 'radial' && (
          <RadialTree
            persons={filteredPersons}
            branches={branches}
            onSelectPerson={onSelectPerson}
            selectedPersonId={selectedPersonId}
          />
        )}

        {/* VIEW 3: Grid Cards View */}
        {viewMode === 'cards' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-400">
              عرض {filteredPersons.length} فردًا من أصل {persons.length}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredPersons.map(p => renderPersonCard(p))}
            </div>
          </div>
        )}

        {/* VIEW 4: Branches Focus View */}
        {viewMode === 'branches' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {branches.map(branch => {
              const branchMembers = persons.filter(p => p.branch_id === branch.code);
              return (
                <div key={branch.code} className="glass-panel p-5 border-t-4" style={{ borderColor: branch.color }}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-bold text-lg text-white">
                      {branch.name}
                    </h3>
                    <span className="badge badge-gold">
                      {branchMembers.length} أفراد
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mb-4">
                    {branch.description}
                  </p>
                  <div className="space-y-2.5 max-h-[450px] overflow-y-auto pr-1">
                    {branchMembers.map(m => renderPersonCard(m, true))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* VIEW 5: Lineage Pathfinder (من راضي إليك) */}
        {viewMode === 'lineage' && (
          <div className="max-w-3xl mx-auto space-y-6 py-4">
            <div className="text-center space-y-2">
              <h3 className="font-display font-bold text-xl text-white">
                مسار سلسلة النسب «من راضي إليك»
              </h3>
              <p className="text-xs text-slate-400">
                اختر أي شخص من العائلة لتتبع شريط نسبه المتصل إلى المؤسس راضي
              </p>
              
              <div className="max-w-md mx-auto pt-2">
                <select
                  value={lineageTargetId}
                  onChange={e => setLineageTargetId(e.target.value)}
                  className="w-full bg-slate-900 border border-amber-500/30 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {persons.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.first_name} (الجيل {p.generation}) — {p.full_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Lineage visual chain */}
            <div className="relative pt-6">
              <div className="space-y-4">
                {lineageChain.map((person, idx) => (
                  <div key={person.id} className="relative flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0 z-10">
                      {idx + 1}
                    </div>

                    <div 
                      onClick={() => onSelectPerson(person)}
                      className="glass-panel p-4 flex-1 hover:border-amber-400 cursor-pointer transition-all flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-white text-base">
                          {person.first_name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {person.full_name}
                        </div>
                      </div>
                      <span className="badge badge-emerald text-xs">
                        الجيل {person.generation}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 6: Timeline by Generations */}
        {viewMode === 'timeline' && (
          <div className="space-y-8 py-2">
            {generationGroups.map(([gen, list]) => (
              <div key={gen} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs">
                    الجيل {gen}
                  </div>
                  <div className="text-xs text-slate-400">
                    ({list.length} أفراد)
                  </div>
                  <div className="flex-1 h-[1px] bg-white/10" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {list.map(p => renderPersonCard(p, true))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
