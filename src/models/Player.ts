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

export const defaultPlayer = {
    id: "",
    displayName: "",
    headshot: "",
    jersey: "",
    height: 0,
    weight: 0,
    dateOfBirth: new Date(),
    debutYear: 0,
    team: {
        displayName: "",
        shortDisplayName: "",
        logo: "",
        abbreviation: "",
        group: {
            isConference: true,
            name: "",
            logo: "",
            abbreviation: "",
            parent: null,
        },
    },
    position: {
        name: "",
        displayName: "",
        abbreviation: "",
        parent: null,
    },
}
