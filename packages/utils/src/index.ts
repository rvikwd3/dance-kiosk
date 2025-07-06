/**
 * Shared utilities for CityDance applications
 */

/**
 * Date utility functions for API requests
 */

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getToday(): string {
  const date = new Date();
  return date.toISOString().split('T')[0]!;
}

/**
 * Get tomorrow's date in YYYY-MM-DD format
 */
export function getTomorrow(): string {
  const date = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return date.toISOString().split('T')[0]!;
}

/**
 * Get a date that is n days from today in YYYY-MM-DD format
 */
export function getDateFromToday(days: number): string {
  const date = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  return date.toISOString().split('T')[0]!;
} 