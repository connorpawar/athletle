import * as useFetchQuery from "~/hooks/useFetchQuery";
import type { BasicLeague } from "~/models/BasicLeague";

export function useAllLeagues(): useFetchQuery.QueryInfo<BasicLeague[]> {
    const url = `${process.env.API_ROOT!}league/all`;
    return useFetchQuery.useFetchQuery(url);
}
