import { Box, Flex, SimpleGrid, Stat, StatLabel, StatNumber, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";
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

interface StatsCardProps {
    title: string;
    stat: string;
    icon: ReactNode;
}

import { PlayerModel } from "~/types/Domain";

export interface GuessCardProps {
    guess: PlayerModel;
}

export function GuessCard({ guess }: GuessCardProps) {
    return (
        <Box mx={"auto"} px={{ base: 2, sm: 12, md: 17 }}>
            <SimpleGrid columns={9} spacing={{ base: 2, lg: 6 }}>
                <StatsCard title={"Name"} stat={guess.DisplayName} icon={<></>} />
                <StatsCard title={"Team"} stat={guess.Team.ShortDisplayName} icon={<FaUserFriends size={"1em"} />} />
                <StatsCard title={"Conf."} stat={"7"} icon={<FaMapMarkerAlt size={"1em"} />} />
                <StatsCard title={"Jersey"} stat={"7"} icon={<FaTshirt size={"1em"} />} />
                <StatsCard title={"Pos."} stat={"7"} icon={<FaHardHat size={"1em"} />} />
                <StatsCard title={"Height"} stat={"7"} icon={<FaTape size={"1em"} />} />
                <StatsCard title={"Weight"} stat={"7"} icon={<FaBalanceScale size={"1em"} />} />
                <StatsCard title={"Age"} stat={"7"} icon={<FaAddressBook size={"1em"} />} />
                <StatsCard title={"Debuted"} stat={"7"} icon={<FaCalendar size={"1em"} />} />
            </SimpleGrid>
        </Box>
    );
}

const StatsCard = (props: StatsCardProps) => {
    const { title, stat, icon } = props;
    return (
        <Stat
            px={{ base: 1, md: 2 }}
            py={"5"}
            shadow={"xl"}
            border={"1px solid"}
            borderColor={useColorModeValue("gray.800", "gray.500")}
            rounded={"lg"}
        >
            <Flex justifyContent={"space-between"}>
                <Box pl={{ base: 1, md: 2 }}>
                    <StatLabel fontWeight={"light"}>{title}</StatLabel>
                    <StatNumber fontSize={"md"} fontWeight={"medium"}>
                        {stat}
                    </StatNumber>
                </Box>
                <Box my={"auto"} color={useColorModeValue("gray.800", "gray.200")} alignContent={"center"}>
                    {icon}
                </Box>
            </Flex>
        </Stat>
    );
};
