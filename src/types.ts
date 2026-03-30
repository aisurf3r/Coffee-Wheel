export interface Participant {
  id: string;
  name: string;
  color: string;
}

export interface WinnerRecord {
  name: string;
  timestamp: number;
}

export type AppScreen = 'input' | 'spinning' | 'result';
