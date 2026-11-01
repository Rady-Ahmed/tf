import React, { useState } from 'react';
import { Image as ImageIcon, ZoomIn, X, HeartHandshake, Calendar, MapPin } from 'lucide-react';

interface PhotoItem {
  id: string;
  title: string;
  category: 'ancestors' | 'documents' | 'gatherings' | 'sharouna';
  categoryLabel: string;
  year?: string;
  location?: string;
  image_url: string;
  description: string;
}

const GALLERY_ITEMS: PhotoItem[] = [
  {
    id: 'photo-1',
    title: 'حجة ونسب عائلة آل راضي الأصلية',
    category: 'documents',
    categoryLabel: 'مخطوطات ووثائق',
    year: 'أواخر القرن الثامن عشر',
    location: 'شارونة، المنيا',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    description: 'سجلات تاريخية ووثائق مشيخة وعمودية تؤرخ لاستقرار العائلة في شارونة وامتداد فروعها جيلًا بعد جيل.'
  },
  {
    id: 'photo-2',
    title: 'سجل أعيان ومشايخ شرق النيل',
    category: 'documents',
    categoryLabel: 'مخطوطات ووثائق',
    year: 'أوائل القرن العشرين',
    location: 'بني مزار، المنيا',
    image_url: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80',
    description: 'وثيقة رسمية توثق أعيان وعمد ومشايخ آل راضي ومسؤوليات القرية.'
  },
  {
    id: 'photo-3',
    title: 'ديوان عائلة آل راضي وملتقى الأهل',
    category: 'sharouna',
    categoryLabel: 'معالم شارونة',
    year: 'تاريخ عريق',
    location: 'قرية شارونة',
    image_url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
    description: 'ديوان العائلة العريق الذي كان ولا يزال رمزًا للضيافة والوحدة وإصلاح ذات البين.'
  },
  {
    id: 'photo-4',
    title: 'أراضي ومزارع آل راضي في شرق النيل',
    category: 'sharouna',
    categoryLabel: 'معالم شارونة',
    year: 'شارونة',
    location: 'شرق النيل',
    image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    description: 'الأراضي الزراعية والمزارع التي شهدت عمل وعمارة الأجداد والآباء.'
  },
  {
    id: 'photo-5',
    title: 'لقاء العائلة السنوي وتجديد صلة الرحم',
    category: 'gatherings',
    categoryLabel: 'مناسبات واجتماعات',
    year: 'أكتوبر 2026',
    location: 'ديوان العائلة',
    image_url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    description: 'اجتماع أبناء العائلة لصلة الأرحام وتكريم المتفوقين من الأبناء.'
  }
];

interface PhotoGalleryProps {
  onOpenContribution: () => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onOpenContribution }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  const filteredPhotos = GALLERY_ITEMS.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
            <ImageIcon size={16} />
            <span>الأرشيف البصري والوثائقي</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            مكتبة الصور والوثائق التاريخية
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            سجل مصور يجمع وثائق المشيخة، صور الأجداد، ذكريات القرية، ولقاءات الأبناء
          </p>
        </div>

        <button
          onClick={onOpenContribution}
          className="btn-primary text-xs sm:text-sm py-2 px-4 flex items-center gap-2 self-start sm:self-auto"
        >
          <HeartHandshake size={16} />
          <span>أضف صورة أو وثيقة جديدة</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'كافة الألبوم' },
          { id: 'documents', label: 'مخطوطات ووثائق' },
          { id: 'sharouna', label: 'معالم شارونة والديوان' },
          { id: 'gatherings', label: 'المناسبات واللقاءات' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map(item => (
          <div
            key={item.id}
            onClick={() => setActivePhoto(item)}
            className="glass-panel overflow-hidden cursor-pointer group hover:border-amber-400 transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70" />
              <div className="absolute top-3 right-3">
                <span className="badge badge-gold text-[10px] backdrop-blur-md">
                  {item.categoryLabel}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 text-white/80 group-hover:text-amber-400 transition-colors">
                <ZoomIn size={18} />
              </div>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-display font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>{item.year}</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} />
                  <span>{item.location}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="modal-overlay" onClick={() => setActivePhoto(null)}>
          <div className="modal-content max-w-4xl p-2 bg-slate-950" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 left-4 z-20 p-2 rounded-full bg-slate-900/90 text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>

              <div className="max-h-[70vh] flex items-center justify-center overflow-hidden rounded-xl bg-black">
                <img
                  src={activePhoto.image_url}
                  alt={activePhoto.title}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              <div className="p-5 space-y-2 bg-slate-900/95 rounded-b-xl border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="badge badge-gold text-xs">{activePhoto.categoryLabel}</span>
                  <span className="text-xs text-slate-400">{activePhoto.year} — {activePhoto.location}</span>
                </div>
                <h4 className="font-display font-bold text-lg text-white">
                  {activePhoto.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activePhoto.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

