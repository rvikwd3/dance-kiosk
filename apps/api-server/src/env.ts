// apps/api-server/src/env.ts
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from workspace root
const envFile = process.env.NODE_ENV === 'production' 
  ? '.env.production' 
  : '.env.development';

// Path to workspace root (2 levels up from apps/api-server/src)
const workspaceRoot = path.resolve(process.cwd(), '../../..');
const envFilePath = path.resolve(workspaceRoot, envFile);

console.log(`Loading environment from: ${envFile}`);
console.log(`Full path: ${envFilePath}`);

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