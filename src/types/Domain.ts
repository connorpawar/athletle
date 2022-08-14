export interface PlayerModel {
	DisplayName: string;
	Headshot?: string;
	Jersey: string;
	Height: number;
	Weight: number;
	DateOfBirth: Date;
	DebutYear: number;
	Team: TeamModel;
	Position: PositionModel;
}

export interface TeamModel {
	DisplayName: string;
	ShortDisplayName: string;
	Abbreviation: string;
	Logo: string;
	Group: GroupModel;
}

export interface PositionModel {
	Name: string;
	DisplayName: string;
	Abbreviation: string;
	Parent?: PositionModel
}

export interface GroupModel {
	IsConference: boolean;
	Name: string;
	Abbreviation: string;
	Logo: string;
	Parent: GroupModel;
}