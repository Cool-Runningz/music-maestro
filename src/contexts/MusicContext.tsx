"use client";

import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useState,
} from "react";
import { SPOTIFY_ROUTE_HANDLER } from "@/utils/constants";
import useSWRImmutable from "swr/immutable";

export type MusicContextValue = {
	tracks: any; //TODO: Update types
	isLoading: boolean;
	error: any;
	updateQuery: Dispatch<SetStateAction<string>>;
};

const MusicContext = createContext<MusicContextValue | undefined>(undefined);

//SWR Promise-returning function to fetch the data
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MusicProvider({ children }: React.PropsWithChildren) {
	const [query, setQuery] = useState("");
	const { data, error, isLoading } = useSWRImmutable(
		query
			? `${SPOTIFY_ROUTE_HANDLER}?query=${encodeURIComponent(query)}`
			: null,
		fetcher,
	);

	return (
		<MusicContext.Provider
			value={{ tracks: data, isLoading, error, updateQuery: setQuery }}>
			{children}
		</MusicContext.Provider>
	);
}

//Hook to make using the context easier
export function useMusic(): MusicContextValue {
	const context = useContext(MusicContext);

	if (context === undefined) {
		throw new Error("MusicContext must be used within a Provider");
	}

	return context;
}
