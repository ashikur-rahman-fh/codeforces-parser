import { RetryOptions } from "./models";

import { DEFAULT_RETRY_OPTIONS } from "./constants";

export const withRetry = async <T>(
  fn: () => Promise<T>,
  options?: RetryOptions,
): Promise<T & { retryAttempt?: number }> => {
  const { maxRetries, initialDelayMs, maxDelayMs, retryOnHttpStatuses } = {
    ...DEFAULT_RETRY_OPTIONS,
    ...options,
  };

  let attempt = 0;
  let lastError: any = "unknown";

  while (attempt < maxRetries) {
    try {
      const result = await fn();
      return { ...result, retryAttempt: attempt };
    } catch (error) {
      lastError = error;
      attempt++;

      if (!shouldRetry(error, attempt, maxRetries, retryOnHttpStatuses)) {
        break;
      }

      const delay = calculateBackoff(attempt, initialDelayMs, maxDelayMs);
      await sleep(delay);
    }
  }

  throw new Error({ ...lastError, retryAttempt: attempt - 1 });
};

const shouldRetry = (
  error: any,
  attempt: number,
  maxRetries: number,
  retryOnStatus: number[],
): boolean => {
  if (attempt >= maxRetries) {
    return false;
  }
  if (error.statusCode && retryOnStatus.includes(error.statusCode)) {
    return true;
  }
  if (error.type === "NETWORK") {
    return true;
  }
  return !["VALIDATION", "PARSE"].includes(error.type);
};

const calculateBackoff = (
  attempt: number,
  initialDelayMs: number,
  maxDelayMs: number,
): number => {
  const exp = Math.min(initialDelayMs * Math.pow(2, attempt - 1), maxDelayMs);
  return exp + exp * 0.2 * Math.random();
};

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
