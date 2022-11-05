import { Box, Flex, SimpleGrid, Stat, StatLabel, StatNumber, useColorModeValue } from "@chakra-ui/react";
import type { ReactElement, ReactNode } from "react";
import {
    FaBalanceScale,
    FaTape,
    FaUserFriends,
    FaCalendar,
    FaTshirt,
    FaAddressBook,
    FaHardHat,
    FaMapMarkerAlt,
} from "react-icons/fa";
import { ErrorToast } from "../Misc/ErrorToast";
import { useSportContext } from "~/contexts/SportContext";
import { usePlayer } from "~/hooks/data/usePlayer";
import type { Player, PlayerName } from "~/models";
import { calculateAge, guessProximity } from "~/utils/guessProximity";

export type CardColor = "None" | "Yellow" | "Green";

type StatsCardProps = {
    title: string;
    stat: string;
    icon: ReactNode;
    color: CardColor;
};

export type GuessCardProps = {
    guess: PlayerName;
    answer: Player;
};

const toFeetandInches = (inches: number): string => 
    (`${Math.floor(inches/12)} ${  Math.round(inches%12)}'`).toString()

export function GuessCard({ guess, answer }: GuessCardProps): ReactElement {
    const { data, isLoading, error } = usePlayer(guess.id);

    if (isLoading || (data === undefined)) {
        return <div />;
    }

    const {
        team,
		conference,
		jersey,
		position,
		height,
		weight,
		age
    } = guessProximity(data, answer);

    return (
        <>
            <ErrorToast errorMsg={error} />
            <Box px={{ base: 2, sm: 12, md: 17 }}>
                <SimpleGrid marginX="auto" columns={8} spacing={{ base: 2, lg: 6 }}>
                    <StatsCard title="Name" stat={data.displayName} icon={<div />} color="None" />
                    <StatsCard
                        title="Team"
                        stat={data.team.shortDisplayName}
                        icon={<FaUserFriends size="1em" />}
                        color={team}
                    />
                    <StatsCard title="Conf." stat={data.team.group.name} icon={<FaMapMarkerAlt size="1em" />} color={conference} />
                    <StatsCard title="Jersey" stat={data.jersey} icon={<FaTshirt size="1em" />} color={jersey} />
                    <StatsCard title="Pos." stat={data.position.abbreviation} icon={<FaHardHat size="1em" />} color={position} />
                    <StatsCard title="Height" stat={toFeetandInches(data.height)} icon={<FaTape size="1em" />} color={height} />
                    <StatsCard title="Weight" stat={`${data.weight.toString()} lbs`} icon={<FaBalanceScale size="1em" />} color={weight} />
                    <StatsCard title="Age" stat={
                        calculateAge(data.dateOfBirth).toString()
                    }  icon={<FaAddressBook size="1em" />} color={age} />
                </SimpleGrid>
            </Box>
        </>
    );
}

function StatsCard(props: StatsCardProps): ReactElement {
    const { title, stat, icon, color } = props;

    const bgColor = color === "None" ? undefined : color === "Yellow" ? "yellow.400" : "green.400";

    return (
        <Stat
            px={{ base: 1, md: 2 }}
            py="5"
            shadow="xl"
            border="1px solid"
            borderColor={useColorModeValue("gray.800", "gray.500")}
            rounded="lg"
            backgroundColor={bgColor}
            width="7vw"
            height="14vh"
        >
            <Flex justifyContent="space-around">
                <Box pl={{ base: 1, md: 2 }}>
                    <StatLabel fontWeight="light">{title}</StatLabel>
                    <StatNumber fontSize="2vh" fontWeight="medium" wordBreak="break-word">
                        {stat}
                    </StatNumber>
                </Box>
                <Box my="auto" color={useColorModeValue("gray.800", "gray.200")} alignContent="center">
                    {icon}
                </Box>
            </Flex>
        </Stat>
    );
}
