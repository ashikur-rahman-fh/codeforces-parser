
export interface StartTime {
  date: string;
  time: string;
  timezone: string;
}

export interface Contest {
  id: string;
  name: string;
  startTime: StartTime;
  duration: string;
}
