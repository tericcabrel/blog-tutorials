export type EnvironmentVariables = {
  STAGE: string;
  DATABASE_URL: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {}
  }
}

export {};
