import { button as buttonStyles } from "@nextui-org/theme";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { FaCircleCheck } from 'react-icons/fa6'
import { useLocalStorage } from "usehooks-ts";
import crypto from 'crypto'
import { KeyTypes } from "@/types";
import { Card, CardBody, Input, Textarea } from "@nextui-org/react";

export default function IndexPage() {
	const [value, setValue] = useLocalStorage<KeyTypes>('review-data')

	const handleImageUpload = async (event: any) => {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onload = (e) => {
			const base64Image = e.target?.result;
			console.log('Base64 image:', base64Image);
		};

		reader.readAsDataURL(file); // Read the file as base64
	};

	return (
		<DefaultLayout>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="inline-block max-w-lg text-center justify-center">
					<h1 className={title()}>Rate This&nbsp;</h1>
					<h1 className={title({ color: "green" })}>Spot</h1>
				</div>

				<div className="mt-2">
					<h4 className={subtitle({ class: "mt-4" })}>Add a new place!</h4>
				</div>

				<div className="mt-2 min-w-[50%]">
					<Card>
						<CardBody>
							<Input
								isRequired
								type="input"
								label="Title"
								defaultValue=""
								className="min-w-[90%]"
							/>
							<Input
								isRequired
								type="input"
								label="Location"
								defaultValue=""
								className="min-w-[90%] pt-4"
							/>
							<Textarea
								isRequired
								type="input"
								label="Your Review"
								defaultValue=""
								className="min-w-[90%] pt-4"
							/>
							<Input
								isRequired
								type="input"
								label="Rating"
								defaultValue=""
								className="min-w-[90%] pt-4"
							/>
							<input
								type="file"
								accept="image/*"
								onChange={handleImageUpload}
							/>
						</CardBody>
					</Card>
				</div>

				<div className="mt-2">
					<div>
						<button
							className={buttonStyles({
								color: "success",
								radius: "full",
								variant: "shadow",
							})}
							onClick={() => {
								// Test data
								const exampleObject: KeyTypes = {
									// https://stackoverflow.com/a/27747377
									hash: crypto.randomBytes(20).toString('hex'),
									title: "Example Title",
									location: "Example Location",
									description: "This is an example description.",
									rating: 5,
									thumbnail: "example-thumbnail-b64",
									dateAdded: new Date().getTime(),
								};

								// Add the new data to the key
								setValue(value ? [...value, exampleObject] : [exampleObject])
							}}
						>
							<FaCircleCheck size={20} />
							Add Place
						</button>
					</div>
				</div>
			</section>
		</DefaultLayout>
	);
}