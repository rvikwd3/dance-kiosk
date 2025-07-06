// apps/api-server/src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { externalApiService } from './services/external-api.js';

const envFile = process.env.NODE_ENV === 'production' 
  ? 'env/.env.production' 
  : 'env/.env.development';

const PORT = process.env.PORT || 3001;

dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});

const app = express();

app.use(cors());
app.use(express.json());

// Default health check and API info endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'CityDance API Server',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      'GET /': 'API information and health check',
      'GET /api/getClasses': 'Fetch dance classes from external API'
    }
  });
});

// Secure endpoint that uses your secrets
app.get('/api/getClasses', async (req, res) => {
  try {
    const data = await externalApiService.fetchClasses();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

console.log(`Running on PORT: ${PORT}`)
app.listen(PORT);