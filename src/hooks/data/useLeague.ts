import * as useFetchQuery from "~/hooks/useFetchQuery";
import type { League } from "~/models/League";

export function useLeague(leagueId: string): useFetchQuery.QueryInfo<League> {
    const url = `${process.env.API_ROOT!}leagues/${leagueId}`;
    return useFetchQuery.useFetchQuery(url);
}
