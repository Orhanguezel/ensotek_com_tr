import api from '@/lib/axios';
import type { ContactPayload } from '@/lib/api';

export const contactService = {
  submit: async (payload: ContactPayload) => {
    const response = await api.post('/contacts', payload, {
      headers: payload.locale ? { 'Accept-Language': payload.locale } : undefined,
    });
    if (!response.data?.id) throw new Error('Contact was not saved');
    return response.data;
  },
};
