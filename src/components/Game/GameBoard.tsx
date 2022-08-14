import {
    Button,
    Center,
    Container,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { PlayerModel, TeamModel } from "~/types/Domain";
import { SearchBar } from "../App/SearchBar";
import ColorfulBackdrop from "../Misc/ColorfulBackdrop";
import { GuessCard } from "./GuessCard";
import { PlayerCard } from "./PlayerCard";

export const GameBoard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [guessInput, setGuessInput] = useState("");
	const [guesses, setGuesses] = useState<PlayerModel[]>([]);
    // const [guesses, setGuesses] = useState<PlayerModel[]>([
    //     {
    //         DisplayName: "Lebron James",
    //         Team: {
    //             DisplayName: "Los Angeles Lakers",
    //             ShortDisplayName: "Lakers",
    //         } as TeamModel,
    //     } as PlayerModel,
    // ]);

    const onSubmit = () => {
        console.log(guessInput);
        setGuessInput("");
    };

    return (
        <Container maxW={"7xl"}>
            <Stack
                align={"center"}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}
                direction={{ base: "column", md: "row" }}
            >
                <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                    <Modal onClose={onClose} isOpen={isOpen} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Who is it?</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <PlayerCard image="./silhouette.jpg" />
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={onClose}>Close</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Center mb="12em">
                        <Button maxW="sm" onClick={onOpen}>
                            View Silhouette
                        </Button>
                        <SearchBar guessInput={guessInput} setGuessInput={setGuessInput} submitAction={onSubmit} />
                    </Center>
                    {guesses.map((g, i) => (
                        <ColorfulBackdrop index={i}>
                            <GuessCard guess={g} />
                        </ColorfulBackdrop>
                    ))}
                </Stack>
            </Stack>
        </Container>
    );
};
