import { useEffect, useState } from 'react';
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { FaHouse } from 'react-icons/fa6'
import { useLocalStorage } from "usehooks-ts";
import { KeyTypes } from "@/types";

export default function IndexPage() {
	const [value, setValue] = useLocalStorage<KeyTypes[]>('review-data', []);
	const [hashQuery, setHashQuery] = useState<string | null>(null);

	useEffect(() => {
		const query = new URLSearchParams(window.location.search).get('hash');
		setHashQuery(query);
	}, []);

	return (
		<DefaultLayout>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="flex gap-3">
					<Link
						href="/"
						className={buttonStyles({
							color: "success",
							radius: "full",
							variant: "shadow",
						})}
					>
						<FaHouse size={20} />
						Return Home
					</Link>
				</div>
				{value.map((item, index) => {
					if (item.hash === hashQuery) {
						return (
							<div key={index} className="max-w-[90dvw] text-wrap">
								<h1 className={subtitle({ class: "mt-4" })}>{item.title}</h1>
								<p className="mb-2">{item.description}</p>
								<p className="mb-1">Location: {item.location}</p>
								<p className="mb-1">Rating: {item.rating}/5</p>
								<p className="mb-4">Added: {new Date(item.dateAdded).toLocaleString()}</p>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={item.thumbnail}
									alt={`Picture of ${item.title}`}
									className="w-full h-auto mt-4 rounded-lg shadow-md"
								/>
							</div>
						);
					} else {
						return null;
					}
				})}

			</section>
		</DefaultLayout>
	);
}
