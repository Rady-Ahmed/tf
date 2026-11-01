import React, { useState } from 'react';
import { Search, Clock, CheckCircle2, XCircle, AlertCircle, HelpCircle, FileCheck, ShieldCheck } from 'lucide-react';
import { ContributionRequest } from '../types/database';
import { familyService } from '../services/familyService';

export const ContributionTracker: React.FC = () => {
  const [refInput, setRefInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [requestResult, setRequestResult] = useState<ContributionRequest | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refInput.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const res = await familyService.getContributionByReference(refInput);
      setRequestResult(res);
    } catch (err) {
      console.error(err);
      setRequestResult(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="badge badge-emerald flex items-center gap-1.5 py-1 px-3">
            <CheckCircle2 size={15} />
            <span>معتمد ومنشور رسميًا</span>
          </span>
        );
      case 'under_review':
        return (
          <span className="badge badge-blue flex items-center gap-1.5 py-1 px-3">
            <Clock size={15} />
            <span>قيد المراجعة والتدقيق</span>
          </span>
        );
      case 'needs_information':
        return (
          <span className="badge badge-amber flex items-center gap-1.5 py-1 px-3">
            <HelpCircle size={15} />
            <span>يحتاج معلومات إضافية</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="badge badge-rose flex items-center gap-1.5 py-1 px-3">
            <XCircle size={15} />
            <span>مرفوض</span>
          </span>
        );
      default:
        return (
          <span className="badge badge-gold flex items-center gap-1.5 py-1 px-3">
            <Clock size={15} />
            <span>طلب جديد بانتظار المراجعة</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-2">
          <FileCheck size={26} />
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
          تتبع حالة المساهمة العائلية
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
          أدخل الرقم المرجعي لمساهمتك لمعرفة ما إذا كانت معتمدة، قيد المراجعة، أو تحتاج تفاصيل إضافية
        </p>
      </div>

      {/* Search Input Card */}
      <div className="glass-panel p-6 max-w-xl mx-auto border-amber-500/30">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              الرقم المرجعي للمساهمة
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="مثال: RADY-REQ-2026-1042"
                value={refInput}
                onChange={e => setRefInput(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute left-2 top-1/2 -translate-y-1/2 btn-primary text-xs py-1.5 px-4"
              >
                {loading ? 'بحث...' : 'تتبع'}
              </button>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>النظام يضمن سرية تفاصيل المساهمة وصاحب الطلب</span>
          </div>
        </form>
      </div>

      {/* Results View */}
      {searched && (
        <div className="max-w-2xl mx-auto">
          {requestResult ? (
            <div className="glass-panel p-6 space-y-5 border-amber-500/30">
              
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <div className="text-xs text-slate-400">الرقم المرجعي</div>
                  <div className="font-mono font-bold text-lg text-white">
                    {requestResult.reference_no}
                  </div>
                </div>

                <div>
                  {getStatusBadge(requestResult.status)}
                </div>
              </div>

              {/* Progress Steps Visualizer */}
              <div className="grid grid-cols-3 gap-2 text-center py-2">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs font-bold text-white">١. استلام الطلب</div>
                  <div className="text-[10px] text-emerald-400 mt-1">مكتمل ✓</div>
                </div>

                <div className={`p-2.5 rounded-xl border ${
                  requestResult.status !== 'pending'
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}>
                  <div className="text-xs font-bold">٢. تدقيق النسب</div>
                  <div className="text-[10px] mt-1">
                    {requestResult.status === 'pending' ? 'قيد الانتظار' : 'تم الفحص'}
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl border ${
                  requestResult.status === 'approved'
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                    : requestResult.status === 'rejected'
                    ? 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}>
                  <div className="text-xs font-bold">٣. النشر الرسمي</div>
                  <div className="text-[10px] mt-1">
                    {requestResult.status === 'approved' ? 'منشور بالشجرة ✓' : 'بانتظار القرار'}
                  </div>
                </div>
              </div>

              {/* Request Details Snapshot */}
              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div>
                  <span className="font-bold text-slate-400">نوع المساهمة: </span>
                  <span>{requestResult.contribution_type}</span>
                </div>

                <div>
                  <span className="font-bold text-slate-400">تفاصيل المساهمة: </span>
                  <p className="mt-1 p-3 rounded-lg bg-slate-900 text-slate-200 leading-relaxed">
                    {requestResult.details}
                  </p>
                </div>

                {requestResult.admin_notes && (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
                    <span className="font-bold block mb-1">ملاحظات إدارة المنصة:</span>
                    <span>{requestResult.admin_notes}</span>
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="glass-panel p-8 text-center space-y-2">
              <AlertCircle size={32} className="text-rose-400 mx-auto" />
              <div className="font-bold text-white text-base">لم يتم العثور على أي طلب بهذا الرقم</div>
              <p className="text-xs text-slate-400">
                تأكد من كتابة الرقم المرجعي كما استلمته تمامًا (مثال: RADY-REQ-2026-1042)
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
