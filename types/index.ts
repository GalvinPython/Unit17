import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type KeyTypes = {
  // Hash is not required, however it does make identification and modification easier
	hash: string;
	title: string;
	location: string;
	description: string;
	rating: number;
	thumbnail: string;
  // Once again, not required, however it is a nice detail
  dateAdded: number;
}