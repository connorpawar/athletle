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
    SlideFade,
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
    FaArrowUp,
    FaArrowDown,
} from "react-icons/fa";
import { ErrorToast } from "../Misc/ErrorToast";
import { usePlayer } from "~/hooks/data/usePlayer";
import type { Player, PlayerName } from "~/models";
import type { ArrowOrientation } from "~/utils/guessProximity";
import { calculateAge, guessProximity } from "~/utils/guessProximity";

export type CardColor = "None" | "Yellow" | "Green";

type StatsCardProps = {
    title: string;
    stat: string;
    icon: ReactNode;
    color: CardColor;
    arrow: ArrowOrientation;
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

    const { team, conference, jersey, position, height, weight, age, arrows } = guessProximity(data, answer);

    return (
        <>
            <ErrorToast errorMsg={error} />
            <Box px={{ base: 4, sm: 6, md: 12 }} mb="4">
                <SlideFade in={true} style={{ zIndex: 10 }}>
                <Heading size="sm" color="red.400">
                    {data.displayName}
                </Heading>
                <SimpleGrid columns={7} spacing={{ base: 2, lg: 6 }}>
                    <StatsCard
                        title="Team"
                        stat={data.team.shortDisplayName}
                        icon={<FaUserFriends size="1em" />}
                        color={team}
                        arrow={arrows[0]}
                    />
                    <StatsCard
                        title="Conf."
                        stat={data.team.group.name}
                        icon={<FaMapMarkerAlt size="1em" />}
                        color={conference}
                        arrow={arrows[1]}
                    />
                    <StatsCard
                        title="#"
                        stat={data.jersey}
                        icon={<FaTshirt size="1em" />}
                        color={jersey}
                        arrow={arrows[2]}
                    />
                    <StatsCard
                        title="Pos."
                        stat={data.position.abbreviation}
                        icon={<FaHardHat size="1em" />}
                        color={position}
                        arrow={arrows[3]}
                    />
                    <StatsCard
                        title="Ht."
                        stat={toFeetandInches(data.height)}
                        icon={<FaTape size="1em" />}
                        color={height}
                        arrow={arrows[4]}
                    />
                    <StatsCard
                        title="Wt."
                        stat={`${data.weight.toString()} lbs`}
                        icon={<FaBalanceScale size="1em" />}
                        color={weight}
                        arrow={arrows[5]}
                    />
                    <StatsCard
                        title="Age"
                        stat={calculateAge(data.dateOfBirth).toString()}
                        icon={<FaAddressBook size="1em" />}
                        color={age}
                        arrow={arrows[6]}
                    />
                </SimpleGrid>
                </SlideFade>
            </Box>
        </>
    );
}

function StatsCard(props: StatsCardProps): ReactElement {
    const { title, stat, icon, color, arrow } = props;

    const hideIcon = useBreakpointValue({
        base: true,
        sm: true,
        md: false,
    });

    const height = useBreakpointValue({
        base: "3.5rem",
    });
    const width = useBreakpointValue({
        base: "3rem",
        sm: "3rem",
        md: "6rem",
        lg: "8rem",
    });
    const fontSize = useBreakpointValue({
        base: "0.6rem",
        sm: "0.7rem",
        md: "0.8rem",
    });
    const labelFontSize = useBreakpointValue({
        base: "0.5rem",
        sm: "0.6rem",
        md: "0.7rem",
    });

    const bgColor = color === "None" ? "white" : color === "Yellow" ? "yellow.400" : "green.400";

    return (
        <Stat
            py="1"
            borderColor={useColorModeValue("gray.800", "gray.500")}
            rounded="lg"
            backgroundColor={bgColor}
            width={width}
            height={height}
        >
            <Flex justifyContent="space-around">
                <Box px={{ base: 0, md: 2 }}>
                    <StatLabel fontSize={labelFontSize} fontWeight="light" wordBreak="break-word">
                        {title}
                    </StatLabel>
                    <StatNumber fontSize={fontSize} fontWeight="medium" wordBreak="break-word">
                        {stat}
                    </StatNumber>
                </Box>
                <Box
                    hidden={hideIcon}
                    my="auto"
                    color={useColorModeValue("gray.800", "gray.200")}
                    alignContent="center"
                >
                    {icon}
                </Box>
                <Box my="0" color={useColorModeValue("gray.800", "gray.200")} alignContent="center">
                    {arrow === "Up" && <FaArrowUp />}
                    {arrow === "Down" && <FaArrowDown />}
                </Box>
            </Flex>
        </Stat>
    );
}
