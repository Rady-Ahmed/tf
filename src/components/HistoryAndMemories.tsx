import React from 'react';
import { BookOpen, ScrollText, Calendar, Sparkles, FileText, ExternalLink, Award } from 'lucide-react';
import { Story, HistoricalDocument } from '../types/database';

interface HistoryAndMemoriesProps {
  stories: Story[];
  documents: HistoricalDocument[];
  onOpenContribution: () => void;
}

export const HistoryAndMemories: React.FC<HistoryAndMemoriesProps> = ({
  stories,
  documents,
  onOpenContribution
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-2">
          <ScrollText size={26} />
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
          ذاكرة آل راضي — الجذور والتاريخ
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          سجل تاريخي وأرشيف وثائقي يوثق رحلة واستقرار عائلة آل راضي بقرية شارونة منذ أواخر القرن الثامن عشر الميلادي
        </p>
      </div>

      {/* Main Historical Chronicle Card */}
      <div className="glass-panel p-6 sm:p-8 border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-slate-900 to-emerald-500/5 space-y-4">
        <div className="flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-bold">
          <Award size={18} />
          <span>تاريخ الاستقرار والمشيخة والعمودية</span>
        </div>

        <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
          من أصول القبائل العربية إلى شارونة (أواخر ١٧٠٠م)
        </h3>

        <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-3 font-sans">
          <p>
            تنتمي عائلة آل راضي إلى أصول قبائل عربية أصيلة ارتحلت عبر مسارات التاريخ لتستقر في صعيد مصر بشرق النيل بقرية شارونة (مركز بني مزار، محافظة المنيا) في أواخر القرن الثامن عشر (أواخر ١٧٠٠م).
          </p>
          <p>
            تولّى أبناء راضي وأحفادهم العمودية والمشيخة في القرية لفترات متعاقبة، وعُرفوا بالشهامة وحسن الجوار وإصلاح ذات البين، وكان ديوان العائلة مقصدًا لفض النزاعات وتوثيق العقود الزراعية وإكرام الضيف.
          </p>
          <p>
            تفرعت العائلة من الجد الأكبر راضي إلى ثلاثة فروع رئيسية كبرى: فرع عبدالصمد، وفرع حمد، وفرع وقاد، وواصلت الأجيال المتعاقبة مسيرة البناء والعلم والخدمة المجتمعية.
          </p>
        </div>
      </div>

      {/* Stories Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
            <BookOpen className="text-amber-400" size={20} />
            <span>قصص وروايات الأجداد</span>
          </h3>

          <button
            onClick={onOpenContribution}
            className="btn-secondary text-xs py-1.5 px-3"
          >
            + أضف قصة عائلية
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map(story => (
            <div key={story.id} className="glass-panel p-6 space-y-3 border-white/10 hover:border-amber-400/50 transition-all">
              <div className="flex items-center justify-between text-xs text-amber-400 font-medium">
                <span>{story.period || 'تاريخ متوارث'}</span>
                <span>الراوي: {story.author_name}</span>
              </div>

              <h4 className="font-display font-bold text-lg text-white">
                {story.title}
              </h4>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-4">
                {story.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Documents Archive */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
          <FileText className="text-emerald-400" size={20} />
          <span>الوثائق والمستندات التاريخية</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map(doc => (
            <div key={doc.id} className="glass-panel p-6 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-emerald-400 font-medium">
                  <span className="badge badge-emerald text-[10px]">{doc.document_type}</span>
                  <span>{doc.year}</span>
                </div>

                <h4 className="font-display font-bold text-base text-white mt-2">
                  {doc.title}
                </h4>

                <p className="text-xs text-slate-300 mt-1">
                  {doc.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">وثيقة محفوظة ومحققة ✓</span>
                {doc.file_url && (
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>معاينة الأصل</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
