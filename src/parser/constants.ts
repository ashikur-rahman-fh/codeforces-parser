import { ContestFilterOptions, RetryOptions } from "./models";

export const DEFAULT_CONTEST_FILTER_OPTIONS: ContestFilterOptions = {
  limit: 5,
  upcomingOnly: true,
};

export const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  maxRetries: 3,
  initialDelayMs: 1000,
  maxDelayMs: 5000,
  retryOnHttpStatuses: [429, 500, 502, 503, 504],
};
