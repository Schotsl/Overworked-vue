export interface Person {
  name: string;
  uuid: string;
  photo: string | undefined;
}

export interface Machine {
  uuid: string;
  title: string;
  reps: number;
  sets: number;
}
