import resource from 'resource-router-middleware';
import testdata from '../models/testdata';

export default ({ config, db, error_handlers}) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'testdata',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		let facet = testdata.find( facet => facet.id===id ),
			err = facet ? null : 'Not found';
		callback(err, facet);
	},

	/** GET / - List all entities */
	index(req, res) {
		var e = false;
		if (e) {
			var err = {};
			err.mesage = "index error";
			error_handlers(err, req, res);
		}
		
		var data = {};
		data.query = req.query;
		data.list = testdata;
		if (Math.random() > 0.5) {
			data.list = testdata.slice(1, 4);
		}
		res.json(data);
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		body.id = testdata.length.toString(36);
		testdata.push(body);
		res.json(body);
	},

	/** GET /:id - Return a given entity */
	read({ facet }, res) {
		res.json(facet);
	},

	/** PUT /:id - Update a given entity */
	update({ facet, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				facet[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ facet }, res) {
		testdata.splice(testdata.indexOf(facet), 1);
		res.sendStatus(204);
	}
});
