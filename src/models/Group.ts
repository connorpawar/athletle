export type Group = {
    name: string;
    abbreviation: string;
    logo: string;
    isConference: boolean;
    parent: Group | null;
};
