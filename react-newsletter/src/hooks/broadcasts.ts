import { useQuery } from "react-query";
import { httpClient } from "../utils/http-client";

type BroadcastsData= {
  broadcasts: Array<{
    "id": number;
    "created_at": string;
    "subject": string;
  }>;
};

export const useBroadcasts = () => {
  const queryString = [
    `api_secret=${process.env.REACT_APP_CONVERTKIT_API_SECRET}`,
  ];

  return useQuery(
      `broadcasts-${queryString}`,
      async () => {
        const response = await httpClient.get<BroadcastsData>(`broadcasts?${queryString}`);

        return response.data;
      }
  );
};