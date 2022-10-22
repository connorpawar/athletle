import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { useAllLeagues } from "~/hooks/data/useAllLeagues";

export function AllLeagues(): ReactElement {
    const { isLoading, data: leagues, error } = useAllLeagues();

    const leaguesView = leagues?.map((league) => (
        <ListItem key={`${league.name}-${league.sport}`}>
            Sport: {league.sport}, Name: {league.name}
        </ListItem>
    ));

    return isLoading || error !== undefined ? (
        isLoading ? (
            <Text>Loading Leagues...</Text>
        ) : (
            <Text color="red.600">Error: {error}</Text>
        )
    ) : (
        <div>
            All Basic League Info:
            <UnorderedList>{leaguesView}</UnorderedList>
        </div>
    );
}
