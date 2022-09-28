import type { ImageProps } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

export type SilhouetteProps = {
    showOriginal?: boolean;
} & ImageProps;

export function Silhouette({ showOriginal = false, ...props }: SilhouetteProps): JSX.Element {
    const style = showOriginal ? {} : { filter: "brightness(0%)" };
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Image style={style} {...props} />;
}
