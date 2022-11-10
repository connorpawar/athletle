import type { ReactElement} from "react";
import { useEffect, useState } from "react";
import type { StoredGuesses } from "../Game/GameBoard";
import { GameStatsCard } from "../Game/GameStatsCard";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import type { PlayerName } from "~/models";
import { mapReplacer, mapReviver } from "~/utils/mapHelpers";

export function StatsPage(): ReactElement {
    const defaultStoredGuesses: StoredGuesses = {
        date: new Date().toLocaleDateString(),
        latestGuesses: [],
        gamesPlayed: 0,
        currentStreak: 0,
        guessDistribution: new Map<number, number>(),
    };

    const [storedData] = useLocalStorage("storedData", JSON.stringify(defaultStoredGuesses, mapReplacer));
    const [data, setData] = useState<StoredGuesses>(defaultStoredGuesses);
    
    useEffect(() => {
        const guessData = JSON.parse(storedData, mapReviver) as StoredGuesses;
        setData(guessData);
    }, [storedData]);
    
    return (
        <GameStatsCard guesses={[] as PlayerName[]} gamesPlayed={data.gamesPlayed} currentStreak={data.currentStreak} guessDistribution={data.guessDistribution} />
    );
}
