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
    STRIPE_PRODUCT_ID: string;
    STRIPE_PROMO_ID: string;

    SERV_URL: string;

    CRON_SECRET: string;

    CLOUD_NAME: string;
    API_KEY_CLOUD: string;
    API_SECRET_CLOUD: string;
  }
}
