// packages/mocks/src/index.ts
export { handlers } from './handlers';
export { server, startMockServer } from './server';
export { dataLoader } from './data-loader';
export { validateBasicAuth, createBasicAuthHeader } from './auth';

// Re-export types for convenience
export type {
  GetClassesResponse,
  GetClassesParams,
  ApiErrorResponse,
  HealthCheckResponse,
  ApiResponse,
  DanceClass
} from '@dance-kiosk/types';