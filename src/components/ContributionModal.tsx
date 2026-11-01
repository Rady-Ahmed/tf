import React, { useState, useEffect } from 'react';
import { 
  X, 
  HeartHandshake, 
  Upload, 
  CheckCircle2, 
  Copy, 
  Sparkles, 
  AlertCircle, 
  FileText, 
  Image as ImageIcon,
  UserPlus,
  Edit3
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Person, ContributionType } from '../types/database';
import { familyService } from '../services/familyService';

interface ContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetPerson?: Person | null;
  allPersons: Person[];
  onContributionSubmitted?: () => void;
}

export const ContributionModal: React.FC<ContributionModalProps> = ({
  isOpen,
  onClose,
  targetPerson,
  allPersons,
  onContributionSubmitted
}) => {
  const [contributionType, setContributionType] = useState<ContributionType>('edit_person');
  const [selectedPersonId, setSelectedPersonId] = useState<string>('');
  const [contributorName, setContributorName] = useState('');
  const [contributorPhone, setContributorPhone] = useState('');
  const [details, setDetails] = useState('');

  // Dynamic fields
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonFatherId, setNewPersonFatherId] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [occupation, setOccupation] = useState('');
  const [residence, setResidence] = useState('');
  const [storyTitle, setStoryTitle] = useState('');
  const [storyContent, setStoryContent] = useState('');
  
  // File uploads
  const [attachments, setAttachments] = useState<Array<{ file_name: string; file_url: string; file_type: string }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{ reference_no: string; message: string } | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  useEffect(() => {
    if (targetPerson) {
      setSelectedPersonId(targetPerson.id);
      setContributionType('edit_person');
    }
  }, [targetPerson]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      // Validate file size (< 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الملف كبير جدًا، الحد الأقصى ٥ ميجابايت لكل ملف.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setAttachments(prev => [
          ...prev,
          {
            file_name: file.name,
            file_url: base64,
            file_type: file.type
          }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contributorName.trim()) {
      alert('يرجى كتابة اسمك الكريم لمتابعة المساهمة.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Build proposed data based on contribution type
      const proposed_data: Record<string, any> = {};

      if (contributionType === 'new_person') {
        proposed_data.first_name = newPersonName;
        proposed_data.full_name = `${newPersonName} بن آل راضي`;
        proposed_data.father_id = newPersonFatherId || null;
        proposed_data.birth_date = birthDate;
        proposed_data.occupation = occupation;
        proposed_data.residence = residence;
      } else if (contributionType === 'edit_person' || contributionType === 'correction') {
        if (birthDate) proposed_data.birth_date = birthDate;
        if (occupation) proposed_data.occupation = occupation;
        if (residence) proposed_data.residence = residence;
      } else if (contributionType === 'add_story') {
        proposed_data.title = storyTitle;
        proposed_data.content = storyContent || details;
      }

      const res = await familyService.submitContribution({
        contribution_type: contributionType,
        target_person_id: selectedPersonId || (targetPerson?.id || null),
        contributor_name: contributorName,
        contributor_phone: contributorPhone,
        details: details || `مساهمة من نوع ${contributionType}`,
        proposed_data,
        attachments
      });

      if (res.ok) {
        setSubmissionResult({
          reference_no: res.reference_no,
          message: res.message
        });

        // Trigger celebration confetti
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (_) {}

        if (onContributionSubmitted) onContributionSubmitted();
      }
    } catch (err: any) {
      alert('حدث خطأ أثناء إرسال المساهمة: ' + (err.message || 'يرجى المحاولة لاحقًا'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyRefToClipboard = () => {
    if (submissionResult?.reference_no) {
      navigator.clipboard.writeText(submissionResult.reference_no);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-2xl" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <HeartHandshake size={22} />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                ساهم في حفظ تاريخ العائلة
              </h3>
              <p className="text-xs text-slate-300">
                مساهمتك تحفظ الأنساب والذكريات للأجيال القادمة (تخضع لمراجعة واعتماد الأدمن)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body or Success Confirmation */}
        <div className="p-6">
          {submissionResult ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
                <CheckCircle2 size={36} />
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-bold text-xl text-white">
                  تم استلام مساهمتك الكريمة بنجاح!
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  {submissionResult.message}
                </p>
              </div>

              {/* Reference Card */}
              <div className="glass-panel p-4 max-w-md mx-auto space-y-2 border-amber-500/30">
                <div className="text-xs text-amber-400 font-medium">الرقم المرجعي لتتبع حالة طلبك</div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-white tracking-widest">
                  {submissionResult.reference_no}
                </div>
                <button
                  type="button"
                  onClick={copyRefToClipboard}
                  className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 mx-auto mt-2"
                >
                  <Copy size={13} />
                  <span>{copiedRef ? 'تم النسخ!' : 'نسخ الرقم المرجعي'}</span>
                </button>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-primary text-sm py-2 px-6"
                >
                  تم، العودة إلى الموقع
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Contribution Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  نوع المساهمة *
                </label>
                <select
                  value={contributionType}
                  onChange={e => setContributionType(e.target.value as ContributionType)}
                  className="w-full bg-slate-900 border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="new_person">١. إضافة فرد جديد إلى شجرة العائلة</option>
                  <option value="edit_person">٢. تعديل أو استكمال بيانات فرد موجود</option>
                  <option value="correction">٣. تصحيح اسم أو تاريخ أو معلومة</option>
                  <option value="add_relative">٤. اقتراح إضافة أب أو أم أو ابن أو زوج</option>
                  <option value="upload_photo">٥. رفع صورة تاريخية أو شخصية لفرد</option>
                  <option value="add_story">٦. إضافة قصة أو سيرة ذاتية</option>
                  <option value="add_memory">٧. إضافة ذكرى عن أحد الأجداد والراحلين</option>
                  <option value="upload_document">٨. إضافة وثيقة أو مستند عائلي قديم</option>
                  <option value="correct_branch">٩. اقتراح تصحيح فرع أو صلة قرابة</option>
                </select>
              </div>

              {/* Target Person Selector (If not a generic story) */}
              {contributionType !== 'new_person' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    الشخص المرتبط بالمساهمة من العائلة
                  </label>
                  <select
                    value={selectedPersonId}
                    onChange={e => setSelectedPersonId(e.target.value)}
                    className="w-full bg-slate-900 border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="">— اختر شخصًا من القائمة —</option>
                    {allPersons.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.first_name} ({p.branch_name || 'الأصل'}) — {p.full_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Dynamic Fields for NEW PERSON */}
              {contributionType === 'new_person' && (
                <div className="glass-panel p-4 space-y-3 bg-amber-500/5 border-amber-500/20">
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <UserPlus size={15} />
                    <span>بيانات الفرد الجديد المقترح إضافته</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">اسم الشخص الأول *</label>
                      <input
                        type="text"
                        placeholder="مثال: أحمد"
                        value={newPersonName}
                        onChange={e => setNewPersonName(e.target.value)}
                        required={contributionType === 'new_person'}
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">اسم الوالد من العائلة *</label>
                      <select
                        value={newPersonFatherId}
                        onChange={e => setNewPersonFatherId(e.target.value)}
                        required={contributionType === 'new_person'}
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                      >
                        <option value="">— اختر الوالد —</option>
                        {allPersons.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.first_name} — {p.full_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Fields for STORY */}
              {contributionType === 'add_story' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">عنوان القصة أو الحدث التاريخي</label>
                    <input
                      type="text"
                      placeholder="مثال: ديوان العائلة في موسم الحصاد..."
                      value={storyTitle}
                      onChange={e => setStoryTitle(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {/* Contribution Details */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  تفاصيل المساهمة أو التصحيح المطلوب *
                </label>
                <textarea
                  rows={4}
                  placeholder="اكتب كل ما تعرفه بدقة (الأسماء، التواريخ، الروايات، التفاصيل)..."
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-amber-500/30 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 leading-relaxed"
                />
              </div>

              {/* Attachment File Uploader */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  إرفاق صور أو وثائق عائلية (اختياري)
                </label>
                
                <label className="border-2 border-dashed border-amber-500/30 hover:border-amber-400/60 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white/5">
                  <Upload size={24} className="text-amber-400 mb-1" />
                  <span className="text-xs text-slate-300 font-medium">
                    اضغط هنا لرفع صور أو مستندات
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5">
                    يدعم JPG, PNG, WEBP, PDF (أقصى حجم ٥ ميجابايت)
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*,application/pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Attachments preview */}
                {attachments.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {attachments.map((att, idx) => (
                      <div key={idx} className="glass-panel px-3 py-1.5 text-xs text-amber-300 flex items-center gap-2">
                        <ImageIcon size={14} />
                        <span className="truncate max-w-[140px]">{att.file_name}</span>
                        <button
                          type="button"
                          onClick={() => setAttachments(attachments.filter((_, i) => i !== idx))}
                          className="text-rose-400 hover:text-rose-300"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Contributor Information */}
              <div className="pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    اسمك الكريم *
                  </label>
                  <input
                    type="text"
                    placeholder="اسم مقدم المساهمة"
                    value={contributorName}
                    onChange={e => setContributorName(e.target.value)}
                    required
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    رقم الهاتف أو الواتساب (اختياري للتواصل)
                  </label>
                  <input
                    type="tel"
                    placeholder="010xxxxxxxx"
                    value={contributorPhone}
                    onChange={e => setContributorPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  🔒 لن تنشر أي بيانات إلا بعد مراجعة واعتماد الأدمن
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary text-xs sm:text-sm py-2.5 px-6"
                >
                  {isSubmitting ? 'جارٍ الإرسال...' : 'إرسال المساهمة'}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
