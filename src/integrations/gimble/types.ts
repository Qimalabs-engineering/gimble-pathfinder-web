/**
 * Shapes returned by the Gimble backend's /api/console endpoints.
 *
 * Hand-written rather than generated: the backend has ~95 Sequelize models and
 * the console touches a handful, so a codegen step would import far more than
 * it explains. These describe the console's own contract.
 */

export interface ListMeta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface ListResponse<T> {
  data: T[];
  meta: ListMeta;
}

export interface SingleResponse<T> {
  data: T;
}

export interface AdminSession {
  user: {
    hash_id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    user_type: 'admin';
  };
  roles: string[];
  /** Merged permission map. `all_data: true` means super_admin. */
  permissions: Record<string, PermissionValue>;
}

export interface ConsoleRole {
  name: string;
  display_name: string;
  description: string | null;
  /** `{ all_data: true }` for super_admin; otherwise resource → actions. */
  permissions: Record<string, PermissionValue>;
  is_system_role: boolean;
}

export interface AdminUser {
  hash_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  user_type: 'member' | 'facilitator' | 'admin';
  is_active: boolean;
  email_confirmed: boolean;
  last_login_at: string | null;
  created_at: string;
  roles: Array<{ name: string; display_name: string }>;
}

export interface MemberSummary {
  hash_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  is_active: boolean;
  timezone: string | null;
  last_activity_at: string | null;
  created_at: string;
  morning_checkin_enabled: boolean;
  push_notifications: boolean;
}

export type ContactStatus = 'new' | 'read' | 'replied' | 'spam' | 'archived';

export interface ContactSubmission {
  hash_id: string;
  name: string;
  email: string;
  organization: string | null;
  subject: string;
  message: string;
  status: ContactStatus;
  internal_note: string | null;
  handled_at: string | null;
  handled_by: { hash_id: string; email: string } | null;
  source: string;
  created_at: string;
}

export type SubscriberSource = 'newsletter' | 'community' | 'contact_form' | 'import';
export type SubscriberStatus = 'subscribed' | 'unsubscribed' | 'bounced' | 'complained';

export interface Subscriber {
  hash_id: string;
  email: string;
  source: SubscriberSource;
  status: SubscriberStatus;
  confirmed_at: string | null;
  unsubscribed_at: string | null;
  created_at: string;
}

/** Query shape shared by every console list endpoint. */
export interface ListParams {
  page?: number;
  limit?: number;
  q?: string;
  sort?: string;
}

export interface MemberStats {
  total: number;
  active: number;
  inactive: number;
  new_7d: number;
  new_30d: number;
  active_30d: number;
  checkin_enabled: number;
  push_enabled: number;
}

export interface EngagementSummary {
  assessments: number;
  journals: number;
  habits: number;
  goals: number;
  homework_assigned: number;
  homework_completed: number;
  check_ins: number;
  points_total: number;
  current_streak: number;
  longest_streak: number;
  last_assessment_at: string | null;
  latest_phq9: number | null;
  latest_gad7: number | null;
}

export interface TimelineEntry {
  kind: 'assessment' | 'journal' | 'check_in' | 'homework' | 'points' | 'goal';
  at: string;
  label: string;
  value: string | null;
}

/** Full member record. Fields beyond these exist but the console does not use them. */
export interface MemberDetail extends MemberSummary {
  phone_number: string | null;
  birthdate: string | null;
  gender: string | null;
  locale: string | null;
  invitation_status: string | null;
  wellness_coach_slug: string | null;
  morning_checkin_time: string | null;
  journey_session_enabled: boolean;
  journey_session_time: string | null;
  email_notifications: boolean;
  sms_notifications: boolean;
}

export interface MemberDetailResponse {
  member: MemberDetail;
  engagement: EngagementSummary;
  timeline: TimelineEntry[];
}

/**
 * A role's permission map, as stored in the `roles.permissions` JSONB column:
 * either a list of allowed actions, the string 'all', or the `all_data: true`
 * flag that short-circuits every check for super_admin.
 */
export type PermissionValue = string[] | string | boolean;

/** The dashboard's numbers, from GET /api/console/overview. */
export interface DashboardOverview {
  today: {
    active: number;
    active_yesterday: number;
    checkins_done: number;
    /** Members whose reminder actually fired — the honest denominator. */
    checkins_asked: number;
  };
  week: {
    active: number;
    active_previous: number;
    stickiness: number;
    dormant_30d: number;
  };
  journeys: {
    enrolled: number;
    in_progress: number;
    completed: number;
    stalled: number;
    top: Array<{ name: string; count: number }>;
  };
  attention: {
    flagged_assessments: number;
    stalled_journeys: number;
    unread_messages: number;
    unreachable_members: number;
  };
  base: { total: number; active: number; new_30d: number; reminders_on: number };
  /** Last 14 days, oldest first. */
  trend: Array<{ date: string; active: number }>;
}
