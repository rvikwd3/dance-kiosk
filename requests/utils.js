/**
 * httpyac Utility Functions
 * External utility file for httpyac HTTP client
 */

const httpyacUtils = {

  /**
   * Date and Time utilities
   */
  date: {
    /**
     * Convert a Date object to ISO string with local timezone offset
     * Removes Milliseconds from date
     * @param {Date} date - The date to convert (defaults to current time)
     * @returns {string} ISO string with timezone offset (e.g., "2024-06-15T15:30:45-07:00")
     */
    toLocalISOString: (date = new Date()) => {
      const offset = date.getTimezoneOffset();
      const offsetHours = Math.floor(Math.abs(offset) / 60);
      const offsetMinutes = Math.abs(offset) % 60;
      const offsetSign = offset <= 0 ? '+' : '-';

      // Get local date components
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      const milliseconds = String(date.getMilliseconds()).padStart(3, '0'); // Not Used

      const timezoneOffset = `${offsetSign}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`;

      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneOffset}`;
    },

    /**
     * Get start of today as timestamp
     * @returns {number} Unix timestamp
     */
    getStartOfToday: () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return Math.floor(today.getTime() / 1000);
    },

    /**
     * Get end of today as timestamp
     * @returns {number} Unix timestamp
     */
    getEndOfToday: () => {
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      return Math.floor(today.getTime() / 1000);
    },

    /**
     * Get start of tomorrow as timestamp
     * @returns {number} Unix timestamp
     */
    getStartOfTomorrow: () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      return Math.floor(tomorrow.getTime() / 1000);
    },

    /**
     * Get end of tomorrow as timestamp
     * @returns {number} Unix timestamp
     */
    getEndOfTomorrow: () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(23, 59, 59, 999);
      return Math.floor(tomorrow.getTime() / 1000);
    },

    getThirtyMinutesAgo: () => {
      const now = new Date();

      // Subtract 30 minutes (in milliseconds)
      now.setTime(now.getTime() - 30 * 60 * 1000);

      return Math.floor(now.getTime() / 1000); // Returns Unix timestamp in milliseconds
    },

    /**
     * Convert timestamp to local ISO string
     * @param {number} timestamp - Unix timestamp
     * @returns {string} Local ISO string with timezone
     */
    timestampToLocalISO: (timestamp) => {
      const date = new Date(timestamp * 1000);
      return httpyacUtils.date.toLocalISOString(date);
    },

    /**
     * Get current timestamp
     * @returns {number} Unix timestamp
     */
    now: () => Math.floor(Date.now() / 1000),

    /**
     * Add days to a date
     * @param {Date|number} date - Date object or timestamp
     * @param {number} days - Number of days to add
     * @returns {Date} New date object
     */
    addDays: (date, days) => {
      const result = new Date(typeof date === 'number' ? date * 1000 : date);
      result.setDate(result.getDate() + days);
      return result;
    },

    /**
     * Extract calendar date from ISO string
     * @param isoString - ISO string (e.g., "2025-06-15T00:00:00-07:00")
     * @returns Calendar date string (e.g., "2025-06-15")
     */
    extractDateFromISO: (isoString) => {
      return isoString.split('T')[0];
    },

    /**
     * Convert Unix timestamp to calendar date
     * @param timestamp - Unix timestamp
     * @returns Calendar date string (e.g., "2025-06-15")
     */
    timestampToDate: (timestamp) => {
      const date = new Date(timestamp * 1000);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    /**
     * Get current date as calendar date string
     * @returns Current date string (e.g., "2025-06-15")
     */
    getCurrentDate: () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }
};

// Use commonJS exports
module.exports = httpyacUtils;