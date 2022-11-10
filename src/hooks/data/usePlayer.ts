import * as useFetchQuery from "~/hooks/useFetchQuery";
import type { Player } from "~/models/Player";

export function usePlayer(playerId: string): useFetchQuery.QueryInfo<Player> {
    if (playerId === "") {
        return {
            data: undefined,
            isLoading: false,
            error: "Missing Id",
        };
    }
    const url = `${process.env.API_ROOT!}players/${playerId}`;
    return useFetchQuery.useFetchQuery(url);
}
