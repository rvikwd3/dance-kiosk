# @citydance/utils

Shared utilities for CityDance applications.

## Installation

This package is automatically available in the monorepo workspace. To use it in other packages:

```json
{
  "dependencies": {
    "@citydance/utils": "workspace:*"
  }
}
```

## Usage

### Date Utilities

```typescript
import { getToday, getTomorrow, getDateFromToday } from '@citydance/utils';

// Get today's date in YYYY-MM-DD format
const today = getToday(); // e.g., "2024-01-15"

// Get tomorrow's date in YYYY-MM-DD format
const tomorrow = getTomorrow(); // e.g., "2024-01-16"

// Get a date that is n days from today
const nextWeek = getDateFromToday(7); // e.g., "2024-01-22"
```

## Available Functions

- `getToday()`: Returns today's date in YYYY-MM-DD format
- `getTomorrow()`: Returns tomorrow's date in YYYY-MM-DD format  
- `getDateFromToday(days: number)`: Returns a date that is n days from today in YYYY-MM-DD format 