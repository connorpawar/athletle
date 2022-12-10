import { guessProximity } from "./guessProximity";
import type { Player } from "~/models";

export const copyScores = async (guesses: Player[], answer: Player, leagueName: string, setToastText: (s: string) => void): Promise<void> => {

    const colors = guesses.map((g) => guessProximity(g, answer));

    const differenceInTime = Date.now() - new Date("2022-12-01 00:00:00 UTC").getTime();
    const daysSinceBeginning = Math.floor(differenceInTime / (1000 * 3600 * 24));

    const text = `https://athletle.netlify.app\n${leagueName}\n#${daysSinceBeginning}\n${"".concat(...colors.map((c) => `${c.asEmoji}\n`))}`;
    
    try {
        await navigator.clipboard.writeText(text);
        console.log(text);
        setToastText("Copied your score!");
        setToastText("");
      } catch(err) {
          console.error(err);
      }
}