// packages/api-client/src/index.ts
import { getToday, getTomorrow } from '@citydance/utils';

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetchClasses(minDate?: string, maxDate?: string) {
    const params = new URLSearchParams();
    
    if (minDate) {
      params.append('minDate', minDate);
    } else {
      params.append('minDate', getToday());
    }
    
    if (maxDate) {
      params.append('maxDate', maxDate);
    } else {
      params.append('maxDate', getTomorrow());
    }

    const response = await fetch(`${this.baseUrl}/api/getClasses?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    return response.json();
  }
}

// Factory function for easy instantiation
export function createApiClient(baseUrl: string) {
  return new ApiClient(baseUrl);
}