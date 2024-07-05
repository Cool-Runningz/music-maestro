"use client";

import React, { useState } from "react";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Button } from "@/components/catalyst/button";
import { Input, InputGroup } from "@/components/catalyst/input";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { searchPrompt } from "@/app/actions";

const promptSuggestions = [
	"Songs for my first 5K race",
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
			className="font-normal rounded-2xl important"
			outline
			onClick={() => onClick()}>
			<PlusIcon />
			{label}
		</Button>
	);
};

export default function SearchWidget() {
	const [prompt, setPrompt] = useState("");

	return (
		<form action={searchPrompt}>
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
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
					/>
				</InputGroup>
				<div className="grid sm:grid-cols-2 grid-cols-1 gap-3 text-center text-gray-500 text-sm py-4">
					{promptSuggestions.map((suggestion) => (
						<SuggestButton
							key={suggestion}
							label={suggestion}
							onClick={() => setPrompt(suggestion)}
						/>
					))}
				</div>
				<div className="flex justify-center">
					<Button
						color="green"
						type="submit"
						disabled={!prompt}
						className="max-w-[200px] w-full disabled:cursor-not-allowed">
						Generate
					</Button>
				</div>
			</Field>
		</form>
	);
}
