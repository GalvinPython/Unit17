import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { FaCirclePlus } from 'react-icons/fa6'

export default function IndexPage() {
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
			</section>
		</DefaultLayout>
	);
}
