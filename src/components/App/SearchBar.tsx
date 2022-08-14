import { ReactElement } from "react";
import { Button, Container, Input, Stack, useColorModeValue } from "@chakra-ui/react";

interface SearchBarProps {
    guessInput: string;
    setGuessInput: (arg0: string) => void;
    submitAction: () => void;
}

export function SearchBar(props: SearchBarProps): ReactElement {
    const { guessInput, setGuessInput, submitAction } = props;
    return (
        <Container maxW={"xl"}>
            <Stack align="center" spacing={4} direction="row" w={"lg"}>
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
					onKeyDown={(e) => e.key === "Enter" && submitAction()}
                />
                <Button
                    bg={"red.400"}
                    rounded={"full"}
                    color={"white"}
                    flex={"1 0 auto"}
                    _hover={{ bg: "red.500" }}
                    _focus={{ bg: "red.500" }}
                    onClick={submitAction}
                >
                    Submit
                </Button>
            </Stack>
        </Container>
    );
}
