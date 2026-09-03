// Front door for algonormative.net. Normalises the host and scheme, then
// hands everything else to the static assets built by Astro.
//
//   http://…                → 301 https://…
//   https://www.algonormative.net/… → 301 https://algonormative.net/…
//
// One canonical origin keeps the sitemap, canonical tags and analytics in
// agreement; the redirect Worker in ../redirect handles the retired domains.
export default {
	fetch(request, env) {
		const url = new URL(request.url);
		if (url.protocol !== "https:" || url.host === "www.algonormative.net") {
			url.protocol = "https:";
			url.host = "algonormative.net";
			return Response.redirect(url.toString(), 301);
		}
		return env.ASSETS.fetch(request);
	},
};
