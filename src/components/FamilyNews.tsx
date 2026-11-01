import React from 'react';
import { Newspaper, Calendar, HeartHandshake, Award, Bell } from 'lucide-react';
import { FamilyPost } from '../types/database';

interface FamilyNewsProps {
  posts: FamilyPost[];
  onOpenContribution: () => void;
}

export const FamilyNews: React.FC<FamilyNewsProps> = ({
  posts,
  onOpenContribution
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
            <Bell size={16} />
            <span>مجتمع وأخبار العائلة</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            أخبار ومناسبات عائلة آل راضي
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            متابعة لأفراح العائلة، لقاءاتها، مناسباتها الاجتماعية، وإنجازات أبنائها
          </p>
        </div>

        <button
          onClick={onOpenContribution}
          className="btn-primary text-xs sm:text-sm py-2 px-4 flex items-center gap-2 self-start sm:self-auto"
        >
          <HeartHandshake size={16} />
          <span>أرسل خبرًا أو مناسبة</span>
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(post => (
          <div key={post.id} className="glass-panel p-6 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="badge badge-gold text-[10px]">
                  {post.category === 'news' ? 'أخبار رسمية' :
                   post.category === 'occasion' ? 'مناسبة عائلية' :
                   post.category === 'congratulations' ? 'تهنئة مباركة' : 'اجتماع العائلة'}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>{post.event_date || 'أكتوبر 2026'}</span>
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-white">
                {post.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {post.content}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>الناشر: {post.author_name || 'إدارة المنصة'}</span>
              <span className="text-emerald-400">معتمد رسميًا ✓</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
