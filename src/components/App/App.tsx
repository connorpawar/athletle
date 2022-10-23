import { ChakraProvider, SlideFade } from "@chakra-ui/react";
import { useState } from "react";
import type { ReactElement } from "react";
import { CallToAction } from "~/components/App/CallToAction";
import { SearchBar } from "~/components/App/SearchBar";
import { GameBoard } from "~/components/Game/GameBoard";
import theme from "~/config/theme";
import type { SportsLeagueContext} from "~/contexts/SportContext";
import { SportContext } from "~/contexts/SportContext";
import type { PlayerName } from "~/models";

export function App(): ReactElement {
    const [isGameBoardOpen, setIsGameBoardOpen] = useState(false);
    const [initialGuess, setInitialGuess] = useState<PlayerName | null>(null);
    const [sportsLeague, setSportsLeague] = useState<SportsLeagueContext>({
        sport: "football",
        league: "National Football League"
    })

    const openGameBoard = setIsGameBoardOpen.bind(null, true);

    function submitInitialGuess(guess: PlayerName): void {
        setInitialGuess(guess);
        openGameBoard();
    }

    return (
        <ChakraProvider theme={theme}>
            <SportContext.Provider value= {{ sportsLeague, setSportsLeague }}>
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
            </SportContext.Provider>
        </ChakraProvider>
    );
}
