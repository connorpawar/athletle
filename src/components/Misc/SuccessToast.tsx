import { useToast } from "@chakra-ui/react";
import type { ReactElement } from "react";

export type SuccessToastProps = {
    msg?: string;
};

export function SuccessToast(props: SuccessToastProps): ReactElement {
    const { msg } = props;
    const toast = useToast({
        id: "",
    });

    return (
        <>
            {msg !== undefined &&
                msg !== "" &&
                toast({
                    title: msg,
                    status: "success",
                    variant: "top-accent",
                    isClosable: true,
                })}
        </>
    );
}
