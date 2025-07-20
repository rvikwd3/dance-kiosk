import { env } from './env.js';
import { AuthCredentials } from '@dance-kiosk/types';

export function validateBasicAuth(authHeader: string | null): boolean {
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return false;
  }

  const base64Credentials = authHeader.replace('Basic ', '');
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [userId, apiKey] = credentials.split(':');

  return userId === env.API_USER_ID && apiKey === env.API_KEY;
}

export function createBasicAuthHeader(userId: string, apiKey: string): string {
  const credentials = Buffer.from(`${userId}:${apiKey}`).toString('base64');
  return `Basic ${credentials}`;
}

export function createBasicAuthHeaderFromCredentials(credentials: AuthCredentials): string {
  return createBasicAuthHeader(credentials.username, credentials.password);
}