import { Container, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { PlayerModel, TeamModel } from "~/types/Domain";
import ColorfulBackdrop from "../Misc/ColorfulBackdrop";
import { GuessCard } from "./GuessCard";
import { PlayerCard } from "./PlayerCard";

export const GameBoard = () => {
    const [guesses, setGuesses] = useState<PlayerModel[]>([{
		DisplayName: "Lebron James",
		Team: {
			DisplayName: "Los Angeles Lakers",
			ShortDisplayName: "Lakers"
		} as TeamModel
	} as PlayerModel]);

    return (
        <Container maxW={"7xl"}>
            <Stack
                align={"center"}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}
                direction={{ base: "column", md: "row" }}
            >
                <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                    <PlayerCard image="./silhouette.jpg" />
					{guesses.map((g,i) => (
					<ColorfulBackdrop index={i}>
						<GuessCard guess={g}/>
					</ColorfulBackdrop>
				))}
                </Stack>
            </Stack>
        </Container>
    );
};
