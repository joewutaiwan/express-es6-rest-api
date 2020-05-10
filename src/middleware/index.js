import { Router } from 'express';

export default ({ config, db }) => {
	let routes = Router();

	// add middleware here
	routes.use(function(req, res, next) {
		// Set permissive CORS header - this allows this server to be used only as
		// an API server in conjunction with something like webpack-dev-server.
		res.setHeader('Access-Control-Allow-Origin', '*');
	
		// Disable caching so we'll always get the latest comments.
		res.setHeader('Cache-Control', 'no-cache');

		res.setHeader('customer-header', 'we-will-see');
		next();
	});

	return routes;
}
