import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  X, 
  Check, 
  XCircle, 
  Edit3, 
  Clock, 
  Eye, 
  RotateCcw, 
  UserPlus, 
  History, 
  Lock, 
  LogOut,
  AlertTriangle,
  Download,
  Save
} from 'lucide-react';
import { 
  ContributionRequest, 
  Person, 
  ActivityLog, 
  PersonRevision
} from '../types/database';
import { familyService } from '../services/familyService';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  isAdminLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
  onDataUpdated: () => void;
  persons: Person[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  isAdminLoggedIn,
  onLoginSuccess,
  onLogout,
  onDataUpdated,
  persons
}) => {
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'review' | 'persons' | 'revisions' | 'logs' | 'backup'>('review');

  // Review Queue State
  const [contributions, setContributions] = useState<ContributionRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedContribution, setSelectedContribution] = useState<ContributionRequest | null>(null);

  // Edit-before-approve state
  const [isEditingBeforeApproval, setIsEditingBeforeApproval] = useState(false);
  const [editedProposedData, setEditedProposedData] = useState<Record<string, any>>({});
  const [adminNotesInput, setAdminNotesInput] = useState('');

  // Logs & Revisions
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [revisions, setRevisions] = useState<PersonRevision[]>([]);

  // Direct Person Manager Form (Create)
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonFatherId, setNewPersonFatherId] = useState('');
  const [newPersonOccupation, setNewPersonOccupation] = useState('');
  const [newPersonResidence, setNewPersonResidence] = useState('شارونة، المنيا');
  const [newPersonBio, setNewPersonBio] = useState('');

  // Edit Existing Person Form
  const [editPersonSubTab, setEditPersonSubTab] = useState<'create' | 'edit'>('create');
  const [selectedPersonToEditId, setSelectedPersonToEditId] = useState<string>('');
  const [editFields, setEditFields] = useState<Partial<Person>>({});

  const loadAdminData = async () => {
    const list = await familyService.getAllContributions();
    setContributions(list);
    const logs = await familyService.getActivityLogs();
    setActivityLogs(logs);
  };

  useEffect(() => {
    if (isAdminLoggedIn && isOpen) {
      loadAdminData();
    }
  }, [isAdminLoggedIn, isOpen]);

  // When selecting a person to edit, populate editFields
  useEffect(() => {
    if (selectedPersonToEditId) {
      const p = persons.find(item => item.id === selectedPersonToEditId || item.legacy_id === selectedPersonToEditId);
      if (p) {
        setEditFields({ ...p });
      }
    } else {
      setEditFields({});
    }
  }, [selectedPersonToEditId, persons]);

  if (!isOpen) return null;

  // Handle Admin Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'rady2026' || adminPassword === 'admin' || adminPassword === 'alrady') {
      setLoginError('');
      onLoginSuccess();
      loadAdminData();
    } else {
      setLoginError('كلمة المرور غير صحيحة. يرجى التأكد من كلمة مرور المشرف.');
    }
  };

  // Filtered contributions list
  const filteredContributions = contributions.filter(c => {
    if (statusFilter === 'all') return true;
    return c.status === statusFilter;
  });

  const pendingCount = contributions.filter(c => c.status === 'pending').length;

  // Approve Contribution Action
  const handleApprove = async (c: ContributionRequest, customData?: Record<string, any>) => {
    const res = await familyService.approveContribution(c.id, customData);
    if (res.ok) {
      alert(res.message);
      setSelectedContribution(null);
      setIsEditingBeforeApproval(false);
      await loadAdminData();
      onDataUpdated();
    } else {
      alert('خطأ: ' + res.message);
    }
  };

  // Reject Contribution Action
  const handleReject = async (c: ContributionRequest) => {
    const reason = prompt('يرجى كتابة سبب الرفض لحفظه في سجل الطلب (اختياري):', adminNotesInput || 'بيانات غير مطابقة للوثائق المعتمدة');
    if (reason === null) return;

    const res = await familyService.rejectContribution(c.id, reason);
    if (res.ok) {
      alert(res.message);
      setSelectedContribution(null);
      await loadAdminData();
      onDataUpdated();
    }
  };

  // Rollback Action
  const handleRollback = async (revId: string) => {
    if (!confirm('هل أنت متأكد من استرجاع هذه النسخة السابقة؟')) return;
    const res = await familyService.rollbackRevision(revId);
    if (res.ok) {
      alert(res.message);
      await loadAdminData();
      onDataUpdated();
    }
  };

  // Direct Person Creation
  const handleCreatePersonDirect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPersonName.trim()) return;

    let gen = 1;
    let branchCode = 'root';
    let branchName = 'الأصل المؤسس';

    if (newPersonFatherId) {
      const father = persons.find(p => p.id === newPersonFatherId || p.legacy_id === newPersonFatherId);
      if (father) {
        gen = father.generation + 1;
        branchCode = father.branch_id || 'root';
        branchName = father.branch_name || 'الأصل المؤسس';
      }
    }

    await familyService.addPersonDirect({
      first_name: newPersonName,
      full_name: `${newPersonName} بن آل راضي`,
      father_id: newPersonFatherId || null,
      generation: gen,
      branch_id: branchCode,
      branch_name: branchName,
      occupation: newPersonOccupation,
      residence: newPersonResidence,
      bio: newPersonBio
    });

    alert('تم إضافة الفرد إلى شجرة العائلة بنجاح!');
    setNewPersonName('');
    setNewPersonFatherId('');
    setNewPersonBio('');
    await loadAdminData();
    onDataUpdated();
  };

  // Direct Person Edit Save
  const handleSavePersonEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPersonToEditId) return;

    const ok = await familyService.updatePersonDirect(selectedPersonToEditId, editFields);
    if (ok) {
      alert('تم تحديث بيانات الفرد بنجاح وحفظ نسخة تراجع!');
      await loadAdminData();
      onDataUpdated();
    } else {
      alert('فشل تحديث البيانات.');
    }
  };

  // Export JSON Backup
  const handleExportBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      family: 'AL RADY FAMILY LEGACY',
      persons,
      contributions,
      logs: activityLogs
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `al-rady-family-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-5xl" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-xl text-white">
                  لوحة التحكم المركزية للأدمن
                </h3>
                {isAdminLoggedIn && (
                  <span className="badge badge-emerald text-xs">
                    جلسة نشطة وموثقة
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300">
                إدارة شجرة العائلة، مراجعة واعتماد المساهمات، تعديل الأفراد، وسجل التدقيق والنسخ الاحتياطي
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={onLogout}
                className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs flex items-center gap-1.5"
                title="تسجيل الخروج"
              >
                <LogOut size={14} />
                <span>خروج</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {!isAdminLoggedIn ? (
            /* Secure Login Gate */
            <div className="max-w-md mx-auto py-8 text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                <Lock size={28} />
              </div>

              <div>
                <h4 className="font-display font-bold text-xl text-white">
                  تسجيل الدخول للوحة المشرف
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  هذه اللوحة مخصصة حصرًا لصاحب المنصة (المهندس راضي أحمد) لمراجعة البيانات واعتمادها
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 pt-2">
                <div>
                  <input
                    type="password"
                    placeholder="أدخل كلمة مرور المشرف..."
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                    required
                    className="w-full bg-slate-900 border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-white text-center tracking-widest focus:outline-none focus:border-amber-400"
                  />
                  {loginError && (
                    <div className="text-xs text-rose-400 mt-1.5 flex items-center justify-center gap-1">
                      <AlertTriangle size={13} />
                      <span>{loginError}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-2.5 text-sm"
                >
                  دخول لوحة الإدارة
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Management Interface */
            <div className="space-y-6">
              
              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('review')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                    activeTab === 'review'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Clock size={16} />
                  <span>طابور المراجعة</span>
                  {pendingCount > 0 && (
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {pendingCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('persons')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                    activeTab === 'persons'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <UserPlus size={16} />
                  <span>إدارة وتعديل الأفراد</span>
                </button>

                <button
                  onClick={() => setActiveTab('revisions')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                    activeTab === 'revisions'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <RotateCcw size={16} />
                  <span>سجل التراجع</span>
                </button>

                <button
                  onClick={() => setActiveTab('logs')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                    activeTab === 'logs'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <History size={16} />
                  <span>سجل التدقيق</span>
                </button>

                <button
                  onClick={() => setActiveTab('backup')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                    activeTab === 'backup'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Download size={16} />
                  <span>النسخ الاحتياطي</span>
                </button>
              </div>

              {/* TAB 1: REVIEW QUEUE */}
              {activeTab === 'review' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      { id: 'all', label: 'كل المساهمات' },
                      { id: 'pending', label: 'الطلبات الجديدة (معلقة)' },
                      { id: 'under_review', label: 'قيد المراجعة' },
                      { id: 'approved', label: 'المعتمدة والمنشورة' },
                      { id: 'rejected', label: 'المرفوضة' }
                    ].map(f => (
                      <button
                        key={f.id}
                        onClick={() => setStatusFilter(f.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                          statusFilter === f.id
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {filteredContributions.length === 0 ? (
                      <div className="text-center py-12 text-slate-400 text-sm glass-panel">
                        لا توجد طلبات مساهمة في هذا التصنيف حاليًا
                      </div>
                    ) : (
                      filteredContributions.map(c => {
                        const target = persons.find(p => p.id === c.target_person_id || p.legacy_id === c.target_person_id);
                        return (
                          <div 
                            key={c.id} 
                            className="glass-panel p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-amber-500/20 hover:border-amber-500/40"
                          >
                            <div className="space-y-1.5 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono font-bold text-xs text-amber-400">
                                  {c.reference_no}
                                </span>
                                <span className="badge badge-gold text-[10px]">
                                  {c.contribution_type}
                                </span>
                                <span className={`badge text-[10px] ${
                                  c.status === 'approved' ? 'badge-emerald' :
                                  c.status === 'rejected' ? 'badge-rose' : 'badge-amber'
                                }`}>
                                  {c.status}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  {new Date(c.created_at).toLocaleDateString('ar-EG')}
                                </span>
                              </div>

                              <div className="text-sm font-semibold text-white">
                                {c.contributor_name} 
                                {c.contributor_phone ? ` (${c.contributor_phone})` : ''} 
                                {target ? ` — عن الفرد: ${target.first_name}` : ''}
                              </div>

                              <p className="text-xs text-slate-300 line-clamp-2">
                                {c.details}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => {
                                  setSelectedContribution(c);
                                  setEditedProposedData(c.proposed_data || {});
                                  setAdminNotesInput(c.admin_notes || '');
                                }}
                                className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
                              >
                                <Eye size={14} />
                                <span>معاينة المقارنة</span>
                              </button>

                              {c.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleApprove(c)}
                                    className="btn-emerald text-xs py-1.5 px-3 flex items-center gap-1"
                                  >
                                    <Check size={14} />
                                    <span>قبول ونشر</span>
                                  </button>

                                  <button
                                    onClick={() => handleReject(c)}
                                    className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                                    title="رفض الطلب"
                                  >
                                    <XCircle size={16} />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* SIDE-BY-SIDE DIFF INSPECTOR MODAL */}
                  {selectedContribution && (
                    <div className="modal-overlay" onClick={() => setSelectedContribution(null)}>
                      <div className="modal-content max-w-4xl" onClick={e => e.stopPropagation()}>
                        
                        <div className="p-5 border-b border-white/10 flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-display font-bold text-lg text-white">
                                مراجعة وتدقيق المساهمة: {selectedContribution.reference_no}
                              </h4>
                              <span className="badge badge-gold text-xs">
                                {selectedContribution.contribution_type}
                              </span>
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">
                              مقدم المساهمة: {selectedContribution.contributor_name} — {selectedContribution.contributor_phone || 'بدون هاتف'}
                            </div>
                          </div>

                          <button
                            onClick={() => setSelectedContribution(null)}
                            className="p-1.5 rounded-full bg-slate-900 text-slate-300"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        <div className="p-6 space-y-6">
                          
                          <div className="glass-panel p-4 space-y-1 bg-amber-500/5">
                            <div className="text-xs font-bold text-amber-400">نص المساهمة المرسل من الزائر:</div>
                            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                              {selectedContribution.details}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                            <div className="glass-panel p-4 border-slate-700 space-y-2">
                              <div className="text-xs font-bold text-slate-400 pb-1 border-b border-white/10">
                                البيانات الحالية في شجرة العائلة
                              </div>
                              {selectedContribution.current_data_snapshot ? (
                                <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                                  {Object.entries(selectedContribution.current_data_snapshot).map(([k, v]) => (
                                    <div key={k} className="p-1.5 rounded bg-slate-900/50">
                                      <span className="text-slate-500 block text-[10px]">{k}</span>
                                      <span>{String(v)}</span>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-xs text-slate-500 py-4">
                                  لا توجد بيانات سابقة مسجلة (إضافة جديدة)
                                </div>
                              )}
                            </div>

                            <div className="glass-panel p-4 border-emerald-500/40 bg-emerald-500/5 space-y-2">
                              <div className="flex items-center justify-between pb-1 border-b border-emerald-500/20">
                                <span className="text-xs font-bold text-emerald-400">
                                  البيانات المقترحة للاعتماد والنشر
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setIsEditingBeforeApproval(!isEditingBeforeApproval)}
                                  className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
                                >
                                  <Edit3 size={12} />
                                  <span>{isEditingBeforeApproval ? 'إلغاء التعديل' : 'تعديل قبل النشر'}</span>
                                </button>
                              </div>

                              {isEditingBeforeApproval ? (
                                <div className="space-y-2">
                                  {Object.keys(editedProposedData).map(k => (
                                    <div key={k}>
                                      <label className="block text-[10px] text-slate-400">{k}</label>
                                      <input
                                        type="text"
                                        value={editedProposedData[k] || ''}
                                        onChange={e => setEditedProposedData({ ...editedProposedData, [k]: e.target.value })}
                                        className="w-full bg-slate-900 border border-emerald-500/30 rounded p-1.5 text-xs text-white"
                                      />
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="space-y-1.5 text-xs text-emerald-200 font-mono">
                                  {selectedContribution.proposed_data && Object.entries(selectedContribution.proposed_data).length > 0 ? (
                                    Object.entries(selectedContribution.proposed_data).map(([k, v]) => (
                                      <div key={k} className="p-1.5 rounded bg-emerald-950/40 border border-emerald-500/20">
                                        <span className="text-emerald-400/70 block text-[10px]">{k}</span>
                                        <span>{String(v)}</span>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="text-xs text-slate-400 py-4">
                                      نص المساهمة مباشر
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                          </div>

                          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                            <button
                              onClick={() => handleReject(selectedContribution)}
                              className="p-2 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold"
                            >
                              رفض الطلب دون تغيير البيانات
                            </button>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleApprove(selectedContribution, isEditingBeforeApproval ? editedProposedData : undefined)}
                                className="btn-emerald text-xs py-2 px-6 flex items-center gap-1.5"
                              >
                                <Check size={16} />
                                <span>اعتماد ونشر في شجرة العائلة فورًا</span>
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 2: DIRECT PERSON MANAGEMENT (CREATE & EDIT) */}
              {activeTab === 'persons' && (
                <div className="space-y-6">
                  
                  <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                    <button
                      onClick={() => setEditPersonSubTab('create')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        editPersonSubTab === 'create'
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      + إضافة فرد جديد للشجرة
                    </button>
                    <button
                      onClick={() => setEditPersonSubTab('edit')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        editPersonSubTab === 'edit'
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      ✎ تعديل بيانات فرد موجود
                    </button>
                  </div>

                  {editPersonSubTab === 'create' && (
                    <div className="glass-panel p-5 space-y-4">
                      <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
                        <UserPlus size={18} className="text-amber-400" />
                        <span>إضافة فرد جديد مباشرة إلى قاعدة البيانات والشجرة</span>
                      </h4>

                      <form onSubmit={handleCreatePersonDirect} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">اسم الشخص الأول *</label>
                          <input
                            type="text"
                            placeholder="مثال: يوسف"
                            value={newPersonName}
                            onChange={e => setNewPersonName(e.target.value)}
                            required
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-slate-300 mb-1">الوالد من العائلة *</label>
                          <select
                            value={newPersonFatherId}
                            onChange={e => setNewPersonFatherId(e.target.value)}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                          >
                            <option value="">— اختر الوالد لتحديد الجيل والفرع تلقائيًا —</option>
                            {persons.map(p => (
                              <option key={p.id} value={p.id}>
                                {p.first_name} ({p.branch_name || 'الأصل'}) — {p.full_name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs text-slate-300 mb-1">المهنة</label>
                          <input
                            type="text"
                            placeholder="مثال: مهندس برمجيات"
                            value={newPersonOccupation}
                            onChange={e => setNewPersonOccupation(e.target.value)}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-slate-300 mb-1">محل الإقامة</label>
                          <input
                            type="text"
                            value={newPersonResidence}
                            onChange={e => setNewPersonResidence(e.target.value)}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs text-slate-300 mb-1">نبذة وسيرة مختصرة</label>
                          <textarea
                            rows={2}
                            value={newPersonBio}
                            onChange={e => setNewPersonBio(e.target.value)}
                            placeholder="اكتب نبذة عن الفرد..."
                            className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                          />
                        </div>

                        <div className="sm:col-span-2 pt-2">
                          <button type="submit" className="btn-primary text-xs py-2 px-6">
                            إضافة الفرد وحفظ التغييرات
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {editPersonSubTab === 'edit' && (
                    <div className="glass-panel p-5 space-y-4">
                      <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
                        <Edit3 size={18} className="text-amber-400" />
                        <span>تعديل بيانات فرد موجود في الشجرة</span>
                      </h4>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs text-slate-300 mb-1">اختر الفرد لتعديل بياناته:</label>
                          <select
                            value={selectedPersonToEditId}
                            onChange={e => setSelectedPersonToEditId(e.target.value)}
                            className="w-full bg-slate-900 border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                          >
                            <option value="">— اختر الفرد من القائمة —</option>
                            {persons.map(p => (
                              <option key={p.id} value={p.id}>
                                {p.first_name} (ج {p.generation}) — {p.full_name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {selectedPersonToEditId && (
                          <form onSubmit={handleSavePersonEdit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                            <div>
                              <label className="block text-xs text-slate-300 mb-1">الاسم الأول</label>
                              <input
                                type="text"
                                value={editFields.first_name || ''}
                                onChange={e => setEditFields({ ...editFields, first_name: e.target.value })}
                                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-xs text-slate-300 mb-1">الاسم والنسب الكامل</label>
                              <input
                                type="text"
                                value={editFields.full_name || ''}
                                onChange={e => setEditFields({ ...editFields, full_name: e.target.value })}
                                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-xs text-slate-300 mb-1">تاريخ الميلاد</label>
                              <input
                                type="text"
                                placeholder="مثال: ١٩٤٥م أو ١٩٨٠م"
                                value={editFields.birth_date || ''}
                                onChange={e => setEditFields({ ...editFields, birth_date: e.target.value })}
                                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-xs text-slate-300 mb-1">تاريخ الوفاة (إن وجد)</label>
                              <input
                                type="text"
                                placeholder="مثال: ٢٠٠٥م"
                                value={editFields.death_date || ''}
                                onChange={e => setEditFields({ ...editFields, death_date: e.target.value })}
                                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-xs text-slate-300 mb-1">المهنة والمسيرة</label>
                              <input
                                type="text"
                                value={editFields.occupation || ''}
                                onChange={e => setEditFields({ ...editFields, occupation: e.target.value })}
                                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-xs text-slate-300 mb-1">محل الإقامة</label>
                              <input
                                type="text"
                                value={editFields.residence || ''}
                                onChange={e => setEditFields({ ...editFields, residence: e.target.value })}
                                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-xs text-slate-300 mb-1">السيرة الذاتية والنبذة</label>
                              <textarea
                                rows={3}
                                value={editFields.bio || ''}
                                onChange={e => setEditFields({ ...editFields, bio: e.target.value })}
                                className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white leading-relaxed"
                              />
                            </div>

                            <div className="sm:col-span-2 flex items-center justify-between pt-2">
                              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={Boolean(editFields.is_deceased)}
                                  onChange={e => setEditFields({ ...editFields, is_deceased: e.target.checked })}
                                  className="rounded text-amber-500"
                                />
                                <span>متوفى (رحمه الله)</span>
                              </label>

                              <button type="submit" className="btn-emerald text-xs py-2 px-6 flex items-center gap-1.5">
                                <Save size={15} />
                                <span>حفظ تعديلات الفرد</span>
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 3: REVISIONS & ROLLBACK */}
              {activeTab === 'revisions' && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-300">
                    يمكنك هنا مراجعة النسخ الاحتياطية السابقة لأي فرد بعد تعديل بياناته، واسترجاع أي نسخة سابقة بضغطة زر.
                  </div>

                  {revisions.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 glass-panel text-xs">
                      لا توجد نسخ تراجع مسجلة حتى الآن (يتم إنشاء نسخة احتياطية تلقائيًا عند أي تعديل أو موافقة).
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {revisions.map(rev => (
                        <div key={rev.id} className="glass-panel p-4 flex items-center justify-between gap-4">
                          <div>
                            <div className="font-bold text-white text-xs">
                              {rev.reason || 'تعديل بيانات'}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              بواسطة: {rev.created_by} — {new Date(rev.created_at).toLocaleString('ar-EG')}
                            </div>
                          </div>

                          <button
                            onClick={() => handleRollback(rev.id)}
                            className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
                          >
                            <RotateCcw size={14} />
                            <span>استرجاع هذه النسخة</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: ACTIVITY AUDIT LOGS */}
              {activeTab === 'logs' && (
                <div className="space-y-3">
                  <div className="text-xs text-slate-400 mb-2">
                    سجل تدقيق غير قابل للحذف يوثق كل العمليات التي تمت على المنصة:
                  </div>

                  {activityLogs.map(log => (
                    <div key={log.id} className="glass-panel p-3 text-xs flex items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <div className="font-semibold text-white">
                          [{log.action_type}] على {log.entity_type} {log.entity_id ? `(${log.entity_id})` : ''}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          بواسطة: {log.performed_by}
                        </div>
                      </div>

                      <div className="text-[11px] text-amber-400/80 font-mono">
                        {new Date(log.created_at).toLocaleString('ar-EG')}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 5: BACKUP & DATA EXPORT */}
              {activeTab === 'backup' && (
                <div className="space-y-6">
                  <div className="glass-panel p-6 space-y-4 border-amber-500/30">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                      <Download size={18} />
                      <span>تصدير نسخة احتياطية كاملة من قاعدة بيانات العائلة</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      يمكنك تنزيل ملف JSON يحتوي على كامل شجرة العائلة (الأفراد الـ ٧٣، شريط النسب، الفروع، المساهمات، وسجل التدقيق) لضمان عدم فقدان أي بيانات نهائيًا والاحتفاظ بنسخ دورية على جهازك.
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={handleExportBackup}
                        className="btn-primary text-xs py-2 px-5 flex items-center gap-2"
                      >
                        <Download size={15} />
                        <span>تنزيل النسخة الاحتياطية (JSON)</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
