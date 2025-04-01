export interface StartTime {
  date: string;
  time: string;
  timezone: string;
}

export interface Contest {
  id: string;
  name: string;
  startTime?: StartTime;
  duration?: string;
  url?: string;
}

export type ContestFilterOptions = {
  limit?: number;
  upcomingOnly?: boolean;
};

export type RetryOptions = {
  maxRetries: number;
  initialDelayMs: number;
  maxDelayMs: number;
  retryOnHttpStatuses: number[];
};

export type ErrorType = "HTTP" | "NETWORK" | "UNKNOWN";

export class ApiError extends Error {
  public type: ErrorType;

  constructor(message: string) {
    super(message);
    this.type = "UNKNOWN";
  }
}

export class HttpError extends ApiError {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.type = "HTTP";
  }
}

export class NetworkError extends ApiError {
  public statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode;
    this.type = "NETWORK";
  }
}
