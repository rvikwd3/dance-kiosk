# MSW Mock Server

This package provides a Mock Service Worker (MSW) server for mocking external API requests in the City Dance application.

## Setup

1. Ensure you have a `.env.development` file in the workspace root with:
   ```
   API_BASE_URL=http://localhost:4000
   API_USER_ID=mock-user
   API_KEY=mock-key
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Build the package:
   ```bash
   pnpm build
   ```

## Testing Your MSW Server

### Available Test Scripts

The package includes several pnpm scripts for testing the MSW server. All tests are written in TypeScript and located in the `tests/` directory.

#### Quick Health Check
```bash
pnpm test:health
```
Tests the basic health endpoint to verify the server is running.

#### Comprehensive Endpoint Tests
```bash
pnpm test:endpoints
```
Runs a full suite of tests including:
- Health endpoint
- Authenticated requests
- Unauthenticated requests (should fail)
- Invalid credentials (should fail)
- Non-existent endpoints (should return 404)

#### Build and Test All
```bash
pnpm test:all
```
Builds the package and then runs all endpoint tests.

#### Build Tests Only
```bash
pnpm test:build
```
Compiles the TypeScript test files using a separate test configuration.

#### Development Server
```bash
pnpm dev
```
Starts the MSW server in development mode with file watching.

### Test Results

When tests pass successfully, you should see output like:
```
📊 Test Summary:
================
✅ PASS Health Endpoint
✅ PASS Get Classes Endpoint
✅ PASS Unauthenticated Request
✅ PASS Invalid Credentials
✅ PASS Non-existent Endpoint

🎯 Overall: 5/5 tests passed
🎉 All tests passed! Your MSW server is working correctly.
```

## Available Endpoints

### Health Check
- **URL**: `GET /health`
- **Auth**: None required
- **Response**: Server status and timestamp

### Get Classes
- **URL**: `GET /availability/classes`
- **Auth**: Basic authentication required
- **Query Params**: `minDate`, `maxDate`, `timezone`
- **Response**: Mock class data from `data/getClasses.json`

### Generic API Endpoints
- **URL**: `GET /api/*`
- **Auth**: Basic authentication required
- **Response**: Dynamic data based on JSON files in `data/` directory

## Mock Credentials

For testing authenticated endpoints, use these credentials:
- **User ID**: `mock-user`
- **API Key**: `mock-key`

## Adding Mock Data

To add mock data for new endpoints:

1. Create a JSON file in the `data/` directory (e.g., `data/getAppointments.json`)
2. The endpoint will be available at `/api/getAppointments`
3. The file should contain valid JSON data

## Integration Testing

You can also use the exported test utilities in other packages:

```typescript
import { startServer, stopServer, makeAuthenticatedRequest } from '@repo/mocks/tests/utils';

// Start the server
startServer();

// Make authenticated requests
const response = await makeAuthenticatedRequest('http://localhost:4000/availability/classes');
const data = await response.json();

// Stop the server
stopServer();
```

### Test Utilities

The `tests/utils.ts` file exports several utilities:
- `startServer()` - Start the MSW server for testing
- `stopServer()` - Stop the MSW server
- `makeAuthenticatedRequest(url, options)` - Make authenticated requests
- `createBasicAuthHeader(userId, apiKey)` - Create Basic auth headers
- `mockCredentials` - Default test credentials

## Troubleshooting

### Server Not Starting
- Check that `.env.development` exists and has `API_BASE_URL` defined
- Ensure all dependencies are installed with `pnpm install`
- Build the package with `pnpm build`

### Tests Failing
- Verify the server is running on the correct port (default: 4000)
- Check that mock data files exist and contain valid JSON
- Ensure authentication credentials are correct

### Port Conflicts
If port 4000 is already in use, update the `API_BASE_URL` in your `.env.development` file to use a different port. 