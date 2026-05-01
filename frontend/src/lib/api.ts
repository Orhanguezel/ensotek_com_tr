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
  images?: string[] | null;
  alt?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  category_id?: string | null;
  item_type?: string | null;
  is_active: boolean;
  sort_order?: number;
  tags?: string | null;
  product_code?: string | null;
  specifications?: Record<string, string> | null;
  meta_title?: string | null;
  meta_description?: string | null;
  locale?: string;
  created_at?: string;
  updated_at?: string;
}

export interface GalleryImage {
  id: string;
  url?: string;
  image_url?: string | null;
  storage_asset_id?: string | null;
  alt?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  sort_order?: number;
  display_order?: number;
  is_cover?: boolean | number;
}

export interface Gallery {
  id: string;
  module_key?: string;
  title: string;
  slug: string;
  description?: string | null;
  summary?: string | null;
  content?: string | null;
  cover_url?: string | null;
  cover_image_url?: string | null;
  image_count?: number;
  alt?: string | null;
  caption?: string | null;
  is_active: boolean;
  is_featured?: boolean | number;
  display_order?: number;
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
  featured_image?: string | null;
  featured_image_url?: string | null;
  featured_image_alt?: string | null;
  alt?: string | null;
  caption?: string | null;
  client_name?: string | null;
  website_url?: string | null;
  location?: string | null;
  year?: number | null;
  is_published?: boolean | number;
  is_active?: boolean;
  is_featured?: boolean | number;
  locale?: string;
  images?: ReferenceImage[];
  meta_title?: string | null;
  meta_description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CustomPage {
  id: string;
  module_key: string;
  is_published: number | boolean;
  display_order?: number;
  featured_image?: string | null;
  image_url?: string | null;
  storage_asset_id?: string | null;
  images?: string[] | string | null;
  storage_image_ids?: string[] | null;
  locale?: string;
  title: string;
  slug: string;
  content?: { html?: string } | string | null;
  summary?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface BlogPost {
  id: string;
  module_key: string;
  title: string;
  slug: string;
  summary?: string | null;
  content?: string | null;
  featured_image?: string | null;
  featured_image_alt?: string | null;
  image_url?: string | null;
  images?: string[] | string | null;
  is_published: boolean | number;
  display_order?: number;
  meta_title?: string | null;
  meta_description?: string | null;
  tags?: string | null;
  locale?: string;
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
  phone_is_whatsapp?: boolean;
  phone_2_is_whatsapp?: boolean;
  email?: string;
  email_2?: string;
  address?: string;
  address_label?: string;
  factory_address?: string;
  factory_label?: string;
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
  image_url?: string;
  storage_asset_id?: string;
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

export interface Review {
  id: string;
  target_type: string;
  target_id: string;
  name: string;
  email?: string;
  rating: number;
  role?: string | null;
  company?: string | null;
  avatar_url?: string | null;
  logo_url?: string | null;
  profile_href?: string | null;
  is_active: boolean;
  is_approved: boolean;
  display_order: number;
  submitted_locale?: string;
  title?: string | null;
  comment?: string | null;
  admin_reply?: string | null;
}

export interface FaqItem {
  question: string;
  answer: string;
}
