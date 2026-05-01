// Backend: reviews + review_i18n (polymorphic target)

export interface Review {
  id: string;
  target_type: string; // 'product' | 'service' | 'general' etc.
  target_id: string;
  name: string;
  email: string;
  rating: number; // 1-5
  role?: string | null;
  company?: string | null;
  avatar_url?: string | null;
  logo_url?: string | null;
  profile_href?: string | null;
  is_active: boolean;
  is_approved: boolean;
  display_order: number;
  likes_count: number;
  dislikes_count: number;
  helpful_count: number;
  submitted_locale: string;
  // i18n (coalesced by backend)
  title: string | null;
  comment: string;
  admin_reply: string | null;
  locale: string;
  created_at: string;
  updated_at: string;
}

export interface CreateReviewRequest {
  target_type: string;
  target_id: string;
  name: string;
  email: string;
  rating: number;
  title?: string;
  comment: string;
  role?: string;
  company?: string;
  avatar_url?: string;
  logo_url?: string;
  profile_href?: string;
  is_active?: boolean;
  is_approved?: boolean;
  display_order?: number;
}

export type ReactionType = 'like' | 'dislike' | 'helpful';

export interface ReviewListParams {
  language?: string;
  target_type?: string;
  target_id?: string;
  is_active?: boolean;
  is_approved?: boolean;
  minRating?: number;
  maxRating?: number;
  orderBy?: 'created_at' | 'updated_at' | 'display_order' | 'rating' | 'name';
  page?: number;
  limit?: number;
}
