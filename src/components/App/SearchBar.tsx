/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* Todo : eslint rules after we're done using fake data */

/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Container, Stack } from "@chakra-ui/react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import type { ReactElement} from "react";
import { useEffect, useState } from "react";
import type { PlayerModel, TeamModel } from "~/types/Domain";
// import { useFetchQuery } from "~/hooks/useFetchQuery";

type SearchBarProps = {
    submitAction: (player: PlayerModel) => void;
}

export type Item = {
    label: string;
    value: string;
}

const extractPlayerToItem = (player: PlayerModel): Item => {
    const selectItem: Item = {
        value: JSON.stringify(player),
        label: player.DisplayName,
    };

    return selectItem;
};

const getSelection = (selectedItems: Item[]): Item[] =>
	selectedItems.length > 0 ? selectedItems.slice(selectedItems.length - 1) : [];

export function SearchBar(props: SearchBarProps): ReactElement {
    const { submitAction } = props;

    // const { data, status, error } = useFetchQuery<PlayerModel[]>(
    //     "https://athletle-api-beta.azurewebsites.net/player/names?sport=football&leagueName=National%20Football%20League"
    // );
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const data: PlayerModel[] = [
        {
            DisplayName: "Lebron James",
            Team: {
                DisplayName: "Los Angeles Lakers",
                ShortDisplayName: "Lakers",
            } as TeamModel,
        } as PlayerModel,
        {
            DisplayName: "Lebron James #2",
            Team: {
                DisplayName: "Los Angeles Lakers",
                ShortDisplayName: "Lakers",
            } as TeamModel,
        } as PlayerModel,
    ];

    const [pickerItems, setPickerItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);

    useEffect(() => {
        if (data)
            {setPickerItems(data.map(extractPlayerToItem));}
    }, [data]);

    useEffect(() => {
		const selection = getSelection(selectedItems);
		if (selection.length > 0)
			{submitAction(JSON.parse(selection[0].value) as PlayerModel);}
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
