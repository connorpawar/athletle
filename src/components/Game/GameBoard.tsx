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
    Text,
} from "@chakra-ui/react";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { SearchBar } from "../App/SearchBar";
import { ColorfulBackdrop } from "../Misc/ColorfulBackdrop";
import { ErrorToast } from "../Misc/ErrorToast";
import { GameStatsCard } from "./GameStatsCard";
import { GuessCard } from "./GuessCard";
import { PlayerCard } from "./PlayerCard";
import { WinningCard } from "./WinningCard";
import { useSportContext } from "~/contexts/SportContext";
import { usePlayerSelection } from "~/hooks/data/usePlayerSelection";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import type { PlayerName, Player } from "~/models";
import { mapReplacer, mapReviver } from "~/utils/mapHelpers";

export type StoredGuesses = {
    date: string;
    latestGuesses: PlayerName[];
    gamesPlayed: number;
    currentStreak: number;
    guessDistribution: Map<number, number>;
};

export function GameBoard(): ReactElement {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isWinOpen, onOpen: onWinOpen, onClose: onWinClose } = useDisclosure();
    const { isOpen: isLoseOpen, onOpen: onLoseOpen, onClose: onLoseClose } = useDisclosure();

    const defaultStoredGuesses: StoredGuesses = {
        date: new Date().toLocaleDateString(),
        latestGuesses: [],
        gamesPlayed: 0,
        currentStreak: 0,
        guessDistribution: new Map<number, number>()
    };

    const [storedData, setStoredData] = useLocalStorage("storedData", JSON.stringify(defaultStoredGuesses, mapReplacer));
    const [alreadyPlayedToday, setAlreadyPlayedToday] = useState<boolean>(false);
    const [gamesPlayed, setGamesPlayed] = useState<number>(0);
    const [currentStreak, setCurrentStreak] = useState<number>(0);
    const [guessDistribution, setGuessDistribution] = useState<Map<number, number>>(new Map<number, number>());

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
        const guessData = JSON.parse(storedData, mapReviver) as StoredGuesses;
        const today = new Date().toLocaleDateString();
        if (guessData.date === today) {
            setGuesses(guessData.latestGuesses);
            setAlreadyPlayedToday(true);
        }
        setGamesPlayed(guessData.gamesPlayed);
        setCurrentStreak(guessData.currentStreak);
        setGuessDistribution(guessData.guessDistribution)
    }, [storedData]);

    useEffect(() => {
        if (data !== undefined) {
            setAnswer(data);
        }
    }, [data]);

    useEffect(() => {
        if (guesses.length > 0 && guesses[guesses.length - 1].name === answer.displayName) {
            onWinOpen();
            setStoredData(
                JSON.stringify({
                    date: new Date().toLocaleDateString(),
                    latestGuesses: guesses,
                    gamesPlayed: gamesPlayed + (alreadyPlayedToday ? 0 : 1),
                    currentStreak: currentStreak + (alreadyPlayedToday ? 0 : 1),
                    guessDistribution: guessDistribution.set(
                        guesses.length,
                        guessDistribution.get(guesses.length) ?? 0 + 1
                    )
                }, mapReplacer)
            );
        } else if (guesses.length > 7) {
            onLoseOpen();
            setStoredData(
                JSON.stringify({
                    date: new Date().toLocaleDateString(),
                    latestGuesses: guesses,
                    gamesPlayed: gamesPlayed + (alreadyPlayedToday ? 0 : 1),
                    currentStreak: 0,
                    guessDistribution: guessDistribution
                }, mapReplacer)
            );
            setAlreadyPlayedToday(true);
            setGuesses([]);
        }
    }, [guesses, answer, onWinOpen, setStoredData, gamesPlayed, alreadyPlayedToday, onLoseOpen, currentStreak, guessDistribution]);

    const onSubmit = (guess: PlayerName): void => {
        setGuesses((prev) => [...prev, guess]);
    };

    const goHomeWin = (): void => {
        onWinClose();
        window.location.reload();
    };

    const goHomeLose = (): void => {
        onLoseClose();
        window.location.reload();
    };

    if (isLoading) {
        return (
            <Center>
                <Spinner size="xl" color="red.500" />
            </Center>
        );
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
                    <Modal onClose={goHomeWin} isOpen={isWinOpen} isCentered={true}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>You've got it!</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <WinningCard player={answer} />
                                <GameStatsCard
                                    guesses={guesses}
                                    answer={answer}
                                    guessDistribution={
                                        guessDistribution
                                    }
                                    gamesPlayed={gamesPlayed}
                                    currentStreak={currentStreak}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={goHomeWin}>Close</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Modal onClose={goHomeLose} isOpen={isLoseOpen} isCentered={true}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Better Luck Next Time!</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <WinningCard player={answer} />
                                <GameStatsCard
                                    guesses={guesses}
                                    answer={answer}
                                    guessDistribution={
                                        guessDistribution
                                    }
                                    gamesPlayed={gamesPlayed}
                                    currentStreak={currentStreak}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={goHomeLose}>Close</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Center mb="12em">
                        <Heading color="red.400">{sportsLeague.league}</Heading>
                    </Center>
                    <Box position="relative" display="block">
                        <Box position="absolute" zIndex="1" left="0" right="0" mt={8}>
                            <SearchBar submitAction={onSubmit} />
                        </Box>
                        <Text color="red.400" size="xl" fontWeight="bold">
                            {`Guesses : ${guesses.length} / 8`}
                        </Text>
                        <Box paddingTop="128px" overflowX="auto" minWidth="full">
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
