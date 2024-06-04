import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { FaCirclePlus, FaReadme } from 'react-icons/fa6'
import { useLocalStorage } from "usehooks-ts";
import { KeyTypes } from "@/types";

export default function IndexPage() {
	const [value, setValue] = useLocalStorage<KeyTypes[]>('review-data', []);

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

				<div>
					{value.map((item, index) => (
						<div key={index} className="py-2">
							<h2 className="text-xl font-semibold">{item.title}</h2>
							<p className="text-gray-300">{item.description}</p>
							<p className="text-gray-400">Location: {item.location}</p>
							<p className="text-gray-500">Rating: {item.rating}/5</p>
							<p className="text-gray-600">Added: {new Date(item.dateAdded).toLocaleString()}</p>
							<Link
								href={`/review?hash=${item.hash}`}
								className={buttonStyles({
									color: "success",
									radius: "full",
									variant: "shadow",
								})}
							>
								<FaReadme size={20} />
								Read full review 
							</Link>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={item.thumbnail}
								alt={`Picture of ${item.title}`}
							/>
						</div>
					))}
				</div>
			</section>
		</DefaultLayout>
	);
}
