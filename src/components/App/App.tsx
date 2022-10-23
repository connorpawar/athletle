import { ChakraProvider, SlideFade } from "@chakra-ui/react";
import { useState } from "react";
import type { ReactElement } from "react";
import { CallToAction } from "~/components/App/CallToAction";
import { GameBoard } from "~/components/Game/GameBoard";
import theme from "~/config/theme";
import type { SportsLeagueContext} from "~/contexts/SportContext";
import { SportContext } from "~/contexts/SportContext";

export function App(): ReactElement {
    const [isGameBoardOpen, setIsGameBoardOpen] = useState(false);
    const [sportsLeague, setSportsLeague] = useState<SportsLeagueContext>({
        sport: "football",
        league: "National Football League"
    })

    const openGameBoard = setIsGameBoardOpen.bind(null, true);

    return (
        <ChakraProvider theme={theme}>
            <SportContext.Provider value= {{ sportsLeague, setSportsLeague }}>
            {isGameBoardOpen ? (
                <SlideFade in={true} offsetY="20px">
                    <GameBoard />
                </SlideFade>
            ) : (
                <CallToAction onButtonClick={openGameBoard} />
            )}
            </SportContext.Provider>
        </ChakraProvider>
    );
}
