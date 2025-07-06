// apps/api-server/src/services/external-api.ts
import { getToday, getTomorrow } from '@citydance/utils';

export class ExternalApiService {
  private baseUrl = process.env.API_BASE_URL;
  private apiUser = process.env.API_USER; // Secret - only on server
  private apiKey = process.env.API_KEY;   // Secret - only on server

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