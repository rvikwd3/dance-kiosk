/**
 * Main dance class interface based on getClasses.json structure
 */
export interface DanceClass {
  /** Unique identifier for the class */
  id: number;
  
  /** Name of the dance class */
  name: string;
  
  /** Calendar/studio information */
  calendar: string;
  
  /** Duration of the class in minutes */
  duration: number;
  
  /** Whether this is part of a series */
  isSeries: boolean;
  
  /** Total number of slots available */
  slots: number;
  
  /** Number of slots currently available */
  slotsAvailable: number;
  
  /** Color code for the class (hex format) */
  color: string;
  
  /** Price of the class as a string */
  price: string;
  
  /** Category/type of dance */
  category: string;
  
  /** Description of the class */
  description: string;
  
  /** Calendar ID */
  calendarID: number;
  
  /** Service group ID */
  serviceGroupID: number;
  
  /** Appointment type ID */
  appointmentTypeID: number;
  
  /** Timezone of the calendar */
  calendarTimezone: string;
  
  /** ISO timestamp of the class */
  time: string;
  
  /** Human-readable time format */
  localeTime: string;
}

/**
 * Dance class with additional computed properties
 */
export interface DanceClassWithAvailability extends DanceClass {
  /** Whether the class is fully booked */
  isFull: boolean;
  
  /** Percentage of slots available */
  availabilityPercentage: number;
  
  /** Whether the class is happening today */
  isToday: boolean;
  
  /** Whether the class is happening this week */
  isThisWeek: boolean;
}

/**
 * Filter options for dance classes
 */
export interface DanceClassFilters {
  /** Filter by category */
  category?: string;
  
  /** Filter by minimum date */
  minDate?: string;
  
  /** Filter by maximum date */
  maxDate?: string;
  
  /** Filter by timezone */
  timezone?: string;
  
  /** Filter by availability (true = has available slots) */
  hasAvailability?: boolean;
  
  /** Filter by instructor name (partial match) */
  instructor?: string;
  
  /** Filter by studio location */
  studio?: string;
}

/**
 * Sort options for dance classes
 */
export type DanceClassSortBy = 
  | 'time'
  | 'name'
  | 'category'
  | 'price'
  | 'slotsAvailable'
  | 'duration';

/**
 * Sort direction
 */
export type SortDirection = 'asc' | 'desc';

/**
 * Sort configuration
 */
export interface DanceClassSort {
  by: DanceClassSortBy;
  direction: SortDirection;
} 