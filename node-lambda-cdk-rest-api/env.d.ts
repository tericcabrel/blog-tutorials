export type EnvironmentVariables = {
  DATABASE_URL: string;
};

declare global {
  namespace NodeJS {
    // @ts-ignore
    type ProcessEnv = EnvironmentVariables;
  }
}

export {};
