import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { FaCirclePlus } from 'react-icons/fa6'
import { useLocalStorage } from "usehooks-ts";
import crypto from 'crypto'
import { KeyTypes } from "@/types";

export default function IndexPage() {
	const [value, setValue, removeValue] = useLocalStorage<KeyTypes>('review-data')

	return (
		<DefaultLayout>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="inline-block max-w-lg text-center justify-center">
					<h1 className={title()}>Rate This&nbsp;</h1>
					<h1 className={title({ color: "green" })}>Spot</h1>
					<br />
					<h4 className={subtitle({ class: "mt-4" })}>Add a place and review it!</h4>
				</div>

				<div className="flex gap-3">
					<Link
						href="/add"
						className={buttonStyles({
							color: "success",
							radius: "full",
							variant: "shadow",
						})}
					>
						<FaCirclePlus size={20} />
						Add Place
					</Link>
				</div>

				<div className="mt-4">
					<h4 className={subtitle({ class: "mt-4" })}>All your reviewed places!</h4>
				</div>

				<div className="mt-4">
					<div>
						<button
							onClick={() => {
								// Test data
								const exampleObject:KeyTypes = {
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
							Test
						</button>
					</div>
				</div>
			</section>
		</DefaultLayout>
	);
}
