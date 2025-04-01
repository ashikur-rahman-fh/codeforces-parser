import axios, { AxiosError } from "axios";
import { ApiError, HttpError, NetworkError } from "./models";

export class HttpUrlFetcherService {
  private readonly requestTimeout: number = 10000; // 10 seconds

  public fetchUrl = async (url: string): Promise<string> => {
    try {
      const response = await axios.get(url, {
        headers: {
          "User-Agent": "Codeforces Parser/1.0",
          Accept: "text/html",
        },
        timeout: this.requestTimeout,
      });

      if (response.status !== 200) {
        throw new HttpError(`Failed to fetch URL: ${url}`, response.status);
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new NetworkError(
          this.getAxiosErrorMessage(error),
          error.response?.status,
        );
      }
    }

    throw new ApiError("Unreachable");
  };

  private getAxiosErrorMessage = (error: AxiosError): string => {
    if (error.code === "ECONNABORTED") {
      return `Request timeout after ${this.requestTimeout}ms`;
    }
    if (error.response) {
      return `HTTP ${error.response.status}: ${error.response.statusText}`;
    }
    if (error.request) {
      return "No response received from server";
    }
    return "Network request failed";
  };
}
