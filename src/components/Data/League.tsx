import { Image, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { useLeague } from "~/hooks/data/useLeague";

export function League(): ReactElement {
    const leagueId = "c0eb9eb3-2299-4e12-4638-08da80bc9c56";
    const { isLoading, data: league, error } = useLeague(leagueId);

    return isLoading || error !== undefined ? (
        isLoading ? (
            <Text>Loading League...</Text>
        ) : (
            <Text color="red.600">Error: {error}</Text>
        )
    ) : (
        <div>
            League ({leagueId}) Info:
            <UnorderedList>
                <ListItem>Name: {league?.name}</ListItem>
                <ListItem>Abbreviation: {league?.abbreviation}</ListItem>
                <ListItem>Sport: {league?.sport}</ListItem>
                <ListItem>
                    <Image height="50" src={league?.logo} />
                </ListItem>
            </UnorderedList>
        </div>
    );
}
