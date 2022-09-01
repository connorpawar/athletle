import { ReactElement, useEffect, useState } from "react";
import { Container, Stack } from "@chakra-ui/react";
import { PlayerModel, TeamModel } from "~/types/Domain";
// import { useFetchQuery } from "~/hooks/useFetchQuery";

import { CUIAutoComplete } from "chakra-ui-autocomplete";
interface SearchBarProps {
    submitAction: (player: PlayerModel) => void;
}

export interface Item {
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
	const data = [
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
            setPickerItems(data.map(extractPlayerToItem));
    }, [data]);

    useEffect(() => {
		const selection = getSelection(selectedItems);
		if (selection.length > 0)
			submitAction(JSON.parse(selection[0].value));
	}, [selectedItems]);

    const handleCreateItem = (item: Item) => {
        setPickerItems((curr) => [...curr, item]);
        setSelectedItems((curr) => [...curr, item]);
    };

    const handleSelectedItemsChange = (selectedItems?: Item[]) => {
        if (selectedItems)
            setSelectedItems(selectedItems);
    };

    return (
        <Container maxW={"xl"}>
            <Stack align="center" spacing={4} direction="row" w={"lg"}>
                <CUIAutoComplete
                    label=""
                    hideToggleButton
                    placeholder="Guess an Athlete!"
                    onCreateItem={handleCreateItem}
                    items={pickerItems}
                    selectedItems={getSelection(selectedItems)}
                    onSelectedItemsChange={(changes) => handleSelectedItemsChange(changes.selectedItems)}
                    inputStyleProps={{ width: "30em" }}
                    disableCreateItem={true}
					tagStyleProps={{display: "none"}}
					highlightItemBg="red.400"
                />
            </Stack>
        </Container>
    );
}
