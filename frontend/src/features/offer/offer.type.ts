export interface OfferPayload {
  locale?: string;
  source?: string;
  country_code?: string;
  customer_name: string;
  company_name?: string | null;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message?: string | null;
  product_id?: string | null;
  service_id?: string | null;
  form_data?: Record<string, unknown>;
  consent_marketing?: boolean;
  consent_terms?: boolean;
}

export interface OfferResponse extends OfferPayload {
  id: string;
  offer_no?: string | null;
  status?: string;
  created_at?: string;
}
