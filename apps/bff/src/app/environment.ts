export interface Environment {
  port: number;
  coreApiUrl: string;
}

export const loadEnvironment = (): Environment => ({
  port: parseInt(process.env.BFF_PORT, 10),
  coreApiUrl: process.env.CORE_API_URL,
});
