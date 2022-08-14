import { ReactElement, useState } from "react";
import { Button, ChakraProvider, Container, Fade, Input, SlideFade, Stack, useColorModeValue } from "@chakra-ui/react";
import { CallToAction } from "./CallToAction";
import theme from "~/config/theme";
import { GameBoard } from "../Game/GameBoard";

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
                    <Container maxW={"7xl"}>
                        <Stack align="center" spacing={4} direction={{ base: "column", md: "row" }} w={"lg"}>
                            <Input
                                type={"text"}
                                placeholder={"Guess an Athlete!"}
                                color={useColorModeValue("gray.800", "gray.200")}
                                bg={useColorModeValue("gray.100", "gray.600")}
                                rounded={"full"}
                                border={0}
                                _focus={{
                                    bg: useColorModeValue("gray.200", "gray.800"),
                                    outline: "none",
                                }}
                                value={guessInput}
                                onChange={(e) => setGuessInput(e.currentTarget.value)}
                            />
                            <Button
                                bg={"red.400"}
                                rounded={"full"}
                                color={"white"}
                                flex={"1 0 auto"}
                                _hover={{ bg: "red.500" }}
                                _focus={{ bg: "red.500" }}
                                onClick={openGameBoard}
                            >
                                Submit
                            </Button>
                        </Stack>
                    </Container>
                </>
            )}
        </ChakraProvider>
    );
}
