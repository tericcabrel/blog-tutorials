import { useMutation } from 'react-query';
import { httpClient } from "../utils/http-client";

type SubscribeInput = {
  email: string;
};

type SubscribeData = {
  subscription: {
    id: number;
    state: string;
    created_at: string;
    source: string | null;
    referrer: string | null;
    subscribable_id: number;
    subscribable_type: string;
    subscriber: {
      id: number;
    };
  };
};

export const useSubscribe = (formId: string) => {
  return useMutation((input: SubscribeInput) => {
    const inputBody = {
      ...input,
      api_key: process.env.REACT_APP_CONVERTKIT_API_KEY,
    };

    return httpClient.post<SubscribeData>(`forms/${formId}/subscribe`, inputBody);
  });
};