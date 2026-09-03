// Redirect retired personal domains to algonormative.net, preserving path
// and query.
//
//   chronick.net     → 301 (permanent; the domain is retired for good)
//   nickdonohue.net  → 302 (temporary; the name still belongs to the person,
//                           and the ranking signal is deliberately not moved)
//
// Anything else that ever gets routed here falls back to a 302 so a typo in
// wrangler.toml never produces a cached permanent redirect by accident.
const STATUS_BY_HOST = {
	"chronick.net": 301,
	"www.chronick.net": 301,
	"nickdonohue.net": 302,
	"www.nickdonohue.net": 302,
};

export default {
	fetch(request) {
		const url = new URL(request.url);
		const status = STATUS_BY_HOST[url.host] ?? 302;
		url.host = "algonormative.net";
		return Response.redirect(url.toString(), status);
	},
};
