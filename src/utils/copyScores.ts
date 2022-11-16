import { guessProximity } from "./guessProximity";
import type { Player } from "~/models";

export const copyScores = async (guesses: Player[], answer: Player, leagueName: string, setToastText: (s: string) => void): Promise<void> => {

    const colors = guesses.map((g) => guessProximity(g, answer));

    const text = `https://athletle.netlify.app\n${new Date().toLocaleDateString()}\n${leagueName}\n${"".concat(...colors.map((c) => `${c.asEmoji}\n`))}`;
    
    try {
        await navigator.clipboard.writeText(text);
        console.log(text);
        setToastText("Copied your score!");
        setToastText("");
      } catch(err) {
          console.error(err);
      }
}