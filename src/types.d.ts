export interface IMealForm {
  time: string;
  dateTime: string;
  description: string;
  kcal: number;
}

export interface IMeal {
  id: string;
  dateTime: string;
  time: string;
  description: string;
  kcal: number;
}

export interface IMealAPI {
  [id: string]: IMeal;
}
