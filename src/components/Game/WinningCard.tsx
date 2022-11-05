import { Box, Center, useColorModeValue, Heading, Stack } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { Silhouette } from "~/components/Misc/Silhouette";
import type { Player } from "~/models";

export type WinningCardProps = {
    player: Player;
};

export function WinningCard({ player }: WinningCardProps): ReactElement {
    return (
        <Center py={12}>
            <Box
                role="group"
                p={6}
                maxW="330px"
                w="full"
                bg={useColorModeValue("white", "gray.800")}
                boxShadow="2xl"
                rounded="lg"
                pos="relative"
                zIndex={1}
            >
                <Box
                    rounded="lg"
                    mt={-12}
                    pos="relative"
                    height="230px"
                    _after={{
                        transition: "all .3s ease",
                        content: '""',
                        w: "full",
                        h: "full",
                        pos: "absolute",
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${player.headshot})`,
                        filter: "blur(15px)",
                        zIndex: -1,
                    }}
                >
                    <Silhouette height={230} width={282} objectFit="contain" src={player.headshot} showOriginal={true} />
                </Box>
                <Stack pt={10} align="center">
                    {/* <Text color="gray.500" fontSize="sm" textTransform="uppercase">
                        Do you know who this is this?
                    </Text> */}
                    <Heading fontSize="2xl" fontFamily="body" fontWeight={500}>
                        {player.displayName}
                    </Heading>
                </Stack>
            </Box>
        </Center>
    );
}
