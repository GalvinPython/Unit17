import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { FaHouse } from 'react-icons/fa6'
import { useLocalStorage } from "usehooks-ts";
import { KeyTypes } from "@/types";

export default function IndexPage() {
	const [value, setValue] = useLocalStorage<KeyTypes[]>('review-data', []);
	const hashQuery = new URLSearchParams(window.location.search).get('hash');

	return (
		<DefaultLayout>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="flex gap-3">
					<Link
						href="/home"
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
				<p>{hashQuery}</p>
			</section>
		</DefaultLayout>
	);
}
