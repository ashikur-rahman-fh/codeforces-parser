import { HttpUrlFetcherService } from "./httpUrlFetcherService";

export class CodeforcesService {
  private readonly httpUrlFetcherService: HttpUrlFetcherService;

  private readonly baseUrl: string = "https://codeforces.com/";

  constructor() {
    this.httpUrlFetcherService = new HttpUrlFetcherService();
  }

  public fetchContestsPage = async (): Promise<string> => {
    const url = `${this.baseUrl}contests`;
    try {
      const response = await this.httpUrlFetcherService.fetchUrl(url);
      return response;
    } catch (error) {
      console.error("Error fetching contest page:", error);
    }
    return "unreachable";
  };
}
