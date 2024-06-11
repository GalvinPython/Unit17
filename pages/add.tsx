import { useState } from 'react';
import { button as buttonStyles } from "@nextui-org/theme";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { FaCircleCheck } from 'react-icons/fa6'
import { useLocalStorage } from "usehooks-ts";
import crypto from 'crypto'
import { KeyTypes } from "@/types";
import { Card, CardBody, Input, Textarea } from "@nextui-org/react";

export default function IndexPage() {
	const [value, setValue] = useLocalStorage<KeyTypes[]>('review-data', []);
	const [reviewTitle, setReviewTitle] = useState('');
	const [reviewLocation, setReviewLocation] = useState('');
	const [reviewDescription, setReviewDescription] = useState('');
	const [reviewRating, setReviewRating] = useState('');
	const [reviewBase64Image, setReviewBase64Image] = useState('')

	const handleImageUpload = async (event: any) => {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onload = (e) => {
			setReviewBase64Image(e.target?.result as string)
			console.log('Base64 image:', reviewBase64Image);
		};

		reader.readAsDataURL(file); // Read the file as base64
	};

	const handleAddPlace = () => {
		// Perform presence check on inputs
		if (!reviewTitle || !reviewLocation || !reviewDescription || !reviewRating || !reviewBase64Image) {
			console.error('Please fill in all fields.');
			return false;
		}

		// Peform type check on reviewRating
		let reviewRatingNum = parseInt(reviewRating)
		if (Number.isNaN(reviewRatingNum)) {
			console.error('The rating input is not a valid number')
			return false;
		}

		// Perform a range check on the rating input
		if (reviewRatingNum < 1 || reviewRatingNum > 5) {
			console.error('The rating input must be between 1 and 5!')
			return false;
		}

		// Test data
		const dataToAdd: KeyTypes = {
			hash: crypto.randomBytes(20).toString('hex'),
			title: reviewTitle,
			location: reviewLocation,
			descriptionShort: reviewDescription.length > 100 ? reviewDescription.slice(0, 100) + '...' : reviewDescription,
			description: reviewDescription,
			rating: Number(reviewRating),
			thumbnail: reviewBase64Image,
			dateAdded: new Date().getTime(),
		};

		// Add the new data to the key
		setValue(value ? [...value, dataToAdd] : [dataToAdd])

		// Clear input fields after adding the place
		setReviewTitle('');
		setReviewLocation('');
		setReviewDescription('');
		setReviewRating('');

		// Return true to indicate this happened without any errors
		return true;
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
								value={reviewTitle}
								onChange={(e) => setReviewTitle(e.target.value)}
								className="min-w-[90%]"
							/>
							<Input
								isRequired
								type="input"
								label="Location"
								value={reviewLocation}
								onChange={(e) => setReviewLocation(e.target.value)}
								className="min-w-[90%] pt-4"
							/>
							<Textarea
								isRequired
								type="input"
								label="Your Review"
								value={reviewDescription}
								onChange={(e) => setReviewDescription(e.target.value)}
								className="min-w-[90%] pt-4"
							/>
							<Input
								isRequired
								type="input"
								label="Rating (1-5)"
								value={reviewRating}
								onChange={(e) => setReviewRating(e.target.value)}
								className="min-w-[90%] pt-4"
							/>
							<input
								type="file"
								accept="image/*"
								className="mt-4 py-2 px-4 bg-[#27272a] text-white rounded-md shadow-md hover:bg-[#3f3f46] transform transition ease-in-out duration-100 hover:scale-100"
								onChange={handleImageUpload}
							/>
						</CardBody>
					</Card>
				</div>

				<div className="mt-2">
					<div>
						<button
							className={
								`${buttonStyles({
									color: "success",
									radius: "full",
									variant: "shadow",
								})} transform transition ease-in-out duration-100 hover:scale-110`
							}
							onClick={handleAddPlace}
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
