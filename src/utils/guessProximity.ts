import type { CardColor } from "~/components/Game/GuessCard";
import type { PlayerModel } from "~/types/Domain";

export type GuessProximityResponse = {
	team: CardColor;
	conference: CardColor;
	jersey: CardColor;
	position: CardColor;
	height: CardColor;
	weight: CardColor;
	age: CardColor;
	debuted: CardColor;
}

export type GuessProximity = (
	guess: PlayerModel,
	answer: PlayerModel
) => GuessProximityResponse;

const calculateAge = (dob: Date): number => {
	const ageDifMs = Date.now() - dob.getTime();
	const ageDate = new Date(ageDifMs);
	return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export const guessProximity: GuessProximity = (guess, answer) => {
	let team: CardColor = "None";
	const conference: CardColor = "None";
	let jersey: CardColor = "None";
	let position: CardColor = "None";
	let height: CardColor = "None";
	let weight: CardColor = "None";
	let age: CardColor = "None";
	let debuted: CardColor = "None";

	const guessJerseyNum = parseInt(guess.Jersey, 10);
	const answerJerseyNum = parseInt(answer.Jersey, 10);

	const guessAge = calculateAge(guess.DateOfBirth);
	const answerAge = calculateAge(guess.DateOfBirth);

	if (guess.Team.DisplayName === answer.Team.DisplayName)
		{team = "Green";}

	if (guessJerseyNum === answerJerseyNum)
		{jersey = "Green";}
	else if (Math.abs(guessJerseyNum - answerJerseyNum) < 3)
		{age = "Yellow";}

	if (guess.Position.DisplayName === answer.Position.DisplayName)
		{position = "Green";}

	if (guess.Height === answer.Height)
		{height = "Green";}
	else if (Math.abs(guess.Height - answer.Height) < 10)
		{height = "Yellow";}

	if (guess.Weight === answer.Weight)
		{weight = "Green";}
	else if (Math.abs(guess.Weight - answer.Weight) < 10)
		{weight = "Yellow";}

	if (guessAge === answerAge)
		{age = "Green";}
	else if (Math.abs(guessAge - answerAge) < 3)
		{age = "Yellow";}

	if (guess.DebutYear === answer.DebutYear)
		{debuted = "Green";}
	else if (Math.abs(guess.DebutYear - answer.DebutYear) < 3)
		{debuted = "Yellow";}

	return {
		team,
		conference,
		jersey,
		position,
		height,
		weight,
		age,
		debuted
	}
}