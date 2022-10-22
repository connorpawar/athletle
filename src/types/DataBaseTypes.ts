export type Player = {
	Id: string;
	FirstName: string;
	LastName: string;
	DisplayName: string;
	Sport: number;
	Weight: number;
	Height: number;
	DateOfBirth: Date;
	DebutYear: number;
	HeadShotLink: string;
	Jersey: string;
	Active: string;
	StatusId: string;
	CollegeId: string;
	TeamId: string;
	PositionId: string;
}

export type Position = {
	Id: string;
	Name: string;
	DisplayName: string;
	Abbreviation: string;
	Leaf: boolean;
	ParentId: string;
	LeagueId: string;
}

export type Group = {
	Id: string;
	Name: string;
	Abbreviation: string;
	LogoLink: string;
	IsConference: boolean;
	ParentId: string;
	LeagueId: string;
}

export type Team = {
	Id: string;
	DisplayName: string;
	ShortDisplayName: string;
	Abbreviation: string;
	LogoLink: string;
	Active: boolean;
	GroupId: string;
}

export type League = {
	Id: string;
	Name: string;
	Abbreviation: string;
	Sport: string;
	LogoLink: string;
}

export type Status = {
	Id: string;
	Name: string;
}

export type EspnStatus = {
	Id: string;
	EspnId: number;
	StatusId: string;
}

export type EspnTeam = {
	Id: string;
	EspnId: number;
	EspnUid: string;
	EspnGuid: string;
	TeamId: string;
	EspnGroupId: string;
}

export type EspnPlayer = {
	Id: string;
	EspnId: number;
	EspnUid: string;
	EspnGuid: string;
	PlayerId: string;
	EspnTeamId: string;
	EspnCollegeId: string;
	EspnPositionId: string;
}

export type EspnPosition = {
	Id: string;
	EspnId: number;
	PositionId: string;
}

export type EspnGroup = {
	Id: string;
	EspnId: number;
	EspnUid: string;
	EspnGuid: string;
	GroupId: string;
	ParentEspnGroupId: string;
}

export type EspnLeague = {
	Id: string;
	EspnId: number;
	EspnUid: string;
	EspnGuid: string;
	LeagueId: string;
}