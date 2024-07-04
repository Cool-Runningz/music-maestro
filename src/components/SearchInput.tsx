import React from "react";
import { Input, InputGroup } from "@/components/catalyst/input";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

export default function SearchInput() {
	return (
		<InputGroup className="py-8">
			<MagnifyingGlassIcon />
			<Input
				name="search"
				type="text"
				placeholder="Search&hellip;"
				aria-label="Search"
				aria-placeholder="Rock songs for a road trip"
			/>
		</InputGroup>
	);
}
