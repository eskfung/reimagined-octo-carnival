export const fetchFromEnv = (key: string): string => process.env[key] ?? '';
