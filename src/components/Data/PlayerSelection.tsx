import { Image, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { usePlayerSelection } from "~/hooks/data/usePlayerSelection";

export function PlayerSelection(): ReactElement {
    const leagueId = "c0eb9eb3-2299-4e12-4638-08da80bc9c56";
    const { isLoading, data: player, error } = usePlayerSelection(leagueId);

    console.log(player);
    return isLoading || error !== undefined ? (
        isLoading ? (
            <Text>Loading Player...</Text>
        ) : (
            <Text color="red.600">Error: {error}</Text>
        )
    ) : (
        <div>
            Player Selection:
            <UnorderedList>
                <ListItem>Name: {player?.displayName}</ListItem>
                <ListItem>Jersey: {player?.jersey}</ListItem>
                <ListItem>
                    Height: {player?.height}, Weight: {player?.weight}
                </ListItem>
                <ListItem>Debut Year: {player?.debutYear}</ListItem>
                <ListItem>
                    <Image height="50" src={player?.headshot} />
                </ListItem>
                <ListItem>
                    <Image height="50" src={player?.team.logo} />
                </ListItem>
            </UnorderedList>
        </div>
    );
}
