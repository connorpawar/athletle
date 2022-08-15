import { useEffect, useRef, useReducer } from 'react';

type FetchState = "FETCHING" | "FETCHED" | "FETCH_ERROR" | "OTHER";
interface QueryInfo<T> {
	status: string,
	error: unknown,
	data: T | undefined
}

export const useFetchQuery = <T>(url: string) => {
	const cache = useRef<Record<string, T>>({});

	const initialState: QueryInfo<T> = {
		status: 'idle',
		error: null,
		data: undefined
	};

	const [state, dispatch] = useReducer((state: QueryInfo<T>, action: { type: FetchState; payload?: T; }) => {
		switch (action.type) {
			case 'FETCHING':
				return { ...initialState, status: 'fetching' };
			case 'FETCHED':
				return { ...initialState, status: 'fetched', data: action.payload };
			case 'FETCH_ERROR':
				return { ...initialState, status: 'error', error: action.payload };
			default:
				return state;
		}
	}, initialState);

	useEffect(() => {
		let cancelRequest = false;
		if (!url || !url.trim()) return;

		const fetchData = async () => {
			dispatch({ type: 'FETCHING' });
			if (cache.current[url]) {
				const data = cache.current[url];
				dispatch({ type: 'FETCHED', payload: data });
			} else {
				try {
					const response = await fetch(url);
					const data = await response.json();
					cache.current[url] = data;
					if (cancelRequest) return;
					dispatch({ type: 'FETCHED', payload: data });
				} catch (error: any) {
					if (cancelRequest) return;
					dispatch({ type: 'FETCH_ERROR', payload: error?.message ?? "unknown error occurred" });
				}
			}
		};

		fetchData();

		return function cleanup() {
			cancelRequest = true;
		};
	}, [url]);

	return state;
};

// const { status, data, error } = useFetch<PlayerModel[]>(url);