export interface IMealForm {
  time: string;
  description: string;
  kcal: number;
}

export interface IMeal {
  id: string;
  time: string;
  description: string;
  kcal: number;
}

export interface IMealAPI {
  [id: string]: IMeal;
}