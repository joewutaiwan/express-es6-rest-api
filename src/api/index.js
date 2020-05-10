import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import testdata from './testdata';

var error_handlers = function (err, req, res) {
	console.error(err);
	res.status(500).send({ error: err.mesage });
}

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db, error_handlers}));
	api.use('/testdata', testdata({ config, db, error_handlers}));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		console.log("api.get /");
		res.json({ version });
	});

	return api;
}
