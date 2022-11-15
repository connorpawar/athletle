import type { InputProps } from "@chakra-ui/react";
import { Box, Flex, Input, List, ListItem } from "@chakra-ui/react";
import type FuzzySearch from "fuzzy-search";
import { useState, useRef, forwardRef } from "react";
import mergeRefs from "~/utils/mergeRefs";

export type Option = {
    label: string;
    value: string;
    obj: Record<string, unknown>;
};

export type AutocompleteProps = {
    bgHoverColor?: string;
    notFoundText?: string;
    /** Input placeholder */
    placeholder?: string;
    limit: number;
    /** Render prop to customize the badges */
    itemView: (option: Option) => React.ReactNode;
    /** Result that gets populated with the selected options */
    result: Option[];
    /** Callback to set the result */
    setResult: (options: Option[]) => void;
    searcher: FuzzySearch<Option>;
} & InputProps;

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
    ({ result, setResult, bgHoverColor, notFoundText, limit, itemView, searcher, ...rest }: AutocompleteProps, ref) => {
        const [partialResult, setPartialResult] = useState<Option[]>();
        const [displayOptions, setDisplayOptions] = useState<boolean>(false);
        const [inputValue, setInputValue] = useState<string>();
        const inputRef = useRef<HTMLInputElement>(null);

        const filterOptions = (value: string): void => {
            if (value !== "") {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                const sorted = searcher.search(value);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                const subset = sorted.slice(0, limit);
                setDisplayOptions(true);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                setPartialResult(subset);
                setInputValue(value);
            } else {
                setDisplayOptions(false);
            }
        };

        const selectOption = (option: Option): void => {
            if (result.includes(option)) {
                setResult([...result.filter((existingOption) => existingOption.value !== option.value)]);
            } else {
                setResult([option, ...result]);
            }
        };

        const selectOptionFromList = (option: Option): void => {
            selectOption(option);
            setDisplayOptions(false);
            if (inputRef.current !== null) {
                inputRef.current.value = "";
            }
        };

        return (
            <Box data-testid="simple-autocomplete">
                <Input
                    onChange={(e): void => {
                        filterOptions(e.currentTarget.value);
                    }}
                    ref={mergeRefs([inputRef, ref])}
                    {...rest}
                />
                {displayOptions && (
                    <List
                        borderWidth="1px"
                        borderColor="gray.200"
                        borderRadius="md"
                        background="red.400"
                        boxShadow="6px 5px 8px rgba(0,50,30,0.1)"
                        mt={2}
                    >
                        {partialResult?.map((option) => (
                            <ListItem
                                key={option.value}
                                _hover={{ bg: bgHoverColor !== undefined ? bgHoverColor : "gray.400" }}
                                my={1}
                                p={2}
                                cursor="pointer"
                                onClick={(): void => {
                                    selectOptionFromList(option);
                                }}
                            >
                                {itemView(option)}
                            </ListItem>
                        ))}
                        {(partialResult === undefined || partialResult.length === 0) && (
                            <ListItem my={1} p={2} data-testid="not-found">
                                <Flex align="center" textColor="white">
                                    {notFoundText}
                                </Flex>
                            </ListItem>
                        )}
                    </List>
                )}
            </Box>
        );
    }
);

Autocomplete.displayName = "Autocomplete";

Autocomplete.defaultProps = {
    notFoundText: "Not found",
    limit: 10,
};
