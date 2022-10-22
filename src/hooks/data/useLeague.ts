import * as useFetchQuery from "~/hooks/useFetchQuery";
import type { League } from "~/models/League";

export function useLeague(sport: string, name: string): useFetchQuery.QueryInfo<League> {
    const params = new URLSearchParams({ sport, leagueName: name }).toString();
    const url = `${process.env.API_ROOT!}league?${params}`;
    return useFetchQuery.useFetchQuery(url);
}
