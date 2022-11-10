/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Text, Center, Heading, Stack, Box, SimpleGrid, Button } from "@chakra-ui/react";
import type { ReactElement} from "react";
import { useState } from "react";
import { SuccessToast } from "../Misc/SuccessToast";
import { usePlayer } from "~/hooks/data/usePlayer";
import type { Player, PlayerName } from "~/models";
import { copyScores } from "~/utils/copyScores";

export type GameStatsCardProps = {
    guesses: PlayerName[];
    answer?: Player;
    gamesPlayed: number;
    currentStreak: number;
    guessDistribution: Map<number, number>;
    setToastText?: (s: string) => void;
};

export function GameStatsCard({
    answer,
    guesses,
    gamesPlayed,
    currentStreak,
    guessDistribution,
}: GameStatsCardProps): ReactElement {
    
    const [toastText, setToastText] = useState<string>("");

    const [g1, g2, g3, g4, g5, g6, g7, g8] = guesses;
    
    const d1 = usePlayer(g1?.id ?? "");
    const d2 = usePlayer(g2?.id ?? "");
    const d3 = usePlayer(g3?.id ?? "");
    const d4 = usePlayer(g4?.id ?? "");
    const d5 = usePlayer(g5?.id) ?? "";
    const d6 = usePlayer(g6?.id) ?? "";
    const d7 = usePlayer(g7?.id ?? "");
    const d8 = usePlayer(g8?.id ?? "");

    const fullPlayerData = [d1, d2, d3, d4, d5, d6, d7, d8].map(d => d.data).filter(data => data !== undefined);

    return (
        <Center py={12}>
            <Stack align="left">
                <Heading fontSize="xl" fontFamily="body" color="red.400" fontWeight={500}>
                    Guess Distribution:
                </Heading>
                <SimpleGrid columns={1} spacing={2}>
                    <Box>
                        1 <Box bg="red.400" height="4px" width={`${guessDistribution?.get(1) ?? 0}ex`} />
                    </Box>
                    <Box>
                        2 <Box bg="red.400" height="4px" width={`${guessDistribution?.get(2) ?? 0}ex`} />
                    </Box>
                    <Box>
                        3 <Box bg="red.400" height="4px" width={`${guessDistribution?.get(3) ?? 0}ex`} />
                    </Box>
                    <Box>
                        4 <Box bg="red.400" height="4px" width={`${guessDistribution?.get(4) ?? 0}ex`} />
                    </Box>
                    <Box>
                        5 <Box bg="red.400" height="4px" width={`${guessDistribution?.get(5) ?? 0}ex`} />
                    </Box>
                    <Box>
                        6 <Box bg="red.400" height="4px" width={`${guessDistribution?.get(6) ?? 0}ex`} />
                    </Box>
                    <Box>
                        7 <Box bg="red.400" height="4px" width={`${guessDistribution?.get(7) ?? 0}ex`} />
                    </Box>
                    <Box>
                        8 <Box bg="red.400" height="4px" width={`${guessDistribution?.get(8) ?? 0}ex`} />
                    </Box>
                </SimpleGrid>
                <Text color="red.400" size="xl" fontWeight="bold">
                    {`Current Streak : ${currentStreak} 🔥`}
                </Text>
                <Text color="red.400" size="xl" fontWeight="bold">
                    {`Total Games Played : ${gamesPlayed} 💝`}
                </Text>
                {answer !== undefined && (
                    <Button
                        mt="24"
                        onClick={(): unknown => copyScores(fullPlayerData as Player[], answer, setToastText)}>
                        Share Your Score!
                    </Button>)}
            </Stack>
            <SuccessToast msg={toastText} />
        </Center>
    );
}
