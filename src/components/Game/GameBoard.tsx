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
    useBreakpointValue,
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
    latestPlayerId: string;
    leagueId: string;
    latestGuesses: PlayerName[];
    isComplete: boolean;
};

export type HistoricalData = {
    leagueId: string;
    gamesPlayed: number;
    currentStreak: number;
    guessDistribution: Map<number, number>;
};

const getUTCDateString = (): string => {
    const date = new Date();
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
};

export function GameBoard(): ReactElement {
    const { sportsLeague } = useSportContext();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isWinOpen, onOpen: onWinOpen, onClose: onWinClose } = useDisclosure();
    const { isOpen: isLoseOpen, onOpen: onLoseOpen, onClose: onLoseClose } = useDisclosure();

    const defaultStoredGuesses: StoredGuesses = {
        date: new Date().toLocaleDateString(),
        latestPlayerId: "id",
        leagueId: sportsLeague.id,
        latestGuesses: [],
        isComplete: false,
    };

    const defaultHistoricalData: HistoricalData = {
        leagueId: sportsLeague.id,
        gamesPlayed: 0,
        currentStreak: 0,
        guessDistribution: new Map<number, number>(),
    };

    const [storedData, setStoredData] = useLocalStorage(
        `storedData-${sportsLeague.id}-${getUTCDateString()}`,
        JSON.stringify(defaultStoredGuesses)
    );
    const [historicalData, setHistoricalData] = useLocalStorage(
        `historicalData-${sportsLeague.id}`,
        JSON.stringify(defaultHistoricalData, mapReplacer)
    );
    const [alreadyPlayedToday, setAlreadyPlayedToday] = useState<boolean>(false);
    const [gamesPlayed, setGamesPlayed] = useState<number>(0);
    const [currentStreak, setCurrentStreak] = useState<number>(0);
    const [guessDistribution, setGuessDistribution] = useState<Map<number, number>>(new Map<number, number>());
    const [init, setInit] = useState(false);
    const [initHist, setInitHist] = useState(false);
    const [initModalOpened, setInitModalOpened] = useState(false);
    const [result, setResult] = useState(false);

    const [answer, setAnswer] = useState<Player>({
        id: "",
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

    const { data, isLoading, error } = usePlayerSelection(sportsLeague.id);

    useEffect(() => {
        if (!init) {
            const guessData = JSON.parse(storedData, mapReviver) as StoredGuesses;
            setGuesses(guessData.latestGuesses);
            if (guessData.isComplete) {
                setAlreadyPlayedToday(true);
            }
        }
        setInit(true);
    }, [storedData, init, setInit]);

    useEffect(() => {
        if (!initHist) {
            const histData = JSON.parse(historicalData, mapReviver) as HistoricalData;
            setGamesPlayed(histData.gamesPlayed);
            setCurrentStreak(histData.currentStreak);
            setGuessDistribution(histData.guessDistribution);
        }
        setInitHist(true);
    }, [historicalData, initHist, setInitHist]);

    useEffect(() => {
        if (data !== undefined) {
            setAnswer(data);
        }
    }, [data]);

    useEffect(() => {
        let complete = false;
        if (guesses.length > 0 && guesses[guesses.length - 1].name === answer.displayName) {
            complete = true;
            if (!initModalOpened) {
                onWinOpen();
                setResult(true);
                setInitModalOpened(true);
            }

            const played = gamesPlayed + (alreadyPlayedToday ? 0 : 1);
            const streak = currentStreak + (alreadyPlayedToday ? 0 : 1);
            const dist = alreadyPlayedToday
                ? guessDistribution
                : guessDistribution.set(guesses.length, guessDistribution.get(guesses.length) ?? 0 + 1);
            setHistoricalData(
                JSON.stringify(
                    {
                        leagueId: sportsLeague.id,
                        gamesPlayed: played,
                        currentStreak: streak,
                        guessDistribution: dist,
                    },
                    mapReplacer
                )
            );
            setGamesPlayed(played);
            setCurrentStreak(streak);
            setGuessDistribution(dist);
            setAlreadyPlayedToday(true);
        } else if (guesses.length > 7) {
            complete = true;
            if (!initModalOpened) {
                onLoseOpen();
                setResult(false);
                setInitModalOpened(true);
            }

            const played = gamesPlayed + (alreadyPlayedToday ? 0 : 1);
            setHistoricalData(
                JSON.stringify(
                    {
                        leagueId: sportsLeague.id,
                        gamesPlayed: played,
                        currentStreak: currentStreak,
                        guessDistribution: guessDistribution,
                    },
                    mapReplacer
                )
            );
            setGamesPlayed(played);
            setAlreadyPlayedToday(true);
        }
        setStoredData(
            JSON.stringify(
                {
                    date: new Date().toLocaleDateString(),
                    latestPlayerId: answer.id,
                    leagueId: sportsLeague.id,
                    latestGuesses: guesses,
                    isComplete: complete,
                },
                mapReplacer
            )
        );
    }, [
        guesses,
        answer,
        onWinOpen,
        setStoredData,
        gamesPlayed,
        alreadyPlayedToday,
        onLoseOpen,
        currentStreak,
        guessDistribution,
        sportsLeague.id,
        setHistoricalData,
        initModalOpened,
    ]);

    const onSubmit = (guess: PlayerName): void => {
        setGuesses((prev) => [...prev, guess]);
    };

    const goHomeWin = (): void => {
        onWinClose();
    };

    const goHomeLose = (): void => {
        onLoseClose();
    };

    const onNavHome = (): void => {
        window.location.reload();
    }

    const barWidth = useBreakpointValue(
        {
            base: "xs",
            sm: "md",
            md: "2xl",
            lg: "4xl",
            xl: "6xl",
        },
        {
            fallback: "sm",
        }
    );

    if (isLoading) {
        return (
            <Center>
                <Spinner size="xl" color="red.500" />
            </Center>
        );
    }

    return (
        <Container maxW="7xl">
            <Stack align="center" spacing={{ base: 8, md: 10 }} direction="column">
                <Stack flex={1} spacing={{ base: 2, md: 5 }}>
                    <ErrorToast errorMsg={error} />
                    <Box mt="4" maxW="xs">
                    <Button onClick={onNavHome} mr="16">
                        Go Home
                    </Button>
                    <Button onClick={initModalOpened ? result ? onWinOpen : onLoseOpen : onOpen}>
                        {initModalOpened ? "View Statistics" : "View Silhouette"}
                    </Button>
                    </Box>
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
                                    guessDistribution={guessDistribution}
                                    gamesPlayed={gamesPlayed}
                                    currentStreak={currentStreak}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={goHomeWin}>Close</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Modal scrollBehavior="inside" onClose={goHomeLose} isOpen={isLoseOpen} isCentered={true}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Better Luck Next Time!</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <WinningCard player={answer} />
                                <GameStatsCard
                                    guesses={guesses}
                                    answer={answer}
                                    guessDistribution={guessDistribution}
                                    gamesPlayed={gamesPlayed}
                                    currentStreak={currentStreak}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={goHomeLose}>Close</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Center>
                        <Heading size="md" color="red.400">
                            {sportsLeague.league}
                        </Heading>
                    </Center>
                    <Box position="relative" display="block">
                        <Box width={barWidth} />
                        <Box position="absolute" zIndex="1" left="0" right="0" mt={8}>
                            <SearchBar submitAction={onSubmit} />
                        </Box>
                        <Text color="red.400" size="xl" fontWeight="bold">
                            {`Guesses : ${guesses.length} / 8`}
                        </Text>
                        <Box pt="96px" minWidth="full">
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
