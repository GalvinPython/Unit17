export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Rate This Spot",
	description: "Rate This Spot",
	navItems: [
		{
			label: "Dashboard",
			href: "/",
		},
		{
			label: "Add Place",
			href: "/add",
		},
	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui-docs-v2.vercel.app",
		discord: "https://discord.gg/9b6yyZKmH4",
		sponsor: "https://patreon.com/jrgarciadev"
	},
};
