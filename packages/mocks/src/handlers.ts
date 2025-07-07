import { http, HttpResponse } from 'msw';
import { validateBasicAuth } from './auth';
import { dataLoader } from './data-loader';
import { env } from './env';

// Get the base URL from environment
const API_BASE_URL = env.API_BASE_URL;

// Log the base URL being used for debugging
console.log(`[Mocks] Using API_BASE_URL: ${API_BASE_URL}`);

// Helper function to validate Basic auth and return error response if invalid
const validateAuthAndGetError = (authHeader: string | null) => {
  if (!validateBasicAuth(authHeader)) {
    return HttpResponse.json(
      { 
        error: 'Unauthorized', 
        message: 'Invalid or missing Basic authentication credentials' 
      },
      { status: 401 }
    );
  }
  return null; // No error, auth is valid
};

// Helper function to create error response
const createErrorResponse = (status: number, error: string, message: string, additionalData?: any) => {
  return HttpResponse.json(
    { 
      error, 
      message,
      ...additionalData
    },
    { status }
  );
};

// Helper function to create success response with metadata
const createSuccessResponse = (data: any, endpoint?: string) => {
  const now = new Date();
  const formattedTimestamp = now.toISOString().replace(/[:.]/g, '_').slice(0, -5); // YYYY-MM-DDTHH_MM_SS format
  
  const response = {
    ...data,
    timestamp: now.toISOString(),
    requestId: `req_${formattedTimestamp}_${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    ...(endpoint && { _meta: { endpoint, mockData: true } })
  };
  return HttpResponse.json(response);
};

export const handlers = [
  // Main handler for /api/getClasses
  http.get(`${API_BASE_URL}/api/getClasses`, ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    
    // Validate Basic authentication
    const authError = validateAuthAndGetError(authHeader);
    if (authError) return authError;

    try {
      // Load dynamic JSON data for this endpoint
      const classesData = dataLoader.loadDataForEndpoint('/api/getClasses');
      return createSuccessResponse(classesData);
    } catch (error) {
      console.error('Error loading mock data:', error);
      return createErrorResponse(500, 'Internal Server Error', 'Failed to load mock data');
    }
  }),

  // Generic handler for any /api/* endpoint with Basic auth
  http.get(`${API_BASE_URL}/api/*`, ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    
    // Validate Basic authentication
    const authError = validateAuthAndGetError(authHeader);
    if (authError) return authError;

    const url = new URL(request.url);
    const endpoint = url.pathname;
    
    try {
      // Check if we have mock data for this endpoint
      if (!dataLoader.hasDataForEndpoint(endpoint)) {
        return createErrorResponse(
          404, 
          'Not Found', 
          `No mock data available for ${endpoint}`,
          { availableEndpoints: dataLoader.getAvailableEndpoints() }
        );
      }
      
      const data = dataLoader.loadDataForEndpoint(endpoint);
      return createSuccessResponse(data, endpoint);
    } catch (error) {
      console.error(`Error loading mock data for ${endpoint}:`, error);
      return createErrorResponse(500, 'Internal Server Error', 'Failed to load mock data');
    }
  }),

  // Health check endpoint (no auth required)
  http.get(`${API_BASE_URL}/health`, () => {
    return HttpResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      mockServer: true
    });
  })
];
