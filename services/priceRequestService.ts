import { CreatePriceRequestDTO } from '@/types/priceRequest';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  (typeof window !== 'undefined' ? `${window.location.origin}/api` : 'http://localhost:8000/api');

export const submitPriceRequest = async (payload: CreatePriceRequestDTO) => {
  const cleanBase = API_BASE.replace(/\/+$/, '');
  const url = cleanBase.endsWith('/api') ? `${cleanBase}/price-requests` : `${cleanBase}/api/price-requests`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    const error: any = new Error(data?.message || 'The given data was invalid.');
    error.response = {
      status: response.status,
      data
    };
    throw error;
  }

  return data;
};
