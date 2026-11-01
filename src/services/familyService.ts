import { supabase, isSupabaseConfigured } from './supabase';
import { 
  Person, 
  FamilyBranch, 
  FamilyRelationship, 
  ContributionRequest, 
  ContributionStatus, 
  ContributionType,
  Story, 
  Memory, 
  HistoricalDocument, 
  FamilyPost, 
  Achievement, 
  ActivityLog, 
  PersonRevision 
} from '../types/database';
import { PERSONS_SEED, BRANCHES_SEED, INITIAL_POSTS_SEED, HISTORICAL_DOCS_SEED } from '../data/seedData';

const STORAGE_KEY_PREFIX = 'al_rady_legacy_';

// Initial state generators for fallback / offline mode
function getLocal<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('LocalStorage error:', e);
    return defaultValue;
  }
}

function setLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('LocalStorage save error:', e);
  }
}

// Map seed persons to full Person objects
function initializeLocalPersons(): Person[] {
  const seedPersons: Person[] = PERSONS_SEED.map(p => ({
    id: p.legacy_id,
    legacy_id: p.legacy_id,
    full_name: p.full_name,
    first_name: p.first_name,
    father_id: p.parent_legacy_id || null,
    mother_id: null,
    gender: 'male',
    branch_id: p.branch_code,
    branch_name: p.branch_name,
    generation: p.generation,
    birth_date: null,
    death_date: null,
    is_deceased: p.is_deceased,
    residence: p.residence,
    occupation: p.occupation,
    education: '',
    bio: p.bio,
    achievements: '',
    verification_status: p.verification_status,
    children_count: p.children_count,
    created_at: new Date().toISOString()
  }));

  return seedPersons;
}

// Initial demo contributions to showcase review panel immediately
function initializeDemoContributions(): ContributionRequest[] {
  return [
    {
      id: 'req-demo-1',
      reference_no: 'RADY-REQ-2026-1042',
      contribution_type: 'edit_person',
      target_person_id: 'l83lnvs',
      contributor_name: 'أحمد علي راضي',
      contributor_phone: '01099887766',
      status: 'pending',
      details: 'إضافة تفاصيل عن دور الشيخ عبدالصمد في مشيخة البلد خلال القرن التاسع عشر وتاريخ وفاته التقريبي.',
      current_data_snapshot: {
        first_name: 'عبدالصمد',
        occupation: 'عمودية ومشيخة وتجارة',
        bio: 'من أبناء عائلة آل راضي بقرية شارونة، عبدالصمد بن راضي.'
      },
      proposed_data: {
        occupation: 'عمدة وشيخ البلد وتجارة أراضي',
        bio: 'تولى الشيخ عبدالصمد مشيخة البلد بقرية شارونة وكان صاحب ديوان عامر ومقصدًا لحل النزاعات وإصلاح ذات البين.',
        birth_date: 'حوالي ١٨٣٠م',
        death_date: 'حوالي ١٩٠٥م'
      },
      created_at: new Date(Date.now() - 3600000 * 4).toISOString()
    },
    {
      id: 'req-demo-2',
      reference_no: 'RADY-REQ-2026-1043',
      contribution_type: 'add_story',
      target_person_id: 'm6mmhgl',
      contributor_name: 'محمود حسن راضي',
      contributor_phone: '01122334455',
      status: 'pending',
      details: 'قصة مشاركة أفراد العائلة في أعمال حفر وتوسيع الري والزراعة في شرق النيل بشارونة.',
      proposed_data: {
        title: 'ديوان آل راضي وعمارة شارونة',
        content: 'كان ديوان العائلة ملتقى لأهل القرية والقرى المجاورة، حيث تم توثيق عقود الزراعة وحل المسائل العرفية على مدى أجيال.'
      },
      created_at: new Date(Date.now() - 3600000 * 2).toISOString()
    }
  ];
}

class FamilyService {
  private persons: Person[] = [];
  private branches: FamilyBranch[] = [];
  private contributions: ContributionRequest[] = [];
  private stories: Story[] = [];
  private memories: Memory[] = [];
  private documents: HistoricalDocument[] = [];
  private posts: FamilyPost[] = [];
  private revisions: PersonRevision[] = [];
  private activityLogs: ActivityLog[] = [];
  private relationships: FamilyRelationship[] = [];

