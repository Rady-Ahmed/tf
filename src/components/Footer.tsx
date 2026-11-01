import React from 'react';
import { Heart, TreePine, Phone, Globe, Shield } from 'lucide-react';

interface FooterProps {
  onOpenContribution: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenContribution,
  onOpenAdmin
}) => {
  return (
    <footer className="border-t border-amber-500/20 bg-slate-950/90 pt-14 pb-10 text-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        
        {/* Emblem & Motto */}
        <div className="space-y-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 font-serif font-bold text-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
            ر
          </div>
          <div className="font-serif text-lg sm:text-xl text-amber-200 tracking-wider">
            ❖ جمعنا الأصل وفرّقتنا الدروب ❖
          </div>
          <div className="text-xs text-slate-400 max-w-md mx-auto">
            المنصة المركزية الرسمية الموحدة لحفظ تاريخ وأنساب عائلة آل راضي بقرية شارونة
          </div>
        </div>

        {/* Developer & Contact Credits */}
        <div className="glass-panel max-w-xl mx-auto p-4 space-y-2 border-white/5 text-xs text-slate-300">
          <div className="font-semibold text-white">
            تصميم وتطوير: <a href="https://radyahmed.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">المهندس راضي أحمد</a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <a 
              href="https://wa.me/201101970882?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A5%D8%B1%D8%B3%D8%A7%D9%84%20%D8%AA%D8%B9%D8%AF%D9%8A%D9%84%20%D9%84%D8%B4%D8%AC%D8%B1%D8%A9%20%D8%B9%D8%A7%D8%A6%D9%84%D8%A9%20%D8%A2%D9%84%20%D8%B1%D8%A7%D8%A6%D9%8A"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline flex items-center gap-1"
            >
              <Phone size={13} />
              <span>واتساب 01101970882</span>
            </a>
            <span>•</span>
            <button
              onClick={onOpenContribution}
              className="hover:text-amber-300 transition-colors"
            >
              ساهم في التاريخ
            </button>
            <span>•</span>
            <button
              onClick={onOpenAdmin}
              className="hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <Shield size={12} />
              <span>لوحة الإدارة</span>
            </button>
          </div>
        </div>

        {/* Rights reserved */}
        <div className="text-[11px] text-slate-400 pt-4 border-t border-white/5">
          جميع الحقوق محفوظة لعائلة آل راضي © {new Date().getFullYear()} م
        </div>

      </div>
    </footer>
  );
};
