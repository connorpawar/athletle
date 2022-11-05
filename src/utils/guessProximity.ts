import type { CardColor } from "~/components/Game/GuessCard";
import type { Player } from "~/models";

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
	guess: Player,
	answer: Player
) => GuessProximityResponse;

export const calculateAge = (dob: Date): number => {
	const ageDifMs = Date.now() - new Date(dob).getTime();
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

	const guessJerseyNum = parseInt(guess.jersey, 10);
	const answerJerseyNum = parseInt(answer.jersey, 10);

	const guessAge = calculateAge(guess.dateOfBirth);
	const answerAge = calculateAge(answer.dateOfBirth);

	if (guess.displayName === answer.displayName)
		{team = "Green";}

	if (guess.team.group.name === answer.team.group.name)
		{team = "Green";}

	if (guess.team.displayName === answer.team.displayName)
		{team = "Green";}

	if (guessJerseyNum === answerJerseyNum)
		{jersey = "Green";}
	else if (Math.abs(guessJerseyNum - answerJerseyNum) < 5)
		{age = "Yellow";}

	if (guess.position.displayName === answer.position.displayName)
		{position = "Green";}

	if (guess.height === answer.height)
		{height = "Green";}
	else if (Math.abs(guess.height - answer.height) < 3)
		{height = "Yellow";}

	if (guess.weight === answer.weight)
		{weight = "Green";}
	else if (Math.abs(guess.weight - answer.weight) < 10)
		{weight = "Yellow";}

	if (guessAge === answerAge)
		{age = "Green";}
	else if (Math.abs(guessAge - answerAge) < 3)
		{age = "Yellow";}

	if (guess.debutYear === answer.debutYear)
		{debuted = "Green";}
	else if (Math.abs(guess.debutYear - answer.debutYear) < 3)
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