import { Container, Stack, useBreakpointValue } from "@chakra-ui/react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { ErrorToast } from "../Misc/ErrorToast";
import { useSportContext } from "~/contexts/SportContext";
import { useAllPlayerNames } from "~/hooks/data/useAllPlayerNames";
import type { PlayerName } from "~/models/PlayerName";
import { levenshteinDistance } from "~/utils/levenshteinDistance";

type SearchBarProps = {
    submitAction: (player: PlayerName) => void;
};

export type Item = {
    label: string;
    value: string;
};

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

    const { data, error } = useAllPlayerNames(sportsLeague.id);

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
        if (data !== undefined) {
            setPickerItems(data.map(extractPlayerToItem));
        }
    }, [data, error]);

    useEffect(() => {
        const selection = getSelection(selectedItems);
        if (selection.length > 0) {
            submitAction(JSON.parse(selection[0].value) as PlayerName);
            setSelectedItems([]);

            (document.activeElement as HTMLInputElement).value = "";
            (document.activeElement as HTMLInputElement).blur();
        }
    }, [selectedItems, submitAction]);

    const handleSelectedItemsChange = (selected?: Item[]): void => {
        if (selected !== undefined) {
            setSelectedItems(selected);
        }
    };

    return (
        <Container>
            <ErrorToast errorMsg={error} />
            <CUIAutoComplete
                label=""
                hideToggleButton={true}
                placeholder="Guess an Athlete!"
                items={pickerItems}
                selectedItems={getSelection(selectedItems)}
                onSelectedItemsChange={(changes): void => {
                    handleSelectedItemsChange(changes.selectedItems);
                }}
                optionFilterFunc={(items, val): Item[] => {
                    const distances = new Map(
                        items.map(
                            (it) =>
                                [it.label, levenshteinDistance(it.label.slice(0, val.length), val)] as [string, number]
                        )
                    );
                    const sorted = items.sort((a, b) => (distances.get(a.label) ?? 0) - (distances.get(b.label) ?? 0));

                    return sorted.filter((it) => (distances.get(it.label) ?? 0) < val.length / 2);
                }}
                disableCreateItem={true}
                inputStyleProps={{ width: barWidth }}
                tagStyleProps={{ display: "none" }}
                highlightItemBg="red.400"
            />
        </Container>
    );
}
