// Redirect chronick.net (and www.chronick.net) to nickdonohue.net, preserving
// path + query. 301 because the move is intended to be permanent.
export default {
	fetch(request) {
		const url = new URL(request.url);
		url.host = "nickdonohue.net";
		return Response.redirect(url.toString(), 301);
	},
};
