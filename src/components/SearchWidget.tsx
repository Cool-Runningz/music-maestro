"use client";

import React, { useState, FormEvent } from "react";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Button } from "@/components/catalyst/button";
import { Input, InputGroup } from "@/components/catalyst/input";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import LoadingSpinner from "@/components/icons/LoadingSpinner";
import { useMusic } from "@/contexts/MusicContext";

const promptSuggestions = [
	"Songs for a 5K race",
	"Upbeat morning routine",
	"90's nostalgia",
	"Jazz vibes for a rainy day",
];

const SuggestButton = ({
	label,
	onClick,
}: {
	label: string;
	onClick: () => void;
}) => {
	return (
		<Button
			type="button"
			className="font-normal rounded-2xl important"
			outline
			onClick={() => onClick()}>
			<PlusIcon />
			{label}
		</Button>
	);
};

const GenerateButton = ({
	prompt,
	pending,
}: {
	prompt: string;
	pending?: boolean;
}) => {
	return (
		<Button
			color="cyan"
			type="submit"
			disabled={!prompt || pending}
			aria-disabled={!prompt || pending}
			className={`max-w-[200px] w-full disabled:cursor-not-allowed`}>
			{pending ? (
				<div className="flex gap-y-2">
					<LoadingSpinner /> Generating...
				</div>
			) : (
				"Generate"
			)}
		</Button>
	);
};

export default function SearchWidget() {
	//Context
	const { updateQuery, isLoading } = useMusic();

	//State
	const [inputValue, setInputValue] = useState("");

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		updateQuery(inputValue);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Field className="py-4">
				<Label htmlFor="search-input">Search</Label>
				<InputGroup>
					<MagnifyingGlassIcon />
					<Input
						id="search-input"
						name="search"
						type="text"
						placeholder="Road trip anthems"
						aria-placeholder="Road trip anthems"
						value={inputValue}
						required
						maxLength={150}
						onChange={(e) => setInputValue(e.target.value)}
					/>
				</InputGroup>
				<div className="grid sm:grid-cols-2 grid-cols-1 gap-3 text-center text-gray-500 text-sm py-4">
					{promptSuggestions.map((suggestion) => (
						<SuggestButton
							key={suggestion}
							label={suggestion}
							onClick={() => setInputValue(suggestion)}
						/>
					))}
				</div>
				<div className="flex justify-center">
					<GenerateButton prompt={inputValue} pending={isLoading} />
				</div>
			</Field>
		</form>
	);
}
