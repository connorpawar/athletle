import * as useFetchQuery from "~/hooks/useFetchQuery";
import type { Player } from "~/models/Player";

export function usePlayerSelection(sport: string, name: string): useFetchQuery.QueryInfo<Player> {
    const params = new URLSearchParams({ sport, leagueName: name }).toString();
    const url = `${process.env.API_ROOT!}player/selection?${params}`;
    return useFetchQuery.useFetchQuery(url);
}
