import type { Position } from "./Position";
import type { Team } from "./Team";

export type Player = {
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
