import type { User, PlayerDTO } from "./user";

export interface Team {
  id: string;
  name: string;
  players: User[];
}

export interface TeamDTO {
  id?: string;
  name: string;
  players: PlayerDTO[];
}