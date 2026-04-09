import api from '@/lib/axios';
import type { ContactPayload } from '@/lib/api';

export const contactService = {
  submit: async (payload: ContactPayload) =>
    api.post('/contact', payload),
};
