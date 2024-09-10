import GridBackground from "@/components/icons/GridBackground";
import { Button } from "@/components/catalyst/button";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Input } from "@/components/catalyst/input";
import { Textarea } from "@/components/catalyst/textarea";

export default function ContactForm() {
	return (
		<div className="px-6 py-24 sm:py-32 lg:px-8 h-dvh">
			<GridBackground />
			<div className="container mx-auto max-w-2xl text-center">
				<h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					Contact
				</h1>
			</div>
			<form
				action="https://usebasin.com/f/bbb79176ccd5"
				method="POST"
				className="mx-auto mt-16 max-w-xl sm:mt-20">
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<Field className="sm:col-span-2">
						<Label htmlFor="full-name">Full name*</Label>
						<Input
							id="full-name"
							name="full-name"
							type="text"
							autoComplete="given-name"
						/>
					</Field>

					<Field className="sm:col-span-2">
						<Label htmlFor="email">Email*</Label>
						<Input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
						/>
					</Field>

					<Field className="sm:col-span-2">
						<Label htmlFor="message">Message</Label>
						<Textarea id="message" name="message" rows={4} />
					</Field>
				</div>
				<div className="mt-10">
					<Button type="submit" color="cyan" className="block w-full">
						Send Message
					</Button>
				</div>
			</form>
		</div>
	);
}
