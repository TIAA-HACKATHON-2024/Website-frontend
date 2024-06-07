export interface Option {
  text: string;
  points: number;
}

export interface TableRow {
  plan: string;
  average: string;
  best: string;
  worst: string;
}

export interface Question {
  question: string;
  name: string;
  options: Option[];
  table?: TableRow[];
  audio: string;
}
