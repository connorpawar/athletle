import {
    Container,
    useBreakpointValue,
    Text,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tr,
    HStack,
} from "@chakra-ui/react";
import FuzzySearch from "fuzzy-search";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { ErrorToast } from "../Misc/ErrorToast";
import type { Option } from "~/components/Misc/AutoComplete";
import { Autocomplete } from "~/components/Misc/AutoComplete";
import { useSportContext } from "~/contexts/SportContext";
import { useAllPlayerNames } from "~/hooks/data/useAllPlayerNames";
import type { PlayerName } from "~/models/PlayerName";

type SearchBarProps = {
    submitAction: (player: PlayerName) => void;
};

export type Item = {
    label: string;
    value: string;
};

const extractPlayerToItem = (player: PlayerName): Option => {
    const selectItem: Option = {
        value: JSON.stringify(player),
        label: player.name,
        obj: player,
    };

    return selectItem;
};

const playerItemView = (option: Option): React.ReactNode => {
    return (
        <Flex align="center" textColor="white" direction="row">
            <Text flex="1">
                <>{option.obj.name}</>
            </Text>
            <Text>
                <>
                    {option.obj.teamName} - ({option.obj.position})
                </>
            </Text>
        </Flex>
    );
};

const getSelection = (selectedItems: Item[]): Item[] =>
    selectedItems.length > 0 ? selectedItems.slice(selectedItems.length - 1) : [];

export function SearchBar(props: SearchBarProps): ReactElement {
    const { submitAction } = props;

    const [result, setResult] = useState<Option[]>([]);
    const [searcher, setSearcher] = useState<FuzzySearch<Option>>(new FuzzySearch([]));

    const { sportsLeague } = useSportContext();

    const { data: allPlayers, error } = useAllPlayerNames(sportsLeague.id);

    const barWidth = useBreakpointValue(
        {
            base: "xs",
            sm: "xs",
            md: "sm",
            lg: "lg",
            xl: "xl",
        },
        {
            fallback: "sm",
        }
    );

    useEffect(() => {
        if (allPlayers !== undefined) {
            const options = allPlayers.map(extractPlayerToItem);
            setSearcher(new FuzzySearch(options, ["obj.name", "obj.teamName", "obj.position"], { sort: true }));
        }
    }, [allPlayers, error]);

    useEffect(() => {
        const selection = getSelection(result);
        if (selection.length > 0) {
            submitAction(JSON.parse(selection[0].value) as PlayerName);
            setResult([]);

            (document.activeElement as HTMLInputElement).value = "";
            (document.activeElement as HTMLInputElement).blur();
        }
    }, [result, submitAction]);

    return (
        <Container>
            <ErrorToast errorMsg={error} />
            <Autocomplete
                searcher={searcher}
                result={result}
                setResult={(opts: Option[]): void => {
                    setResult(opts);
                }}
                limit={5}
                placeholder="Guess A Player!"
                style={{ width: barWidth }}
                itemView={playerItemView}
            />
        </Container>
    );
}
