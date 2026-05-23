import api from '@/lib/axios';
import type { OfferPayload, OfferResponse } from './offer.type';

export const offerService = {
  create: async (payload: OfferPayload) => {
    const res = await api.post<OfferResponse>('/offers', payload);
    return res.data;
  },
};
