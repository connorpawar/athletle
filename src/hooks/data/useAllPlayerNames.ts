import * as useFetchQuery from "~/hooks/useFetchQuery";
import type { PlayerName } from "~/models/PlayerName";

export function useAllPlayerNames(sport: string, name: string): useFetchQuery.QueryInfo<PlayerName[]> {
    const params = new URLSearchParams({ sport, leagueName: name }).toString();
    const url = `${process.env.API_ROOT!}player/names?${params}`;
    return useFetchQuery.useFetchQuery(url);
}
