import React, { useState, useEffect } from 'react';
import { TreePine, HeartHandshake, BookOpen, Users, Compass, ChevronLeft, Sparkles, ScrollText } from 'lucide-react';
import { VERSES_SEED } from '../data/seedData';

interface HeroProps {
  onExploreTree: () => void;
  onOpenContribution: () => void;
  onOpenEncyclopedia: () => void;
  totalPersons: number;
  totalGenerations: number;
  totalBranches: number;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreTree,
  onOpenContribution,
  onOpenEncyclopedia,
  totalPersons,
  totalGenerations,
  totalBranches
}) => {
  const [verseIndex, setVerseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVerseIndex(prev => (prev + 1) % VERSES_SEED.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const activeVerse = VERSES_SEED[verseIndex];

  return (
    <div className="relative overflow-hidden pt-8 pb-16 sm:pb-24">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Quranic Verse Callout Banner */}
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <div className="inline-block p-[1px] rounded-2xl bg-gradient-to-r from-amber-500/30 via-emerald-500/30 to-amber-500/30">
            <div className="glass-panel px-6 py-4 rounded-2xl border-none">
              <div className="text-amber-400 text-xs tracking-widest font-serif mb-1">
                ❖ ❖ ❖
              </div>
              <div className="font-serif text-lg sm:text-2xl text-amber-200 leading-relaxed font-bold">
                ﴿ {activeVerse.t} ﴾
              </div>
              <div className="text-xs text-amber-400/80 font-medium mt-1">
                — {activeVerse.r}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 font-sans leading-normal">
                {activeVerse.x}
              </p>
            </div>
          </div>
        </div>

        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs sm:text-sm font-medium">
            <Sparkles size={15} />
            <span>المنصة الرقمية التاريخية الموحدة — عائلة آل راضي</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            أَصْلٌ ثَابِتٌ وَفَرْعٌ فِي السَّمَاءِ
            <span className="block mt-2 text-gold-gradient">
              AL RADY FAMILY LEGACY
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            تنتمي عائلة آل راضي إلى أصول من القبائل العربية العريقة، استقرت في قرية شارونة بشرق النيل أواخر القرن الثامن عشر (أواخر ١٧٠٠م). 
            تولّى أبناؤها العمودية والمشيخة عبر أجيال متعاقبة، وهذه المنصة تحفظ تاريخ العائلة، وتوثق أنسابها، وتربط بين أبنائها.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onExploreTree}
              className="btn-primary text-base py-3 px-7 flex items-center gap-2 group"
            >
              <TreePine size={20} className="group-hover:rotate-12 transition-transform" />
              <span>استكشف شجرة العائلة</span>
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={onOpenContribution}
              className="btn-secondary text-base py-3 px-6 flex items-center gap-2"
            >
              <HeartHandshake size={20} className="text-amber-400" />
              <span>ساهم في حفظ التاريخ</span>
            </button>

            <button
              onClick={onOpenEncyclopedia}
              className="btn-secondary text-base py-3 px-6 flex items-center gap-2"
            >
              <BookOpen size={20} className="text-emerald-400" />
              <span>موسوعة الأفراد</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto">
          <div className="glass-panel p-5 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Users size={22} />
            </div>
            <div className="font-display font-bold text-2xl sm:text-3xl text-white">
              {totalPersons}
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">فردًا موثقًا في النسب</div>
          </div>

          <div className="glass-panel p-5 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Compass size={22} />
            </div>
            <div className="font-display font-bold text-2xl sm:text-3xl text-emerald-400">
              {totalGenerations}
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">أجيال مسجلة متصلة</div>
          </div>

          <div className="glass-panel p-5 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <TreePine size={22} />
            </div>
            <div className="font-display font-bold text-2xl sm:text-3xl text-blue-400">
              {totalBranches}
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">فروع العائلة الكبرى</div>
          </div>

          <div className="glass-panel p-5 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <ScrollText size={22} />
            </div>
            <div className="font-display font-bold text-2xl sm:text-3xl text-amber-400">
              ١٧٠٠م
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">تاريخ استقرار شارونة</div>
          </div>
        </div>

      </div>
    </div>
  );
};
