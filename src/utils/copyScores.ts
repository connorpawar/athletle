import { guessProximity } from "./guessProximity";
import type { Player } from "~/models";

export const copyScores = async (guesses: Player[], answer: Player, setToastText: (s: string) => void): Promise<void> => {

    const colors = guesses.map((g) => guessProximity(g, answer));

    const text = `Athletle ${new Date().toLocaleDateString()}\n${"".concat(...colors.map((c) => `${c.asEmoji}\n`))}`;
    
    try {
        await navigator.clipboard.writeText(text);
        console.log(text);
        setToastText("Copied your score!")
      } catch(err) {
          console.error(err);
      }
}