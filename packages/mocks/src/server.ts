import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

// Helper function to start server with logging
export function startMockServer() {
  server.listen({
    onUnhandledRequest: 'warn'
  });
  
  console.log('🎭 MSW Mock Server Started');
  console.log('📋 Available endpoints:');
  console.log('  - GET /api/getClasses (requires Basic auth)');
  console.log('  - GET /api/* (dynamic based on JSON files)');
  console.log('  - POST /api/* (echo endpoint)');
  console.log('  - GET /health (no auth)');
  console.log('🔐 Mock credentials:');
  console.log('  - User ID: mock-user');
  console.log('  - API Key: mock-key');
}

// Auto-start mock server in development mode when this module is imported
if (process.env.NODE_ENV === 'development') {
  console.log(`[NODE_ENV=development] Auto-starting mock server`);
  startMockServer();
}