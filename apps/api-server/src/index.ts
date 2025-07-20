// apps/api-server/src/index.ts
import './env.js'; // Load environment variables first
import express from 'express';
import cors from 'cors';
import { externalApiService } from './services/external-api.js';
import { env } from './env.js';
import { HealthCheckResponse, ApiErrorResponse } from '@dance-kiosk/types';
// Import mocks package - mock server will auto-start in development
import '@repo/mocks';

const PORT = env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

// Default health check and API info endpoint
app.get('/', (req, res) => {
  const healthResponse: HealthCheckResponse = {
    status: 'running',
    timestamp: new Date().toISOString(),
    mockServer: false
  };
  
  res.json({
    message: 'CityDance API Server',
    version: '1.0.0',
    ...healthResponse,
    endpoints: {
      'GET /': 'API information and health check',
      'GET /api/getClasses': 'Fetch dance classes from external API',
      'Query Parameters': {
        'minDate': 'Optional: Start date for class search (YYYY-MM-DD format)',
        'maxDate': 'Optional: End date for class search (YYYY-MM-DD format)'
      }
    }
  });
});

// Secure endpoint that uses your secrets
app.get('/api/getClasses', async (req, res) => {
  try {
    // Extract optional query parameters
    const { minDate, maxDate } = req.query;
    
    // Call the service with optional date parameters
    // API credentials remain secure on the server
    const data = await externalApiService.fetchClasses(
      minDate as string | undefined,
      maxDate as string | undefined
    );
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching classes:', error);
    const errorResponse: ApiErrorResponse = {
      error: 'Failed to fetch data',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
    res.status(500).json(errorResponse);
  }
});

console.log(`Running on PORT: ${PORT}`)
app.listen(PORT);