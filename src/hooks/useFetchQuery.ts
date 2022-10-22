import { useEffect, useRef, useReducer } from "react";

export type QueryInfo<T> = {
    isLoading: boolean;
    error?: string;
    data?: T;
};
type Action<T> = { type: "FETCHING" } | { type: "SUCCESS"; data: T } | { type: "ERROR"; error: string };

export function useFetchQuery<T>(url: string): QueryInfo<T> {
    const cache = useRef<Record<string, T>>({});

    const initialState: QueryInfo<T> = {
        isLoading: false,
    };

    function fetchReducer(state: QueryInfo<T>, action: Action<T>): QueryInfo<T> {
        switch (action.type) {
            case "FETCHING":
                return { isLoading: true };
            case "SUCCESS":
                return { isLoading: false, data: action.data };
            case "ERROR":
                return { isLoading: false, error: action.error };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        let cancelRequest = false;
        if (url.length === 0 || url.trim().length === 0) {
            return undefined;
        }

        async function fetchData(): Promise<void> {
            dispatch({ type: "FETCHING" });
            if (cache.current[url] !== undefined) {
                const data = cache.current[url];
                dispatch({ type: "SUCCESS", data: data });
            } else {
                try {
                    const response = await fetch(url);
                    console.log(response);
                    if (response.status !== 200) {
                        throw new Error("Response resulted in non-OK status");
                    }
                    const data = (await response.json()) as T;
                    cache.current[url] = data;
                    if (cancelRequest) {
                        return;
                    }
                    dispatch({ type: "SUCCESS", data: data });
                } catch (error: unknown) {
                    if (cancelRequest) {
                        return;
                    }
                    let message = "";
                    if (typeof error === "string") {
                        message = error;
                    } else if (error instanceof Error) {
                        message = error.message;
                    }
                    dispatch({ type: "ERROR", error: message });
                }
            }
        }

        void fetchData();

        return () => {
            cancelRequest = true;
        };
    }, [url]);

    return state;
}
