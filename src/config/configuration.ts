export const RequiredEnvVars = [
  'SERVER_PORT',
  'SERVER_HOST',
  'DATABASE_URL',
  'EXCHANGE_API_URL',
];

interface Configuration {
  server: {
    port: number;
  };
  database: {
    url: string;
  };
}

const DEFAULT_SERVER_PORT = 3000;

export const configuration = (): Configuration => {
  const defaultConfiguration = {
    server: {
      port:
        parseInt(process.env.SERVER_PORT as string, 10) || DEFAULT_SERVER_PORT,
      host: process.env.SERVER_HOST,
    },
    database: {
      url: process.env.DATABASE_URL,
    },
    exchangeApi: {
      url: process.env.EXCHANGE_API_URL,
    },
  };

  return defaultConfiguration;
};

export const validateEnvironmentVars = (): void => {
  if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = 'development';
  }

  RequiredEnvVars.forEach((v) => {
    if (!process.env[v]) throw Error(`Missing required env variable ${v}`);
  });
};
