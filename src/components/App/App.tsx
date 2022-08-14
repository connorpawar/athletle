import { ReactElement, useState } from "react";
import { Button, ChakraProvider, Container, Fade, Input, SlideFade, Stack, useColorModeValue } from "@chakra-ui/react";
import { CallToAction } from "./CallToAction";
import theme from "~/config/theme";
import { GameBoard } from "../Game/GameBoard";
import { SearchBar } from "./SearchBar";

export function App(): ReactElement {
    const [isGameBoardOpen, setIsGameBoardOpen] = useState(false);
    const [guessInput, setGuessInput] = useState("");

    const openGameBoard = setIsGameBoardOpen.bind(null, true);

    return (
        <ChakraProvider theme={theme}>
            {isGameBoardOpen ? (
                <SlideFade in offsetY="20px">
                    <GameBoard />
                </SlideFade>
            ) : (
                <>
                    <CallToAction onButtonClick={openGameBoard} />
                    <SearchBar
						guessInput={guessInput}
						setGuessInput={setGuessInput}
						submitAction={openGameBoard}
					/>
                </>
            )}
        </ChakraProvider>
    );
}
