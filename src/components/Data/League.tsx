import { Image, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { useLeague } from "~/hooks/data/useLeague";

export function League(): ReactElement {
    const sport = "football";
    const name = "National Football League";
    const { isLoading, data: league, error } = useLeague(sport, name);

    return isLoading || error !== undefined ? (
        isLoading ? (
            <Text>Loading League...</Text>
        ) : (
            <Text color="red.600">Error: {error}</Text>
        )
    ) : (
        <div>
            {sport} - {name} Info:
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
