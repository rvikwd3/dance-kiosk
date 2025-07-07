// packages/mocks/src/env.ts
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from workspace root
// Mocks package only uses development environment
const envFile = '.env.development';

// Path to workspace root (2 levels up from packages/mocks/src)
const workspaceRoot = path.resolve(process.cwd(), '../../..');
const envFilePath = path.resolve(workspaceRoot, envFile);

console.log(`[Mocks] Loading environment from: ${envFile}`);
console.log(`[Mocks] Full path: ${envFilePath}`);
console.log(`[Mocks] Note: Mocks package only uses development environment`);

dotenv.config({
  path: envFilePath,
});

// Export environment variables for use in other modules
export const env = {
  API_BASE_URL: process.env.API_BASE_URL,
  API_USER_ID: process.env.API_USER_ID,
  API_KEY: process.env.API_KEY,
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development'
}; 