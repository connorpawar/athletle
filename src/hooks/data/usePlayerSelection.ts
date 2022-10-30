import * as useFetchQuery from "~/hooks/useFetchQuery";
import type { Player } from "~/models/Player";

export function usePlayerSelection(leagueId: string): useFetchQuery.QueryInfo<Player> {
    const url = `${process.env.API_ROOT!}leagues/${leagueId}/selection`;
    return useFetchQuery.useFetchQuery(url);
}
