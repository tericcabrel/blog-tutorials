export type EnvironmentVariables = {
  CORE_SERVICE_API_URL: string;
  SMTP_HOST: string;
  SMTP_PORT: string;
  SMTP_USER: string;
  SMTP_PASSWORD: string;
  FROM_EMAIL: string;
  ORDER_EVENTS_TOPIC_ARN: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {}
  }
}

export {};
