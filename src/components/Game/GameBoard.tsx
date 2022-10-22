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
import type { ReactElement} from "react";
import { useState } from "react";
import { SearchBar } from "../App/SearchBar";
import { ColorfulBackdrop } from "../Misc/ColorfulBackdrop";
import { GuessCard } from "./GuessCard";
import { PlayerCard } from "./PlayerCard";
// import { TeamModel } from "~/types/Domain";
import type { PlayerModel} from "~/types/Domain";

type GameBoardProps = {
    initialGuess: PlayerModel;
}

export function GameBoard(props: GameBoardProps): ReactElement {
    const { initialGuess } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [answer, setAnswer] = useState<PlayerModel>({
		DisplayName: "",
		Jersey: "",
		Height: 0,
		Weight: 0,
		DateOfBirth: new Date(),
		DebutYear: 0,
		Team: {
			DisplayName: "",
			ShortDisplayName: "",
			Logo: "",
			Abbreviation: "",
			Group: {
				IsConference: true,
				Name: "",
				Logo: "",
				Abbreviation: ""
			}
		},
		Position: {
			Name: "",
			DisplayName: "",
			Abbreviation: ""
		}
	});
    const [guesses, setGuesses] = useState<PlayerModel[]>([initialGuess]);

    const onSubmit = (guess: PlayerModel): void => {
        console.log(guess.DisplayName);
        setGuesses((prev) => [...prev, guess]);
    };

    return (
        <Container maxW="7xl">
            <Stack
                align="center"
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}
                direction={{ base: "column", md: "row" }}
            >
                <Stack flex={1} spacing={{ base: 5, md: 10 }}>
				<Button maxW="sm" onClick={onOpen}>
                    View Silhouette
                </Button>
                    <Modal onClose={onClose} isOpen={isOpen} isCentered={true}>
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
                        <ColorfulBackdrop key={g.DisplayName} index={i}>
                            <GuessCard guess={g} answer={answer}/>
                        </ColorfulBackdrop>
                    ))}
                </Stack>
            </Stack>
        </Container>
    );
}
