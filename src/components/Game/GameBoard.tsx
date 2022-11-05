import {
    Box,
    Button,
    Center,
    Container,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    useDisclosure,
    Spinner,
} from "@chakra-ui/react";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { SearchBar } from "../App/SearchBar";
import { ColorfulBackdrop } from "../Misc/ColorfulBackdrop";
import { ErrorToast } from "../Misc/ErrorToast";
import { GuessCard } from "./GuessCard";
import { PlayerCard } from "./PlayerCard";
import { useSportContext } from "~/contexts/SportContext";
import { usePlayerSelection } from "~/hooks/data/usePlayerSelection";
import type { PlayerName, Player } from "~/models";
import { WinningCard } from "./WinningCard";

export function GameBoard(): ReactElement {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isWinOpen, onOpen: onWinOpen, onClose: onWinClose } = useDisclosure();

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
                parent: null,
            },
        },
        position: {
            name: "",
            displayName: "",
            abbreviation: "",
            parentId: null,
        },
    });
    const [guesses, setGuesses] = useState<PlayerName[]>([]);

    const { sportsLeague } = useSportContext();

    const { data, isLoading, error } = usePlayerSelection(sportsLeague.id);

    useEffect(() => {
        if (data !== undefined) {
            setAnswer(data);
        }
    }, [data]);

    useEffect(() => {
        if( guesses.length > 1 && guesses[guesses.length - 1].name === answer.displayName ) {
            onWinOpen();
            setGuesses([]);
        }
    }, [guesses, answer, onWinOpen]);

    const onSubmit = (guess: PlayerName): void => {
        console.log(`You've guessed ${guess.name}!`);
        setGuesses((prev) => [...prev, guess]);
    };

    if (isLoading) {
        return <Center><Spinner size='xl' color="red.500"/></Center>
    }

    return (
        <Container maxW="7xl">
            <Stack
                align="center"
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}
                direction={{ base: "column", md: "row" }}
            >
                <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                    <ErrorToast errorMsg={error} />
                    <Button maxW="sm" onClick={onOpen}>
                        View Silhouette
                    </Button>
                    <Modal onClose={onClose} isOpen={isOpen} isCentered={true}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Who is it?</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <PlayerCard image={answer.headshot} />
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={onClose}>Close</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Modal onClose={onWinClose} isOpen={isWinOpen} isCentered={true}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>You've got it!</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <WinningCard player={answer} />
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={onClose}>Close</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Center mb="12em">
                        <Heading color="red.400">{sportsLeague.league}</Heading>
                    </Center>
                    <Box
                        position="relative"
                        display="block"
                    >
                        <Box
                            position="absolute"
                            zIndex="1"
                        >
                            <SearchBar submitAction={onSubmit} />
                        </Box>
                        <Box
                            paddingTop="150px"
                        >
                        {guesses.map((g, i) => (
                            <ColorfulBackdrop key={g.name} index={i}>
                                <GuessCard guess={g} answer={answer} />
                            </ColorfulBackdrop>
                        ))}
                        </Box>
                    </Box>
                </Stack>
            </Stack>
        </Container>
    );
}
