export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Rate This Spot",
	description: "Rate This Spot.",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "Add Place",
			href: "/add",
		},
	],
};
