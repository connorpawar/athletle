export interface Player {
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

export interface Position {
	Id: string;
	Name: string;
	DisplayName: string;
	Abbreviation: string;
	Leaf: boolean;
	ParentId: string;
	LeagueId: string;
}

export interface Group {
	Id: string;
	Name: string;
	Abbreviation: string;
	LogoLink: string;
	IsConference: boolean;
	ParentId: string;
	LeagueId: string;
}

export interface Team {
	Id: string;
	DisplayName: string;
	ShortDisplayName: string;
	Abbreviation: string;
	LogoLink: string;
	Active: boolean;
	GroupId: string;
}

export interface League {
	Id: string;
	Name: string;
	Abbreviation: string;
	Sport: string;
	LogoLink: string;
}

export interface Status {
	Id: string;
	Name: string;
}

export interface EspnStatus {
	Id: string;
	EspnId: number;
	StatusId: string;
}

export interface EspnTeam {
	Id: string;
	EspnId: number;
	EspnUid: string;
	EspnGuid: string;
	TeamId: string;
	EspnGroupId: string;
}

export interface EspnPlayer {
	Id: string;
	EspnId: number;
	EspnUid: string;
	EspnGuid: string;
	PlayerId: string;
	EspnTeamId: string;
	EspnCollegeId: string;
	EspnPositionId: string;
}

export interface EspnPosition {
	Id: string;
	EspnId: number;
	PositionId: string;
}

export interface EspnGroup {
	Id: string;
	EspnId: number;
	EspnUid: string;
	EspnGuid: string;
	GroupId: string;
	ParentEspnGroupId: string;
}

export interface EspnLeague {
	Id: string;
	EspnId: number;
	EspnUid: string;
	EspnGuid: string;
	LeagueId: string;
}