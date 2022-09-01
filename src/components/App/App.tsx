import { ReactElement, useState } from "react";
import { ChakraProvider, SlideFade } from "@chakra-ui/react";
import { CallToAction } from "./CallToAction";
import theme from "~/config/theme";
import { GameBoard } from "../Game/GameBoard";
import { SearchBar } from "./SearchBar";
import { PlayerModel } from "~/types/Domain";

export function App(): ReactElement {
    const [isGameBoardOpen, setIsGameBoardOpen] = useState(false);
	const [initialGuess, setInitialGuess] = useState<PlayerModel | null>(null);
    const openGameBoard = setIsGameBoardOpen.bind(null, true);

	const submitInitialGuess = (guess: PlayerModel) => {
		setInitialGuess(guess);
		openGameBoard();
	};

    return (
        <ChakraProvider theme={theme}>
            {isGameBoardOpen ? (
                <SlideFade in offsetY="20px">
                    <GameBoard initialGuess={initialGuess as PlayerModel}/>
                </SlideFade>
            ) : (
                <>
                    <CallToAction onButtonClick={openGameBoard} />
                    <SearchBar
						submitAction={submitInitialGuess}
					/>
                </>
            )}
        </ChakraProvider>
    );
}
