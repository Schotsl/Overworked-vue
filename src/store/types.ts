export interface Person {
  first: string;
  last: string;
  uuid: string;
  iconUrl: string | undefined;
}

export interface Machine {
  uuid: string;
  title: string;
  reps: number;
  sets: number;
}
