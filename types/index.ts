import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type KeyTypes = {
	hash: string;
	title: string;
	location: string;
	description: string;
	rating: number;
	thumbnail: string;
  dateAdded: number;
}