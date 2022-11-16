import type { Position } from "./Position";
import type { Team } from "./Team";

export type Player = {
    id: string;
    displayName: string;
    headshot: string;
    jersey: string;
    weight: number;
    height: number;
    dateOfBirth: Date;
    debutYear: number;
    team: Team;
    position: Position;
};
