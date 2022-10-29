import { createContext, useContext } from "react";
import type { Sport, SportsLeague } from "~/types/Enums";

export type SportsLeagueContext = {
    sport: Sport;
    league: SportsLeague;
}

export type GlobalContent = {
    sportsLeague: SportsLeagueContext;
    setSportsLeague:(c: SportsLeagueContext) => void;
  }
export const SportContext = createContext<GlobalContent>({
    sportsLeague: {
        sport: "football",
        league: "National Football League"
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setSportsLeague: () => {},
})
export const useSportContext = (): GlobalContent => useContext(SportContext);