  constructor() {
    this.initStore();
  }

  private initStore() {
    this.branches = getLocal('branches', BRANCHES_SEED.map(b => ({
      id: b.code,
      code: b.code,
      name: b.name,
      description: b.description,
      color: b.color,
      sort_order: 1,
      root_person_id: b.rootNodeId
    })));

    this.persons = getLocal('persons', initializeLocalPersons());
    this.contributions = getLocal('contributions', initializeDemoContributions());
    this.posts = getLocal('posts', INITIAL_POSTS_SEED);
    this.documents = getLocal('documents', HISTORICAL_DOCS_SEED);
    this.stories = getLocal('stories', [
      {
        id: 'story-1',
        title: 'استقرار آل راضي في شارونة والمشيخة',
        content: 'تنتمي عائلة آل راضي إلى أصول قبائل عربية عريقة ارتحلت واستقرت في صعيد مصر بقرية شارونة في أواخر القرن الثامن عشر الميلادي. اشتهر أبناء راضي بالحكمة والشجاعة، وتولوا العمودية والمشيخة وأسسوا ديوان العائلة الذي ظل رمزا للضيافة والوحدة.',
        author_name: 'رواية الأجداد المتواترة',
        period: 'أواخر القرن الثامن عشر',
        cover_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
        is_published: true,
        created_at: new Date().toISOString()
      }
    ]);
    this.memories = getLocal('memories', [
      {
        id: 'mem-1',
        person_id: 'm6mmhgl',
        contributor_name: 'أحد أحفاد علي راضي',
        relationship_to_person: 'حفيد',
        content: 'كان رحمه الله يحثنا دائمًا على الاجتماع وصلة الرحم والتمسك بالأصل الطيب ومساعدة المحتاجين.',
        is_published: true,
        created_at: new Date().toISOString()
      }
    ]);
    this.revisions = getLocal('revisions', []);
    this.activityLogs = getLocal('activity_logs', [
      {
        id: 'log-init',
        action_type: 'create',
        entity_type: 'person',
        entity_id: 'w5n4zuk',
        performed_by: 'النظام المركزي',
        details: { message: 'تهيئة شجرة العائلة وسجل الأنساب الأولي ٧٣ فرداً' },
        created_at: new Date().toISOString()
      }
    ]);
    this.relationships = getLocal('relationships', []);
  }

  private saveAllLocal() {
    setLocal('persons', this.persons);
    setLocal('branches', this.branches);
    setLocal('contributions', this.contributions);
    setLocal('posts', this.posts);
    setLocal('documents', this.documents);
    setLocal('stories', this.stories);
    setLocal('memories', this.memories);
    setLocal('revisions', this.revisions);
    setLocal('activity_logs', this.activityLogs);
    setLocal('relationships', this.relationships);
  }

  // --- QUERY APIS ---

