export type EnvironmentVariables = {
  PROXY_HOST: string;
  PROXY_PORT: string;
  PROXY_USERNAME: string;
  PROXY_PASSWORD: string;
  NODE_TLS_REJECT_UNAUTHORIZED: number;
};

declare global {
  namespace NodeJS {
    type ProcessEnv = EnvironmentVariables;
  }
}

export {};
