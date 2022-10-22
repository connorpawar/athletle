import type { Group } from "./Group";

export type Team = {
    displayName: string;
    shortDisplayName: string;
    abbreviation: string;
    logo: string;
    group: Group;
};
