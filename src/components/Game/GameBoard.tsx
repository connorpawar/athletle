import {
    Container,
    Stack
} from "@chakra-ui/react";
import { useState } from "react";
import { PlayerCard } from "./PlayerCard";

export const GameBoard = () => {
	const [guesses, setGuesses] = useState([]);
	

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
                </Stack>
            </Stack>
        </Container>
    );
}