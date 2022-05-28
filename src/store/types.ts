export interface Person {
  name: string;
  uuid: string;
  photo: string | undefined;
  friend: string | undefined;
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

export interface Entry {
  uuid: string;
  person: string;
  machine: string;
  location: string;
  weight: number;
  upgrade: boolean;
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

export interface EntryCollection {
  entries: Entry[];
  total: number;
  offset: number;
  limit: number;
}
