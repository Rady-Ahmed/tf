import React, { useState } from 'react';
import { 
  TreePine, 
  BookOpen, 
  HeartHandshake, 
  History, 
  Newspaper, 
  ShieldAlert, 
  Sun, 
  Moon, 
  Menu, 
  X,
  Compass,
  FileCheck,
  Image as ImageIcon
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  pendingContributionsCount: number;
  openContributionModal: () => void;
  openAdminModal: () => void;
  isAdminLoggedIn: boolean;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  pendingContributionsCount,
  openContributionModal,
  openAdminModal,
  isAdminLoggedIn,
  theme,
  toggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'الرئيسية', icon: Compass },
    { id: 'tree', label: 'شجرة العائلة', icon: TreePine },
    { id: 'encyclopedia', label: 'موسوعة الأفراد', icon: BookOpen },
    { id: 'memorial', label: 'أثر لا يغيب', icon: History },
    { id: 'gallery', label: 'ألبوم الصور', icon: ImageIcon },
    { id: 'history', label: 'ذاكرة وتاريخ', icon: BookOpen },
    { id: 'news', label: 'أخبار ومناسبات', icon: Newspaper },
    { id: 'track', label: 'تتبع مساهمة', icon: FileCheck }
  ];

  return (
    <header className="sticky top-0 z-50 w-full" style={{
      background: 'rgba(7, 13, 24, 0.88)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-full flex items-center justify-center font-serif text-2xl font-bold"
               style={{
                 background: 'linear-gradient(135deg, #b45309, #d97706, #f59e0b)',
                 color: '#070d18',
                 boxShadow: '0 0 16px rgba(245, 158, 11, 0.35)'
               }}>
            ر
          </div>
          <div>
            <div className="font-display font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-gold-300 transition-colors">
              عائلة آل راضي
            </div>
            <div className="text-xs text-gold-400 font-serif tracking-widest hidden sm:block">
              أَصْلُهَا ثَابِتٌ وَفَرْعُهَا فِي السَّمَاءِ
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setCurrentTab(link.id)}
                className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isActive 
                    ? 'bg-amber-500/15 text-gold-400 border border-amber-500/30' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={15} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Contribute Button */}
          <button
            onClick={openContributionModal}
            className="btn-primary text-xs sm:text-sm py-2 px-3 sm:px-4"
          >
            <HeartHandshake size={16} />
            <span>ساهم في التاريخ</span>
          </button>

          {/* Admin Control Button */}
          <button
            onClick={openAdminModal}
            className={`relative p-2.5 rounded-full border transition-all ${
              isAdminLoggedIn 
                ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/50 hover:bg-emerald-600/30' 
                : 'bg-white/5 text-slate-300 border-white/10 hover:border-gold-500/50 hover:text-gold-400'
            }`}
            title={isAdminLoggedIn ? 'لوحة تحكم الأدمن (نشط)' : 'دخول الأدمن'}
          >
            <ShieldAlert size={18} />
            {pendingContributionsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {pendingContributionsCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-white/5 text-slate-300 border border-white/10 hover:text-gold-400 transition-colors"
            title="تبديل المظهر"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full bg-white/5 text-slate-300 border border-white/10"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-500/20 bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-2">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-right px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-3 ${
                  isActive 
                    ? 'bg-amber-500/20 text-gold-400 font-bold border border-amber-500/30' 
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
