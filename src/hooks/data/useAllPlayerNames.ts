import * as useFetchQuery from "~/hooks/useFetchQuery";
import type { PlayerName } from "~/models/PlayerName";

export function useAllPlayerNames(leagueId: string): useFetchQuery.QueryInfo<PlayerName[]> {
    const url = `${process.env.API_ROOT!}leagues/${leagueId}/players`;
    return useFetchQuery.useFetchQuery(url);
}
