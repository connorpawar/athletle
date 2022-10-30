import { Image, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { usePlayer } from "~/hooks/data/usePlayer";

export function Player(): ReactElement {
    const playerId = "f81f7df0-3fba-4ab6-e3ee-08da80bca449";
    const { isLoading, data: player, error } = usePlayer(playerId);

    return isLoading || error !== undefined ? (
        isLoading ? (
            <Text>Loading Player...</Text>
        ) : (
            <Text color="red.600">Error: {error}</Text>
        )
    ) : (
        <div>
            Player Info:
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
