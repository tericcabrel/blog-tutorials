import { z } from 'zod';
import { isAxiosError } from "axios";

import { httpClient } from "../utils/http-client";

const userResponseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
});

export type User = z.infer<typeof userResponseSchema>;

export const findUser = async (userId: string): Promise<User | null> => {
  try {
    const response = await httpClient.get(`/users/${userId}`);

    return userResponseSchema.parse(response.data);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Failed to retrieve user', error.response?.data);
    }

    if (error instanceof z.ZodError) {
      console.error('Failed to parse user response', error.errors);
    }

    console.error('Unknown error', error);
  }

  return null;
}