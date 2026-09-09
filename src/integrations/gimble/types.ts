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
    user_type: 'admin';
  };
  roles: string[];
  /** Merged permission map. `all_data: true` means super_admin. */
  permissions: Record<string, unknown>;
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
