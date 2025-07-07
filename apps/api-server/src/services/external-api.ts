// apps/api-server/src/services/external-api.ts
import { getToday, getTomorrow } from '@citydance/utils';
import { env } from '../env.js';

export class ExternalApiService {
  private baseUrl = env.API_BASE_URL;
  private apiUser = env.API_USER_ID; // Secret - only on server
  private apiKey = env.API_KEY;   // Secret - only on server

  async fetchClasses(minDate?: string, maxDate?: string) {
    // Create Basic auth header using API_USER:API_KEY format
    const credentials = `${this.apiUser}:${this.apiKey}`;
    const base64Credentials = Buffer.from(credentials).toString('base64');
    
    // Default to today and tomorrow if not provided
    const today = getToday();
    const tomorrow = getTomorrow();
    
    const queryParams = new URLSearchParams({
      minDate: minDate || today,
      maxDate: maxDate || tomorrow,
      timezone: 'America/Los_Angeles'
    });
    
    const response = await fetch(`${this.baseUrl}/availability/classes?${queryParams}`, {
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('External API request failed');
    }
    
    return response.json();
  }
}

export const externalApiService = new ExternalApiService();