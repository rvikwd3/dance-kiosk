import { server } from '../dist/index.js';

// Test credentials
export const mockCredentials = {
  userId: 'mock-user',
  apiKey: 'mock-key'
};

// Helper function to create Basic auth header
export function createBasicAuthHeader(userId: string, apiKey: string): string {
  const credentials = `${userId}:${apiKey}`;
  return `Basic ${btoa(credentials)}`;
}

// Helper function to make authenticated requests
export async function makeAuthenticatedRequest(url: string, options: RequestInit = {}): Promise<Response> {
  const authHeader = createBasicAuthHeader(mockCredentials.userId, mockCredentials.apiKey);
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  
  return response;
}

// Start server for testing
export function startServer(): void {
  server.listen({
    onUnhandledRequest: 'warn'
  });
  console.log('🎭 MSW Mock Server Started for testing');
}

// Stop server
export function stopServer(): void {
  server.close();
  console.log('🔒 MSW Mock Server stopped');
}

// Test result interface
export interface TestResult {
  success: boolean;
  status?: number;
  data?: any;
  error?: string;
  expectedUnauthorized?: boolean;
} 