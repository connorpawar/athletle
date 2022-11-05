import type * as React from "react";

export default function mergeRefs<T = never>(
    refs: (React.MutableRefObject<T> | React.LegacyRef<T>)[]
): React.RefCallback<T> {
    return (value) => {
        refs.forEach((ref) => {
            if (typeof ref === "function") {
                ref(value);
            } else if (ref !== null) {
                (ref as React.MutableRefObject<T | null>).current = value;
            }
        });
    };
}
