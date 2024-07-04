import React from "react";
import { signIn, signOut, auth } from "@/auth";
import { Button } from "@/components/catalyst/button";

function LoginButton() {
	return (
		<form
			action={async () => {
				"use server";
				await signIn("spotify");
			}}>
			<Button type="submit" color="green">
				Log in to Spotify
			</Button>
		</form>
	);
}

function LogoutButton() {
	return (
		<form
			action={async () => {
				"use server";
				await signOut();
			}}>
			<Button type="submit" color="green">
				Log Out
			</Button>
		</form>
	);
}

export default async function AuthButton() {
	const session = await auth();

	return session?.user ? <LogoutButton /> : <LoginButton />;
}
