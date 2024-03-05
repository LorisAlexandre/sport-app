declare namespace NodeJS {
  interface ProcessEnv {
    AUTH_GOOGLE_ID: string;
    AUTH_GOOGLE_SECRET: string;
    AUTH_SECRET: string;

    DB_URI: string;

    SMTP_USER: string;
    SMTP_PASSWORD: string;
    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_FROM: string;

    STRIPE_SECRET_KEY: string;

    SERV_URL: string;
  }
}
