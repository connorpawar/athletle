import * as useFetchQuery from "~/hooks/useFetchQuery";
import type { Player } from "~/models/Player";

export function usePlayer(
    sport: string,
    league: string,
    team: string,
    name: string,
    position: string
): useFetchQuery.QueryInfo<Player> {
    const params = new URLSearchParams({
        sport,
        leagueName: league,
        teamName: team,
        playerName: name,
        position,
    }).toString();
    const url = `${process.env.API_ROOT!}player?${params}`;
    return useFetchQuery.useFetchQuery(url);
}
