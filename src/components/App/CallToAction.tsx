import { ChevronDownIcon } from "@chakra-ui/icons";
import type { IconProps } from "@chakra-ui/react";
import {
    Skeleton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Container,
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    Button,
    Image,
    Icon,
    useColorModeValue,
    useBreakpointValue,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import type { ReactElement } from "react";
import { useEffect } from "react";
import { ErrorToast } from "../Misc/ErrorToast";
import { StatsPage } from "../Misc/StatsPage";
import { useSportContext } from "~/contexts/SportContext";
import { useAllLeagues } from "~/hooks/data/useAllLeagues";

export type CallToActionProps = {
    onButtonClick: VoidFunction;
};

export function CallToAction({ onButtonClick }: CallToActionProps): ReactElement {
    const displayImage = useBreakpointValue({ base: true, md: false });
    const { data: leagues, isLoading, error } = useAllLeagues();
    const { isOpen: isStatsOpen, onOpen: onStatsOpen, onClose: onStatsClose } = useDisclosure();
    const { sportsLeague, setSportsLeague } = useSportContext();

    useEffect(() => {
        if (leagues !== undefined && leagues.length > 0) {
            const league = leagues[0];
            setSportsLeague({ id: league.id, sport: league.sport, league: league.name });
        }
    }, [leagues, error, setSportsLeague]);

    return (
        <Container maxW="7xl">
            <Stack
                align="center"
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}
                direction={{ base: "column", md: "row" }}
            >
                <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                    <Heading lineHeight={1.1} fontWeight={600}>
                        <Text
                            as="span"
                            position="relative"
                            fontSize={{ base: "5xl", sm: "6xl", lg: "7xl" }}
                            _after={{
                                content: "''",
                                width: "full",
                                height: "30%",
                                position: "absolute",
                                bottom: 1,
                                left: 0,
                                bg: "red.400",
                                zIndex: -1,
                            }}
                        >
                            Athletle
                        </Text>
                        <br />
                        <Text
                            as="span"
                            color="red.400"
                            fontSize={{ base: "3xl", sm: "4xl", lg: "5xl" }}
                        >
                            The premier athlete guessing game
                        </Text>
                    </Heading>
                    <Text color="gray.500">
                        Welcome to Athletle, the only place to find a daily athlete-based guessing game for all of your
                        favorite sporting leagues. Whether you're a rookie or a pro, Athletle is designed to give all
                        fans a way to compete with each other in any league they choose to see who is MVP.
                    </Text>
                    <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: "column", sm: "row" }}>
                        <Skeleton size="lg" isLoaded={!isLoading} startColor="grey.400" endColor="red.400">
                            <Button
                                rounded="full"
                                size="lg"
                                fontWeight="normal"
                                px={6}
                                colorScheme="red"
                                bg="red.400"
                                _hover={{ bg: "red.500" }}
                                onClick={onButtonClick}
                            >
                                Play
                            </Button>
                        </Skeleton>
                        <Skeleton size="lg" isLoaded={!isLoading} startColor="grey.400" endColor="red.400">
                            <Button
                                rounded="full"
                                size="lg"
                                fontWeight="normal"
                                px={6}
                                colorScheme="red"
                                bg="red.400"
                                _hover={{ bg: "red.500" }}
                                onClick={onStatsOpen}
                            >
                                Statistics
                            </Button>
                        </Skeleton>
                        <Skeleton size="lg" isLoaded={!isLoading} startColor="grey.400" endColor="red.400">
                            <Menu>
                                {({ isOpen }): ReactElement => (
                                    <>
                                        <MenuButton
                                            rounded="full"
                                            size="lg"
                                            fontWeight="normal"
                                            px={6}
                                            isActive={isOpen}
                                            as={Button}
                                            rightIcon={<ChevronDownIcon />}
                                        >
                                            {isOpen ? "Close" : sportsLeague.league}
                                        </MenuButton>
                                        <MenuList>
                                            {leagues?.map((lg) => (
                                                <MenuItem
                                                    key={lg.name}
                                                    onClick={(): void => {
                                                        setSportsLeague({
                                                            id: lg.id,
                                                            sport: lg.sport,
                                                            league: lg.name,
                                                        });
                                                    }}
                                                >
                                                    {lg.name}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </>
                                )}
                            </Menu>
                        </Skeleton>
                    </Stack>
                </Stack>
                <Flex
                    flex={1}
                    justify="center"
                    align="center"
                    position="relative"
                    w="full"
                    hidden={displayImage ?? false}
                >
                    <Blob
                        w="150%"
                        h="150%"
                        position="absolute"
                        top="-20%"
                        left={0}
                        zIndex={-1}
                        color={useColorModeValue("red.50", "red.400")}
                    />
                    <Box
                        position="relative"
                        height="300px"
                        rounded="2xl"
                        boxShadow="2xl"
                        width="full"
                        overflow="hidden"
                    >
                        <Image alt="Hero Image" fit="cover" align="center" w="100%" h="100%" src="./silhouette.jpg" />
                    </Box>
                </Flex>
            </Stack>
            <Modal onClose={onStatsClose} isOpen={isStatsOpen} isCentered={true}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Statistics</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <StatsPage />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onStatsClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <ErrorToast errorMsg={error} />
        </Container>
    );
}

export function Blob(props: IconProps): ReactElement {
    return (
        <Icon width="100%" viewBox="0 0 578 440" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
                fill="currentColor"
            />
        </Icon>
    );
}
