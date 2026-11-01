// Database & Entity Types for AL RADY FAMILY LEGACY

export type VerificationStatus = 'verified' | 'crowdsourced' | 'needs_review' | 'disputed';
export type Gender = 'male' | 'female';
export type RelationshipType = 'spouse' | 'parent_child' | 'sibling' | 'guardian';

export type ContributionType = 
  | 'new_person'
  | 'edit_person'
  | 'correction'
  | 'add_relative'
  | 'correct_relationship'
  | 'upload_photo'
  | 'add_story'
  | 'add_memory'
  | 'historical_info'
  | 'upload_document'
  | 'correct_branch';

export type ContributionStatus = 
  | 'pending'
  | 'under_review'
  | 'needs_information'
  | 'approved'
  | 'rejected';

export interface Person {
  id: string;
  legacy_id?: string;
  full_name: string;
  first_name: string;
  father_id?: string | null;
  mother_id?: string | null;
  gender: Gender;
  branch_id?: string | null;
  branch_name?: string;
  generation: number;
  birth_date?: string | null;
  death_date?: string | null;
  is_deceased: boolean;
  residence?: string;
  occupation?: string;
  education?: string;
  phone?: string; // Private
  bio?: string;
  achievements?: string;
  avatar_url?: string;
  verification_status: VerificationStatus;
  children_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface FamilyBranch {
  id: string;
  code: string;
  name: string;
  description?: string;
  color?: string;
  sort_order?: number;
  root_person_id?: string;
}

export interface FamilyRelationship {
  id: string;
  person1_id: string;
  person2_id: string;
  relationship_type: RelationshipType;
  notes?: string;
  is_active: boolean;
  created_at?: string;
}

export interface ContributionRequest {
  id: string;
  reference_no: string;
  contribution_type: ContributionType;
  target_person_id?: string | null;
  contributor_name: string;
  contributor_phone?: string;
  status: ContributionStatus;
  details: string;
  proposed_data?: Record<string, any>;
  current_data_snapshot?: Record<string, any>;
  admin_notes?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
  updated_at?: string;
  attachments?: ContributionAttachment[];
}

export interface ContributionAttachment {
  id: string;
  contribution_id: string;
  file_url: string;
  file_name: string;
  file_type: string;
  file_size?: number;
  is_approved: boolean;
  created_at?: string;
}

export interface PersonPhoto {
  id: string;
  person_id: string;
  photo_url: string;
  caption?: string;
  date_taken?: string;
  is_primary?: boolean;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  person_id?: string;
  author_name?: string;
  period?: string;
  cover_image?: string;
  is_published: boolean;
  created_at?: string;
}

export interface Memory {
  id: string;
  person_id: string;
  contributor_name: string;
  relationship_to_person?: string;
  content: string;
  is_published: boolean;
  created_at?: string;
}

export interface HistoricalDocument {
  id: string;
  title: string;
  document_type: 'deed' | 'certificate' | 'letter' | 'manuscript' | 'census' | 'document';
  year?: string;
  description?: string;
  file_url: string;
  related_person_id?: string;
  is_verified: boolean;
  created_at?: string;
}

export interface FamilyPost {
  id: string;
  title: string;
  content: string;
  category: 'news' | 'occasion' | 'congratulations' | 'gathering';
  event_date?: string;
  image_url?: string;
  author_name?: string;
  is_published: boolean;
  created_at?: string;
}

export interface Achievement {
  id: string;
  person_id: string;
  title: string;
  field?: string;
  year?: string;
  description?: string;
  badge_icon?: string;
}

export interface ActivityLog {
  id: string;
  action_type: 'create' | 'update' | 'delete' | 'approve_contribution' | 'reject_contribution' | 'rollback';
  entity_type: 'person' | 'relationship' | 'contribution' | 'post' | 'document';
  entity_id?: string;
  performed_by: string;
  details?: Record<string, any>;
  created_at: string;
}

export interface PersonRevision {
  id: string;
  person_id: string;
  revision_data: Record<string, any>;
  reason?: string;
  created_by: string;
  created_at: string;
}
