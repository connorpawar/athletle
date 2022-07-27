import { ReactElement, useState } from "react";
import { ChakraProvider, Fade, SlideFade } from '@chakra-ui/react'
import { CallToAction } from "./CallToAction";
import theme from "~/config/theme";
import { GameBoard } from "../Game/GameBoard";

export function App(): ReactElement {
	const [isGameBoardOpen, setIsGameBoardOpen] = useState(false);

	const openGameBoard = setIsGameBoardOpen.bind(null, true);
	// const closeGameBoard = setIsGameBoardOpen.bind(null, false);

    return (
		<ChakraProvider theme={theme}>
			{isGameBoardOpen ? (
				<SlideFade in offsetY='20px'>
					<GameBoard />
				</SlideFade>
			) : (
				<CallToAction onButtonClick={openGameBoard} />
			)}
		</ChakraProvider>
    );
}
