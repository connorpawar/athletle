import {
    Box,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
    useBreakpointValue,
    Heading,
} from "@chakra-ui/react";
import type { ReactElement, ReactNode } from "react";
import {
    FaBalanceScale,
    FaTape,
    FaUserFriends,
    FaTshirt,
    FaAddressBook,
    FaHardHat,
    FaMapMarkerAlt,
} from "react-icons/fa";
import { ErrorToast } from "../Misc/ErrorToast";
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

const toFeetandInches = (inches: number): string => `${Math.floor(inches / 12)} ${Math.round(inches % 12)}'`.toString();

export function GuessCard({ guess, answer }: GuessCardProps): ReactElement {
    const { data, isLoading, error } = usePlayer(guess.id);

    if (isLoading || data === undefined) {
        return <div />;
    }

    const { team, conference, jersey, position, height, weight, age } = guessProximity(data, answer);

    return (
        <>
            <ErrorToast errorMsg={error} />
            <Box px={{ base: 4, sm: 6, md: 12 }} pb="3">
                <Heading size="lg" color="red.400" mt="3">{data.displayName}</Heading>
                <SimpleGrid columns={7} spacing={{ base: 2, lg: 6 }}>
                    <StatsCard
                        title="Team"
                        stat={data.team.shortDisplayName}
                        icon={<FaUserFriends size="1em" />}
                        color={team}
                    />
                    <StatsCard
                        title="Conf."
                        stat={data.team.group.name}
                        icon={<FaMapMarkerAlt size="1em" />}
                        color={conference}
                    />
                    <StatsCard title="#" stat={data.jersey} icon={<FaTshirt size="1em" />} color={jersey} />
                    <StatsCard
                        title="Pos."
                        stat={data.position.abbreviation}
                        icon={<FaHardHat size="1em" />}
                        color={position}
                    />
                    <StatsCard
                        title="Ht."
                        stat={toFeetandInches(data.height)}
                        icon={<FaTape size="1em" />}
                        color={height}
                    />
                    <StatsCard
                        title="Wt."
                        stat={`${data.weight.toString()} lbs`}
                        icon={<FaBalanceScale size="1em" />}
                        color={weight}
                    />
                    <StatsCard
                        title="Age"
                        stat={calculateAge(data.dateOfBirth).toString()}
                        icon={<FaAddressBook size="1em" />}
                        color={age}
                    />
                </SimpleGrid>
            </Box>
        </>
    );
}

function StatsCard(props: StatsCardProps): ReactElement {
    const { title, stat, icon, color } = props;

    const hideIcon = useBreakpointValue(
        {
            base: true,
            sm: true,
            md: false,
        }
    );

    const height = useBreakpointValue(
        {
            base: "10vh",
            sm: "10vh",
            md: "8vh",
        }
    );
    const width = useBreakpointValue(
        {
            base: "13vw",
            sm: "13vw",
            md: "8vw",
        }
    );

    const bgColor = color === "None" ? "white" : color === "Yellow" ? "yellow.400" : "green.400";

    return (
        <Stat
            py="2"
            border="1px solid"
            borderColor={useColorModeValue("gray.800", "gray.500")}
            rounded="lg"
            backgroundColor={bgColor}
            width={width}
            height={height}
        >
            <Flex justifyContent="space-around">
                <Box px={{ base: 0, md: 2 }}>
                    <StatLabel fontWeight="light">{title}</StatLabel>
                    <StatNumber fontSize="1.5vh" fontWeight="medium" wordBreak="break-word">
                        {stat}
                    </StatNumber>
                </Box>
                <Box hidden={hideIcon} my="auto" color={useColorModeValue("gray.800", "gray.200")} alignContent="center">
                    {icon}
                </Box>
            </Flex>
        </Stat>
    );
}
