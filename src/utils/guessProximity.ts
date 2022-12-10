import type { CardColor } from "~/components/Game/GuessCard";
import type { Player } from "~/models";

export type ArrowOrientation = "Up" | "Down" | "None";

export type GuessProximityResponse = {
    team: CardColor;
    conference: CardColor;
    jersey: CardColor;
    position: CardColor;
    height: CardColor;
    weight: CardColor;
    age: CardColor;
    debuted: CardColor;
    arrows: ArrowOrientation[];
    asEmoji: string;
};

export type GuessProximity = (guess: Player, answer: Player) => GuessProximityResponse;

export const calculateAge = (dob: Date): number => {
    const ageDifMs = Date.now() - new Date(dob).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const toEmoji = (color: CardColor): string => (color === "Green" ? "🟢" : color === "Yellow" ? "🟡" : "⚪");

export const guessProximity: GuessProximity = (guess, answer) => {
    let team: CardColor = "None";
    let conference: CardColor = "None";
    let jersey: CardColor = "None";
    let position: CardColor = "None";
    let height: CardColor = "None";
    let weight: CardColor = "None";
    let age: CardColor = "None";
    let debuted: CardColor = "None";
    const arrows: ArrowOrientation[] = ["None", "None", "None", "None", "None", "None", "None", "None"];

    const guessJerseyNum = parseInt(guess.jersey, 10);
    const answerJerseyNum = parseInt(answer.jersey, 10);

    const guessAge = calculateAge(guess.dateOfBirth);
    const answerAge = calculateAge(answer.dateOfBirth);

    if (guess.team.displayName === answer.team.displayName) {
        team = "Green";
    }

    const conferenceGuess = guess.team.group.parent?.name ?? guess.team.group.name.slice(0, 3);
    const conferenceAnswer = guess.team.group.parent?.name ?? guess.team.group.name.slice(0, 3);

    if (guess.team.group.name === answer.team.group.name) {
        conference = "Green";
    } else if (conferenceGuess === conferenceAnswer) {
        conference = "Yellow";
    }

    if (guessJerseyNum === answerJerseyNum) {
        jersey = "Green";
    } else if (Math.abs(guessJerseyNum - answerJerseyNum) < 5) {
        arrows[2] = guessJerseyNum > answerJerseyNum ? "Down" : "Up";
        jersey = "Yellow";
    } else {
		arrows[2] = guessJerseyNum > answerJerseyNum ? "Down" : "Up";
	}

    const positionGroupGuess = guess.team.group.parent?.name ?? guess.team.group.name.slice(0, 3);
    const positionGroupAnswer = guess.team.group.parent?.name ?? guess.team.group.name.slice(0, 3);

    if (guess.position.displayName === answer.position.displayName) {
        position = "Green";
    } else if (positionGroupGuess === positionGroupAnswer) {
        position = "Yellow";
    }

    if (guess.height === answer.height) {
        height = "Green";
    } else if (Math.abs(guess.height - answer.height) < 3) {
        arrows[4] = guess.height > answer.height ? "Down" : "Up";
        height = "Yellow";
    } else {
		arrows[4] = guess.height > answer.height ? "Down" : "Up";
	}

    if (guess.weight === answer.weight) {
        weight = "Green";
    } else if (Math.abs(guess.weight - answer.weight) < 10) {
        arrows[5] = guess.weight > answer.weight ? "Down" : "Up";
        weight = "Yellow";
    } else {
		arrows[5] = guess.weight > answer.weight ? "Down" : "Up";
	}

    if (guessAge === answerAge) {
        age = "Green";
    } else if (Math.abs(guessAge - answerAge) < 3) {
        arrows[6] = guessAge > answerAge ? "Down" : "Up";
        age = "Yellow";
    } else {
		arrows[6] = guessAge > answerAge ? "Down" : "Up";
	}

    if (guess.debutYear === answer.debutYear) {
        debuted = "Green";
    } else if (Math.abs(guess.debutYear - answer.debutYear) < 3) {
		arrows[7] = guess.debutYear > answer.debutYear ? "Down" : "Up";
        debuted = "Yellow";
    } else {
		arrows[7] = guess.debutYear > answer.debutYear ? "Down" : "Up";
	}
	

    return {
        team,
        conference,
        jersey,
        position,
        height,
        weight,
        age,
        debuted,
        arrows,
        asEmoji: `${
            toEmoji(team) +
            toEmoji(conference) +
            toEmoji(jersey) +
            toEmoji(position) +
            toEmoji(height) +
            toEmoji(weight) +
            toEmoji(age)
        }`,
    };
};
