import type { ReactElement} from "react";
import { useEffect, useState } from "react";
import type { HistoricalData } from "../Game/GameBoard";
import { GameStatsCard } from "../Game/GameStatsCard";
import { useSportContext } from "~/contexts/SportContext";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import type { PlayerName } from "~/models";
import { mapReplacer, mapReviver } from "~/utils/mapHelpers";

export function StatsPage(): ReactElement {
    const { sportsLeague } = useSportContext();

    const defaultHistoricalData: HistoricalData = {
        leagueId: sportsLeague.id,
        gamesPlayed: 0,
        currentStreak: 0,
        guessDistribution: new Map<number, number>(),
    };

    const [storedData] = useLocalStorage(`historicalData-${sportsLeague.id}`, JSON.stringify(defaultHistoricalData, mapReplacer));
    const [data, setData] = useState<HistoricalData>(defaultHistoricalData);
    
    useEffect(() => {
        const guessData = JSON.parse(storedData, mapReviver) as HistoricalData;
        setData(guessData);
    }, [storedData]);
    
    return (
        <GameStatsCard guesses={[] as PlayerName[]} gamesPlayed={data.gamesPlayed} currentStreak={data.currentStreak} guessDistribution={data.guessDistribution} />
    );
}
