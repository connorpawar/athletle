import { createContext, useContext } from "react";
import type { Sport, SportsLeague } from "~/types/Enums";

export type SportsLeagueContext = {
    id: string;
    sport: Sport;
    league: SportsLeague;
};

export type GlobalContent = {
    sportsLeague: SportsLeagueContext;
    setSportsLeague: (c: SportsLeagueContext) => void;
};
export const SportContext = createContext<GlobalContent>({
    sportsLeague: {
        id: "c0eb9eb3-2299-4e12-4638-08da80bc9c56",
        sport: "football",
        league: "National Football League",
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setSportsLeague: () => {},
});
export const useSportContext = (): GlobalContent => useContext(SportContext);
