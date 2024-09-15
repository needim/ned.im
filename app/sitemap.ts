export default async function sitemap() {
	const routes = [
		"",
		"/changelog",
		// "/notes",
		"/projects",
		"/stack",
		"/colophon",
		// --- noty
		"/noty",
		"/noty/installation",
		"/noty/options",
		"/noty/types-and-layouts",
		"/noty/themes",
		"/noty/animations",
		"/noty/web-push-notifications",
		"/noty/confirm-dialogs",
		"/noty/api-and-callbacks",
		// --- others
	].map((route) => ({
		url: `https://ned.im${route}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));

	return [...routes];
}
