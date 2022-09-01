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
import { ReactElement, useState } from "react";
import { PlayerModel } from "~/types/Domain";
import { SearchBar } from "../App/SearchBar";
import ColorfulBackdrop from "../Misc/ColorfulBackdrop";
import { GuessCard } from "./GuessCard";
import { PlayerCard } from "./PlayerCard";

interface GameBoardProps {
    initialGuess: PlayerModel;
}

export function GameBoard(props: GameBoardProps): ReactElement {
    const { initialGuess } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [guesses, setGuesses] = useState<PlayerModel[]>([initialGuess]);

    const onSubmit = (guess: PlayerModel) => {
        console.log(guess.DisplayName);
        setGuesses((prev) => [...prev, guess]);
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
				<Button maxW="sm" onClick={onOpen}>
                    View Silhouette
                </Button>
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
                        <SearchBar submitAction={onSubmit} />
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
}
