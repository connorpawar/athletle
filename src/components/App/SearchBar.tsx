import { Container, Stack } from "@chakra-ui/react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import type { ReactElement} from "react";
import { useEffect, useState } from "react";
import { useSportContext } from "~/contexts/SportContext";
import { useAllPlayerNames } from "~/hooks/data/useAllPlayerNames";
import type { PlayerName } from "~/models/PlayerName";
import { ErrorToast } from "../Misc/ErrorToast";

type SearchBarProps = {
    submitAction: (player: PlayerName) => void;
}

export type Item = {
    label: string;
    value: string;
}

const extractPlayerToItem = (player: PlayerName): Item => {
    const selectItem: Item = {
        value: JSON.stringify(player),
        label: player.name,
    };

    return selectItem;
};

const getSelection = (selectedItems: Item[]): Item[] =>
	selectedItems.length > 0 ? selectedItems.slice(selectedItems.length - 1) : [];

export function SearchBar(props: SearchBarProps): ReactElement {
    const { submitAction } = props;

    const [pickerItems, setPickerItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);

    const { sportsLeague } = useSportContext();

    const { data, error } = useAllPlayerNames(sportsLeague.sport.toString(), sportsLeague.league.toString());

    useEffect(() => {
        if (data !== undefined)
            {setPickerItems(data.map(extractPlayerToItem));}
    }, [data, error]);

    useEffect(() => {
		const selection = getSelection(selectedItems);
		if (selection.length > 0)
			{submitAction(JSON.parse(selection[0].value) as PlayerName);}
	}, [selectedItems, submitAction]);

    const handleCreateItem = (item: Item): void => {
        setPickerItems((curr) => [...curr, item]);
        setSelectedItems((curr) => [...curr, item]);
    };

    const handleSelectedItemsChange = (selected?: Item[]): void => {
        if (selected !== undefined)
            {setSelectedItems(selected);}
    };

    return (
        <Container maxW="xl">
            <Stack align="center" spacing={4} direction="row" w="lg">
                <ErrorToast errorMsg={error} />
                <CUIAutoComplete
                    label=""
                    hideToggleButton={true}
                    placeholder="Guess an Athlete!"
                    onCreateItem={handleCreateItem}
                    items={pickerItems}
                    selectedItems={getSelection(selectedItems)}
                    onSelectedItemsChange={(changes): void => { handleSelectedItemsChange(changes.selectedItems); }}
                    inputStyleProps={{ width: "30em" }}
                    disableCreateItem={true}
					tagStyleProps={{display: "none"}}
					highlightItemBg="red.400"
                />
            </Stack>
        </Container>
    );
}
