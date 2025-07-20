# @dance-kiosk/types

Shared TypeScript type definitions for the Dance Kiosk project.

## Overview

This package contains all the TypeScript types used across the Dance Kiosk applications and packages. It provides type safety and consistency across the entire project.

## Installation

This package is automatically available to all apps and packages in the monorepo. To use it in an external project:

```bash
npm install @dance-kiosk/types
```

## Usage

```typescript
import { DanceClass, GetClassesResponse } from '@dance-kiosk/types';

// Use the types in your code
const classes: DanceClass[] = [];
```

## Available Types

### Dance Classes

- `DanceClass` - Main interface for dance class data
- `DanceClassWithAvailability` - Extended interface with computed availability properties
- `DanceClassFilters` - Filter options for querying classes
- `DanceClassSort` - Sorting configuration

### API Types

- `ApiResponse<T>` - Base API response structure
- `GetClassesResponse` - Response for the classes endpoint
- `ApiErrorResponse` - Error response structure
- `GetClassesParams` - Query parameters for getting classes
- `HealthCheckResponse` - Health check endpoint response
- `AuthCredentials` - Authentication credentials
- `ApiConfig` - API configuration

## Development

### Building

```bash
pnpm build
```

### Development Mode

```bash
pnpm dev
```

### Clean

```bash
pnpm clean
```

## Structure

```
src/
├── index.ts          # Main exports
├── dance-class.ts    # Dance class related types
└── api.ts           # API related types
```

## Contributing

When adding new types:

1. Add the type definition to the appropriate file
2. Export it from the main `index.ts` file
3. Add JSDoc comments for documentation
4. Update this README if adding new categories of types 