/**
 * Development-only logger
 * In production, all logs are no-ops to avoid leaking sensitive data
 */

export const log = (...args: any[]) => {
  if (import.meta.env.DEV) {
    console.log(...args);
  }
};

export const error = (...args: any[]) => {
  if (import.meta.env.DEV) {
    console.error(...args);
  }
};

export const warn = (...args: any[]) => {
  if (import.meta.env.DEV) {
    console.warn(...args);
  }
};

export const debug = (...args: any[]) => {
  if (import.meta.env.DEV) {
    console.debug(...args);
  }
};
