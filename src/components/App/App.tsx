import { ChakraProvider, SlideFade } from "@chakra-ui/react";
import { useState } from "react";
import type { ReactElement } from "react";
import { CallToAction } from "~/components/App/CallToAction";
import { SearchBar } from "~/components/App/SearchBar";
import { GameBoard } from "~/components/Game/GameBoard";
import theme from "~/config/theme";
import type { PlayerModel } from "~/types/Domain";

export function App(): ReactElement {
    const [isGameBoardOpen, setIsGameBoardOpen] = useState(false);
    const [initialGuess, setInitialGuess] = useState<PlayerModel | null>(null);
    const openGameBoard = setIsGameBoardOpen.bind(null, true);

    function submitInitialGuess(guess: PlayerModel): void {
        setInitialGuess(guess);
        openGameBoard();
    }

    return (
        <ChakraProvider theme={theme}>
            {isGameBoardOpen ? (
                <SlideFade in={true} offsetY="20px">
                    <GameBoard initialGuess={initialGuess!} />
                </SlideFade>
            ) : (
                <>
                    <CallToAction onButtonClick={openGameBoard} />
                    <SearchBar submitAction={submitInitialGuess} />
                </>
            )}
        </ChakraProvider>
    );
}
