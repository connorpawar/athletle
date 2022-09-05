import { CardColor } from "~/components/Game/GuessCard";
import { PlayerModel } from "~/types/Domain";

// <StatsCard
//                     title={"Team"}
//                     stat={guess.Team.ShortDisplayName}
//                     icon={<FaUserFriends size={"1em"} />}
//                     color="None"
//                 />
//                 <StatsCard title="Conf." stat={"7"} icon={<FaMapMarkerAlt size={"1em"} />} color="None" />
//                 <StatsCard title="Jersey" stat={"7"} icon={<FaTshirt size={"1em"} />} color="Yellow" />
//                 <StatsCard title="Pos." stat={"7"} icon={<FaHardHat size={"1em"} />} color="None" />
//                 <StatsCard title="Height" stat={"7"} icon={<FaTape size={"1em"} />} color="Green" />
//                 <StatsCard title="Weight" stat={"7"} icon={<FaBalanceScale size={"1em"} />} color="None" />
//                 <StatsCard title="Age" stat={"7"} icon={<FaAddressBook size={"1em"} />} color="None" />
//                 <StatsCard title="Debuted"

export interface GuessProximityResponse {
	team: CardColor,
	conference: CardColor,
	jersey: CardColor,
	position: CardColor,
	height: CardColor,
	weight: CardColor,
	age: CardColor,
	debuted: CardColor
};

export type GuessProximity = (
	guess: PlayerModel,
	answer: PlayerModel
) => GuessProximityResponse;

export const guessProximity: GuessProximity = (guess, answer) => {
	let team: CardColor = "None";
	let conference: CardColor = "None";
	let jersey: CardColor = "None";
	let position: CardColor = "None";
	let height: CardColor = "None";
	let weight: CardColor = "None";
	let age: CardColor = "None";
	let debuted: CardColor = "None";

	if (guess.Team == answer.Team)
		team = "Green";

	if (guess.Jersey == answer.Jersey)
		jersey = "Green";
	

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