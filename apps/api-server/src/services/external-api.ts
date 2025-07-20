// apps/api-server/src/services/external-api.ts
import { getToday, getTomorrow } from '@citydance/utils';
import { env } from '../env.js';
import { GetClassesResponse, GetClassesParams, ApiErrorResponse } from '@dance-kiosk/types';

// Helper function to create URLSearchParams with optional values
function createSearchParams(params: Record<string, string | undefined>): URLSearchParams {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, value);
    }
  });
  return searchParams;
}

export class ExternalApiService {
  private baseUrl = env.API_BASE_URL;
  private apiUser = env.API_USER_ID;
  private apiKey = env.API_KEY;

  async fetchClasses(minDate?: string, maxDate?: string): Promise<GetClassesResponse> {
    // Create Basic auth header using API_USER:API_KEY format
    const credentials = `${this.apiUser}:${this.apiKey}`;
    const base64Credentials = Buffer.from(credentials).toString('base64');
    
    // Default to today and tomorrow if not provided
    const today = getToday();
    const tomorrow = getTomorrow();
    
    const params: GetClassesParams = {
      minDate: minDate || today,
      maxDate: maxDate || tomorrow,
      timezone: 'America/Los_Angeles'
    };
    
    const queryParams = createSearchParams({
      minDate: params.minDate,
      maxDate: params.maxDate,
      timezone: params.timezone
    });
    
    const response = await fetch(`${this.baseUrl}/availability/classes?${queryParams}`, {
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
      },
    });
    
    if (!response.ok) {
      const errorData: ApiErrorResponse = {
        error: 'External API request failed',
        message: `HTTP ${response.status}: ${response.statusText}`
      };
      throw new Error(JSON.stringify(errorData));
    }
    
    const data = await response.json();
    return {
      ...data,
      params
    } as GetClassesResponse;
  }
}

export const externalApiService = new ExternalApiService();