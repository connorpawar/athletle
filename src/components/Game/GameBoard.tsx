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
import { useEffect, useState } from "react";
import { SearchBar } from "../App/SearchBar";
import { ColorfulBackdrop } from "../Misc/ColorfulBackdrop";
import { GuessCard } from "./GuessCard";
import { PlayerCard } from "./PlayerCard";
import { useSportContext } from "~/contexts/SportContext";
import { usePlayerSelection } from "~/hooks/data/usePlayerSelection";
import type { PlayerName, Player } from "~/models";

type GameBoardProps = {
    initialGuess: PlayerName;
}

export function GameBoard(props: GameBoardProps): ReactElement {
    const { initialGuess } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();
	const [answer, setAnswer] = useState<Player>({
		displayName: "",
        headshot: "",
		jersey: "",
		height: 0,
		weight: 0,
		dateOfBirth: new Date(),
		debutYear: 0,
		team: {
			displayName: "",
			shortDisplayName: "",
			logo: "",
			abbreviation: "",
			group: {
				isConference: true,
				name: "",
				logo: "",
				abbreviation: "",
                parent: null
			}
		},
		position: {
			name: "",
			displayName: "",
			abbreviation: "",
            parentId: null
		}
	});
    const [guesses, setGuesses] = useState<PlayerName[]>([initialGuess]);

    const { sportsLeague } = useSportContext();

    const { data, isLoading, error} = usePlayerSelection(sportsLeague.sport.toString(), sportsLeague.league.toString());

    useEffect(() => {
        if (data !== undefined) {
            setAnswer(data);
        }
    }, [data]);

    const onSubmit = (guess: PlayerName): void => {
        console.log(`You've guessed ${guess.name}!`);
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
                        <ColorfulBackdrop key={g.name} index={i}>
                            <GuessCard guess={g} answer={answer} />
                        </ColorfulBackdrop>
                    ))}
                </Stack>
            </Stack>
        </Container>
    );
}
