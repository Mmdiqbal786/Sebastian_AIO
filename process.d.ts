declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_MONGO_URI: string;
    NEXT_MONGO_DB: string;
    NEXT_PUBLIC_COMPANY_NAME: string;
    NEXT_PUBLIC_COMPANY_LOGO_PATH: string;
    BASE_URL: string;
    LOG_LEVEL: string;
  }
}
