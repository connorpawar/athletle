import { CloseIcon } from "@chakra-ui/icons";
import type { InputProps } from "@chakra-ui/react";
import { Badge, Box, Flex, Input, List, ListItem } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { useState, useRef, forwardRef } from "react";
import { levenshteinSorter } from "~/utils/levenshteinDistance";
import mergeRefs from "~/utils/mergeRefs";

export type Option = {
    [key: string]: unknown;
    label: string;
    value: string;
};

export type AutocompleteProps = {
    bgHoverColor?: string;
    notFoundText?: string;
    /** Options to be displayed in the autocomplete */
    options: Option[];
    /** Input placeholder */
    placeholder?: string;
    limit: number;
    /** Render prop to customize the badges */
    renderBadge?: (option: Option) => React.ReactNode;
    /** Result that gets populated with the selected options */
    result: Option[];
    /** Callback to set the result */
    setResult: (options: Option[]) => void;
} & InputProps;

const defaultRenderBadge = (option: Option): ReactElement => (
    <Badge borderRadius="full" px="2" colorScheme="teal" mx={1} cursor="pointer">
        {option.label}
        <CloseIcon ml={1} w={2} h={2} mb="4px" />
    </Badge>
);

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
    (
        {
            options,
            result,
            setResult,
            bgHoverColor,
            notFoundText,
            limit,
            renderBadge = defaultRenderBadge,
            ...rest
        }: AutocompleteProps,
        ref
    ) => {
        const [partialResult, setPartialResult] = useState<Option[]>();
        const [displayOptions, setDisplayOptions] = useState<boolean>(false);
        const [inputValue, setInputValue] = useState<string>();
        const inputRef = useRef<HTMLInputElement>(null);

        const filterOptions = (value: string): void => {
            if (value !== "") {
                const subset = levenshteinSorter(options, value, limit);
                console.log(subset);
                setDisplayOptions(true);
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
                {result.length > 0 && (
                    <Box my={2}>
                        {result.map((option) => (
                            <Box
                                display="inline-block"
                                onClick={(): void => {
                                    selectOption(option);
                                }}
                                key={option.value}
                            >
                                {renderBadge(option)}
                            </Box>
                        ))}
                    </Box>
                )}
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
                                <Flex align="center" textColor="white">{option.label}</Flex>
                            </ListItem>
                        ))}
                        {partialResult?.length === undefined && (
                            <ListItem my={1} p={2} data-testid="not-found">
                                <Flex align="center">{notFoundText}</Flex>
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
