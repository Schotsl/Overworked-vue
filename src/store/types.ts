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

export interface Location {
  uuid: string;
  title: string;
  lat: number;
  lng: number;
}

export interface PersonCollection {
  persons: Person[];
  total: number;
  offset: number;
  limit: number;
}

export interface MachineCollection {
  machines: Machine[];
  total: number;
  offset: number;
  limit: number;
}

export interface LocationCollection {
  locations: Location[];
  total: number;
  offset: number;
  limit: number;
}
