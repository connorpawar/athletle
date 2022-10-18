import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { useAllPlayerNames } from "~/hooks/data/useAllPlayerNames";

export function AllPlayerNames(): ReactElement {
    const sport = "football";
    const name = "National Football League";
    const { isLoading, data: playerNames, error } = useAllPlayerNames(sport, name);

    const playerNamesView = playerNames?.slice(0, 5).map((playerName) => (
        <ListItem key={`${playerName.name}-${playerName.teamName}-${playerName.position}`}>
            Name: {playerName.name}, Team: {playerName.teamName}, Position: {playerName.position}
        </ListItem>
    ));

    return isLoading || error !== undefined ? (
        isLoading ? (
            <Text>Loading Player Names...</Text>
        ) : (
            <Text color="red.600">Error: {error}</Text>
        )
    ) : (
        <div>
            All Player Names:
            <UnorderedList>{playerNamesView}</UnorderedList>
        </div>
    );
}
