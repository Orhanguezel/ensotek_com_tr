import { z } from 'zod';

export const offerFormSchema = z.object({
  customer_name: z.string().min(2).max(255),
  company_name: z.string().max(255).optional(),
  email: z.string().email().max(255),
  phone: z.string().max(50).optional(),
  country_code: z.string().max(80).optional(),
  subject: z.string().max(255).optional(),
  message: z.string().min(10),
  consent_terms: z.boolean().refine((value) => value, 'required'),
  consent_marketing: z.boolean().optional(),
});

export type OfferFormValues = z.infer<typeof offerFormSchema>;
