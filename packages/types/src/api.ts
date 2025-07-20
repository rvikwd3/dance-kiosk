import { DanceClass } from './dance-class';

/**
 * Base API response structure
 */
export interface ApiResponse<T = any> {
  /** Response data */
  data: T;
  
  /** Request timestamp */
  timestamp: string;
  
  /** Unique request ID */
  requestId: string;
  
  /** Metadata about the response */
  _meta?: {
    endpoint: string;
    mockData: boolean;
  };
}

/**
 * API response for dance classes endpoint
 */
export interface GetClassesResponse extends ApiResponse<DanceClass[]> {
  /** Query parameters used for the request */
  params: {
    minDate?: string;
    maxDate?: string;
    timezone?: string;
  };
}

/**
 * API error response
 */
export interface ApiErrorResponse {
  /** Error type */
  error: string;
  
  /** Error message */
  message: string;
  
  /** Additional error data */
  [key: string]: any;
}

/**
 * Query parameters for getting classes
 */
export interface GetClassesParams {
  /** Minimum date filter (ISO string) */
  minDate?: string;
  
  /** Maximum date filter (ISO string) */
  maxDate?: string;
  
  /** Timezone for date filtering */
  timezone?: string;
}

/**
 * Health check response
 */
export interface HealthCheckResponse {
  /** Service status */
  status: string;
  
  /** Response timestamp */
  timestamp: string;
  
  /** Whether this is a mock server */
  mockServer: boolean;
}

/**
 * Authentication types
 */
export interface AuthCredentials {
  /** Username for Basic auth */
  username: string;
  
  /** Password for Basic auth */
  password: string;
}

/**
 * API configuration
 */
export interface ApiConfig {
  /** Base URL for the API */
  baseUrl: string;
  
  /** Authentication credentials */
  auth?: AuthCredentials;
  
  /** Request timeout in milliseconds */
  timeout?: number;
  
  /** Whether to use mock data */
  useMocks?: boolean;
} 