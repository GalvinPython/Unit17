import { useEffect, useState } from 'react';
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { FaCirclePlus, FaReadme } from 'react-icons/fa6'
import { useLocalStorage } from "usehooks-ts";
import { KeyTypes } from "@/types";

export default function IndexPage() {
	const [value, setValue] = useLocalStorage<KeyTypes[]>('review-data', []);
	const [mounted, setMounted] = useState(false);

	// Ensure component only renders on the client side after it's mounted
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null; // Render nothing on the server
	}

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

				<div className="container mx-auto p-4">
					{value.length === 0 ? (
						<div className="text-center">
							<h2 className="font-bold">No reviews yet? How about you start reviewing!</h2>
						</div>
					) : (
						value.map((item, index) => (
							<div key={index} className="bg-slate-300 bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-md rounded-lg p-6 mb-6">
								<h2 className="text-2xl font-bold mb-2">{item.title}</h2>
								<p className="mb-2">{item.descriptionShort}</p>
								<p className="mb-1">Location: {item.location}</p>
								<p className="mb-1">Rating: {item.rating}/5</p>
								<p className="mb-4">Added: {new Date(item.dateAdded).toLocaleString()}</p>
								<Link
									href={`/review?hash=${item.hash}`}
									className="inline-flex items-center bg-green-500 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 ease-in-out"
								>
									<FaReadme size={20} className="mr-2" />
									Read full review
								</Link>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={item.thumbnail}
									alt={`Picture of ${item.title}`}
									className="w-full h-auto mt-4 rounded-lg shadow-md"
								/>
							</div>
						))
					)}
				</div>

			</section>
		</DefaultLayout>
	);
}
