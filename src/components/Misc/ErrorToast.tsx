import { useToast } from "@chakra-ui/react";
import type { ReactElement } from "react";

export type ErrorToastProps = {
    errorMsg?: string;
};

export function ErrorToast(props: ErrorToastProps): ReactElement {
    const { errorMsg } = props;
    const toast = useToast({
        id: "",
    });

    return (
        <>
            {errorMsg !== undefined &&
                errorMsg !== "" &&
                toast({
                    title: errorMsg,
                    status: "error",
                    variant: "top-accent",
                    isClosable: true,
                })}
        </>
    );
}
