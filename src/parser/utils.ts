import { Contest } from "./models";

export const buildContestUrl = (contest: Contest): string => {
  return `https://codeforces.com/contests/${contest.id}`;
};