  async getPersons(): Promise<Person[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('persons').select('*').order('generation', { ascending: true });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase query failed, falling back to local store:', err);
      }
    }
    return this.persons;
  }

  async getPersonById(id: string): Promise<Person | null> {
    const list = await this.getPersons();
    return list.find(p => p.id === id || p.legacy_id === id) || null;
  }

  async getBranches(): Promise<FamilyBranch[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('family_branches').select('*');
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase query failed:', err);
      }
    }
    return this.branches;
  }

  async getDeceasedPersons(): Promise<Person[]> {
    const list = await this.getPersons();
    return list.filter(p => p.is_deceased);
  }

  async getStories(): Promise<Story[]> {
    return this.stories.filter(s => s.is_published);
  }

  async getMemories(personId?: string): Promise<Memory[]> {
    if (personId) {
      return this.memories.filter(m => m.person_id === personId && m.is_published);
    }
    return this.memories.filter(m => m.is_published);
  }

  async getDocuments(): Promise<HistoricalDocument[]> {
    return this.documents.filter(d => d.is_verified);
  }

  async getPosts(): Promise<FamilyPost[]> {
    return this.posts.filter(p => p.is_published);
  }

  async getActivityLogs(): Promise<ActivityLog[]> {
    return this.activityLogs.slice().reverse();
  }

  async getPersonRevisions(personId: string): Promise<PersonRevision[]> {
    return this.revisions.filter(r => r.person_id === personId).reverse();
  }

  // --- CONTRIBUTIONS SYSTEM ---

  generateReferenceNumber(): string {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `RADY-REQ-${year}-${random}`;
  }

  async submitContribution(data: {
    contribution_type: ContributionType;
    target_person_id?: string | null;
    contributor_name: string;
    contributor_phone?: string;
    details: string;
    proposed_data?: Record<string, any>;
    attachments?: Array<{ file_name: string; file_url: string; file_type: string; file_size?: number }>;
  }): Promise<{ ok: boolean; reference_no: string; message: string }> {
    const reference_no = this.generateReferenceNumber();
    const id = 'req-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6);

    let currentSnapshot: Record<string, any> | undefined;
    if (data.target_person_id) {
      const target = await this.getPersonById(data.target_person_id);
      if (target) {
        currentSnapshot = { ...target };
      }
    }

    const newRequest: ContributionRequest = {
      id,
      reference_no,
      contribution_type: data.contribution_type,
      target_person_id: data.target_person_id || null,
      contributor_name: data.contributor_name,
      contributor_phone: data.contributor_phone || '',
      status: 'pending',
      details: data.details,
      proposed_data: data.proposed_data,
      current_data_snapshot: currentSnapshot,
      created_at: new Date().toISOString(),
      attachments: data.attachments?.map((a, i) => ({
        id: `att-${id}-${i}`,
        contribution_id: id,
        file_url: a.file_url,
        file_name: a.file_name,
        file_type: a.file_type,
        file_size: a.file_size || 0,
        is_approved: false,
        created_at: new Date().toISOString()
      }))
    };

    // If Supabase is available, insert into Supabase
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('contribution_requests').insert({
          reference_no: newRequest.reference_no,
          contribution_type: newRequest.contribution_type,
          target_person_id: newRequest.target_person_id,
          contributor_name: newRequest.contributor_name,
          contributor_phone: newRequest.contributor_phone,
          status: 'pending',
          details: newRequest.details,
          proposed_data: newRequest.proposed_data,
          current_data_snapshot: newRequest.current_data_snapshot
        });
      } catch (err) {
        console.warn('Supabase contribution insert error:', err);
      }
    }

    // Always maintain local reactive store
    this.contributions.unshift(newRequest);
    this.saveAllLocal();

    return {
      ok: true,
      reference_no,
      message: 'تم استلام مساهمتك الكريمة بنجاح، وستتم مراجعتها من قِبل إدارة المنصة قبل النشر.'
    };
  }

  async getContributionByReference(refNo: string): Promise<ContributionRequest | null> {
    const cleanRef = refNo.trim().toUpperCase();
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('contribution_requests').select('*').eq('reference_no', cleanRef).single();
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase query error:', err);
      }
    }
    return this.contributions.find(c => c.reference_no.toUpperCase() === cleanRef) || null;
  }

  async getAllContributions(): Promise<ContributionRequest[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('contribution_requests').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase query error:', err);
      }
    }
    return this.contributions;
  }

  // --- ADMIN APPROVAL & REVISION WORKFLOW ---

  async updateContributionStatus(id: string, status: ContributionStatus, admin_notes?: string): Promise<boolean> {
    const req = this.contributions.find(c => c.id === id);
    if (!req) return false;

    req.status = status;
    if (admin_notes !== undefined) req.admin_notes = admin_notes;
    req.reviewed_at = new Date().toISOString();
    req.reviewed_by = 'المهندس راضي أحمد (الأدمن)';

    this.activityLogs.push({
      id: 'log-' + Date.now(),
      action_type: status === 'approved' ? 'approve_contribution' : 'update',
      entity_type: 'contribution',
      entity_id: req.reference_no,
      performed_by: 'الأدمن',
      details: { status, admin_notes },
      created_at: new Date().toISOString()
    });

    this.saveAllLocal();
    return true;
  }

  async approveContribution(id: string, customApprovedData?: Record<string, any>): Promise<{ ok: boolean; message: string }> {
    const req = this.contributions.find(c => c.id === id);
    if (!req) return { ok: false, message: 'الطلب غير موجود' };

    const dataToApply = customApprovedData || req.proposed_data || {};

    // 1. If modifying an existing person
    if (req.target_person_id && (req.contribution_type === 'edit_person' || req.contribution_type === 'correction')) {
      const target = this.persons.find(p => p.id === req.target_person_id || p.legacy_id === req.target_person_id);
      if (target) {
        // Save current state for rollback
        this.revisions.push({
          id: 'rev-' + Date.now(),
          person_id: target.id,
          revision_data: { ...target },
          reason: `موافقة على طلب المساهمة ${req.reference_no}`,
          created_by: 'الأدمن',
          created_at: new Date().toISOString()
        });

        // Apply fields safely
        if (dataToApply.full_name) target.full_name = dataToApply.full_name;
        if (dataToApply.first_name) target.first_name = dataToApply.first_name;
        if (dataToApply.birth_date !== undefined) target.birth_date = dataToApply.birth_date;
        if (dataToApply.death_date !== undefined) target.death_date = dataToApply.death_date;
        if (dataToApply.is_deceased !== undefined) target.is_deceased = Boolean(dataToApply.is_deceased);
        if (dataToApply.residence) target.residence = dataToApply.residence;
        if (dataToApply.occupation) target.occupation = dataToApply.occupation;
        if (dataToApply.bio) target.bio = dataToApply.bio;
        if (dataToApply.avatar_url) target.avatar_url = dataToApply.avatar_url;
        target.updated_at = new Date().toISOString();
      }
    }

    // 2. If adding a new person
    if (req.contribution_type === 'new_person') {
      const fatherId = dataToApply.father_id || null;
      let fatherGen = 1;
      let fatherBranch = 'الأصل المؤسس';
      let branchCode = 'root';

      if (fatherId) {
        const father = this.persons.find(p => p.id === fatherId || p.legacy_id === fatherId);
        if (father) {
          fatherGen = father.generation;
          fatherBranch = father.branch_name || 'الأصل المؤسس';
          branchCode = father.branch_id || 'root';
        }
      }

      const newId = 'person-' + Date.now().toString(36);
      const newPerson: Person = {
        id: newId,
        legacy_id: newId,
        first_name: dataToApply.first_name || 'فرد جديد',
        full_name: dataToApply.full_name || `${dataToApply.first_name || 'فرد'} بن آل راضي`,
        father_id: fatherId,
        mother_id: dataToApply.mother_id || null,
        gender: dataToApply.gender || 'male',
        branch_id: branchCode,
        branch_name: fatherBranch,
        generation: fatherGen + 1,
        birth_date: dataToApply.birth_date || null,
        death_date: dataToApply.death_date || null,
        is_deceased: Boolean(dataToApply.is_deceased),
        residence: dataToApply.residence || 'شارونة، المنيا',
        occupation: dataToApply.occupation || '',
        education: dataToApply.education || '',
        bio: dataToApply.bio || '',
        verification_status: 'verified',
        created_at: new Date().toISOString()
      };

      this.persons.push(newPerson);
    }

    // 3. If adding a story
    if (req.contribution_type === 'add_story') {
      this.stories.push({
        id: 'story-' + Date.now(),
        title: dataToApply.title || 'قصة عائلية موثقة',
        content: dataToApply.content || req.details,
        person_id: req.target_person_id || undefined,
        author_name: req.contributor_name,
        period: dataToApply.period || 'ذكريات الأجيال',
        is_published: true,
        created_at: new Date().toISOString()
      });
    }

    // 4. If adding a memory
    if (req.contribution_type === 'add_memory' && req.target_person_id) {
      this.memories.push({
        id: 'mem-' + Date.now(),
        person_id: req.target_person_id,
        contributor_name: req.contributor_name,
        relationship_to_person: dataToApply.relationship_to_person || 'من أبناء العائلة',
        content: dataToApply.content || req.details,
        is_published: true,
        created_at: new Date().toISOString()
      });
    }

    // Mark contribution as approved
    req.status = 'approved';
    req.reviewed_at = new Date().toISOString();
    req.reviewed_by = 'المهندس راضي أحمد (الأدمن)';

    this.activityLogs.push({
      id: 'log-' + Date.now(),
      action_type: 'approve_contribution',
      entity_type: 'contribution',
      entity_id: req.reference_no,
      performed_by: 'الأدمن',
      details: { appliedData: dataToApply },
      created_at: new Date().toISOString()
    });

    this.saveAllLocal();
    return { ok: true, message: 'تم اعتماد ونشر التعديل بنجاح وأصبح متاحًا لجميع الزوار فورًا.' };
  }

  async rejectContribution(id: string, reason: string): Promise<{ ok: boolean; message: string }> {
    const req = this.contributions.find(c => c.id === id);
    if (!req) return { ok: false, message: 'الطلب غير موجود' };

    req.status = 'rejected';
    req.admin_notes = reason;
    req.reviewed_at = new Date().toISOString();
    req.reviewed_by = 'المهندس راضي أحمد (الأدمن)';

    this.activityLogs.push({
      id: 'log-' + Date.now(),
      action_type: 'reject_contribution',
      entity_type: 'contribution',
      entity_id: req.reference_no,
      performed_by: 'الأدمن',
      details: { reason },
      created_at: new Date().toISOString()
    });

    this.saveAllLocal();
    return { ok: true, message: 'تم رفض الطلب وحفظ سبب الرفض دون المساس بأي بيانات منشورة.' };
  }

  async rollbackRevision(revisionId: string): Promise<{ ok: boolean; message: string }> {
    const rev = this.revisions.find(r => r.id === revisionId);
    if (!rev) return { ok: false, message: 'سجل التراجع غير موجود' };

    const target = this.persons.find(p => p.id === rev.person_id);
    if (!target) return { ok: false, message: 'الفرد غير موجود' };

    // Restore data
    Object.assign(target, rev.revision_data);
    target.updated_at = new Date().toISOString();

    this.activityLogs.push({
      id: 'log-' + Date.now(),
      action_type: 'rollback',
      entity_type: 'person',
      entity_id: target.id,
      performed_by: 'الأدمن',
      details: { restoredRevisionId: revisionId },
      created_at: new Date().toISOString()
    });

    this.saveAllLocal();
    return { ok: true, message: `تم استرجاع النسخة السابقة للفرد (${target.full_name}) بنجاح.` };
  }

  // Direct Admin Actions
  async addPersonDirect(personData: Partial<Person>): Promise<Person> {
    const newId = 'person-' + Date.now().toString(36);
    const newPerson: Person = {
      id: newId,
      legacy_id: newId,
      first_name: personData.first_name || '',
      full_name: personData.full_name || personData.first_name || '',
      father_id: personData.father_id || null,
      mother_id: personData.mother_id || null,
      gender: personData.gender || 'male',
      branch_id: personData.branch_id || 'root',
      branch_name: personData.branch_name || 'الأصل المؤسس',
      generation: personData.generation || 1,
      birth_date: personData.birth_date || null,
      death_date: personData.death_date || null,
      is_deceased: Boolean(personData.is_deceased),
      residence: personData.residence || 'شارونة، المنيا',
      occupation: personData.occupation || '',
      education: personData.education || '',
      bio: personData.bio || '',
      verification_status: 'verified',
      created_at: new Date().toISOString()
    };

    this.persons.push(newPerson);
    this.activityLogs.push({
      id: 'log-' + Date.now(),
      action_type: 'create',
      entity_type: 'person',
      entity_id: newId,
      performed_by: 'الأدمن (مباشر)',
      details: { name: newPerson.full_name },
      created_at: new Date().toISOString()
    });

    this.saveAllLocal();
    return newPerson;
  }

  async updatePersonDirect(id: string, updates: Partial<Person>): Promise<boolean> {
    const person = this.persons.find(p => p.id === id || p.legacy_id === id);
    if (!person) return false;

    // Save revision before modifying
    this.revisions.push({
      id: 'rev-' + Date.now(),
      person_id: person.id,
      revision_data: { ...person },
      reason: 'تعديل مباشر من لوحة الإدارة',
      created_by: 'الأدمن',
      created_at: new Date().toISOString()
    });

    Object.assign(person, updates);
    person.updated_at = new Date().toISOString();

    this.activityLogs.push({
      id: 'log-' + Date.now(),
      action_type: 'update',
      entity_type: 'person',
      entity_id: person.id,
      performed_by: 'الأدمن (مباشر)',
      details: { updates },
      created_at: new Date().toISOString()
    });

    this.saveAllLocal();
    return true;
  }
}

export const familyService = new FamilyService();
