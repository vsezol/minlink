export interface Environment {
  coreApiUrl: string;
}

export const loadEnvironment = (): Environment => ({
  coreApiUrl: process.env.CORE_API_URL,
});
