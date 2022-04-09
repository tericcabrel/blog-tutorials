import { useQuery } from "react-query";
import { httpClient } from "../utils/http-client";

type AccountInfoData= {
  name: string;
  plan_type: string;
  primary_email_address: string;
};

export const useAccountInfo = () => {
  const queryString = [
    `api_secret=${process.env.REACT_APP_CONVERTKIT_API_SECRET}`,
  ];

  return useQuery(
      `accountInfo-${queryString}`,
      async () => {
        const response = await httpClient.get<AccountInfoData>(`account?${queryString}`);

        return response.data;
      }
  );
};