import { z } from 'zod'

const environmentVariablesSchema = z.object({
  COUNTRY: z.enum(['FR', 'EN', 'ES', 'DE']),
  PORT: z.preprocess((value) => Number(value), z.number())
    .refine((value) => value >= 1 && value <= 65_535, 'Must be between 1 and 65535'),
});

export type EnvironmentVariables = z.infer<typeof environmentVariablesSchema>

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {}
  }
}

export const validateEnvironmentVariables = () => {
  const result = environmentVariablesSchema.safeParse(process.env);

  if (!result.success) {
    const errors = result.error.errors.reduce((acc, error) => {
      const key = Array.isArray(error.path) ? error.path.join('.') : error.path;

      return Object.assign({ [key]: error.message }, acc);
    }, {});

    throw new Error(`Invalid environment variables: \n${JSON.stringify(errors, null, 2)}`);
  }
};
