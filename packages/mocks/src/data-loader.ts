import fs from 'fs';
import path from 'path';

export class MockDataLoader {
  private dataDir = path.join(__dirname, '../data');
  
  loadJsonFile<T>(filename: string): T {
    const filePath = path.join(this.dataDir, filename);
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`Mock data file not found: ${filename}`);
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  }
  
  // Load JSON based on endpoint path
  loadDataForEndpoint(endpoint: string): any {
    // Convert endpoint path to filename
    // /api/getClasses -> getClasses.json
    // /api/users/profile -> users-profile.json
    const filename = endpoint
      .replace(/^\/api\//, '')
      .replace(/\//g, '-')
      .toLowerCase() + '.json';
    
    return this.loadJsonFile(filename);
  }
  
  // Check if mock data exists for endpoint
  hasDataForEndpoint(endpoint: string): boolean {
    const filename = endpoint
      .replace(/^\/api\//, '')
      .replace(/\//g, '-')
      .toLowerCase() + '.json';
    
    const filePath = path.join(this.dataDir, filename);
    return fs.existsSync(filePath);
  }
  
  // Load all available mock data files
  getAvailableEndpoints(): string[] {
    const files = fs.readdirSync(this.dataDir);
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => '/api/' + file.replace('.json', '').replace(/-/g, '/'));
  }
}

export const dataLoader = new MockDataLoader();