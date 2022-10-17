declare global {
    namespace NodeJS {
      interface ProcessEnv {
        GITHUB_AUTH_TOKEN: string;
        GOOGLE_MAPS_API_KEY: string;
        PORT?: string;
        PWD: string;
      }
    }
  }
  
  export {}