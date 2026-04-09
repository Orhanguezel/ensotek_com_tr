// API type contracts for Ensotek COM TR

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  alt?: string | null;
  parent_id?: string | null;
  is_active: boolean;
  sort_order?: number;
  locale?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  summary?: string | null;
  content?: string | null;
  image_url?: string | null;
  alt?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  category_id?: string | null;
  item_type?: string | null;
  is_active: boolean;
  sort_order?: number;
  tags?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  locale?: string;
  created_at?: string;
  updated_at?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  sort_order?: number;
}

export interface Gallery {
  id: string;
  title: string;
  slug: string;
  summary?: string | null;
  content?: string | null;
  cover_url?: string | null;
  alt?: string | null;
  caption?: string | null;
  is_active: boolean;
  locale?: string;
  images?: GalleryImage[];
  meta_title?: string | null;
  meta_description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ReferenceImage {
  id: string;
  url: string;
  alt?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  sort_order?: number;
}

export interface Reference {
  id: string;
  title: string;
  slug: string;
  summary?: string | null;
  content?: string | null;
  featured_image_url?: string | null;
  alt?: string | null;
  caption?: string | null;
  client_name?: string | null;
  location?: string | null;
  year?: number | null;
  is_active: boolean;
  locale?: string;
  images?: ReferenceImage[];
  meta_title?: string | null;
  meta_description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ContactPayload {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  locale?: string;
}

export interface ContactInfo {
  company_name?: string;
  phone?: string;
  phone_2?: string;
  email?: string;
  email_2?: string;
  address?: string;
  city?: string;
  country?: string;
  working_hours?: string;
  maps_lat?: string;
  maps_lng?: string;
}

export interface ApiListResponse<T> {
  items: T[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface HeroStats {
  years?: string;
  towers?: string;
  countries?: string;
}

export interface AboutContent {
  label?: string;
  title?: string;
  description?: string;
  feature1?: string;
  feature2?: string;
  feature3?: string;
  feature4?: string;
}

export interface GlobalReachStats {
  countries_count?: string;
  projects_value?: string;
  projects_label?: string;
  experience_value?: string;
  experience_label?: string;
  capacity_value?: string;
  capacity_label?: string;
}

export interface FeaturedTestimonial {
  quote?: string;
  author?: string;
  company?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
