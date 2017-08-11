const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017/ucalitics';
const express = require('express')

MongoClient.connect(uri, (err, db) => {
	let app = express();

	app.param('count', (req, res, next, count) => {		
		db.collection('tracker').find({
			'type': {
				$ne: null
			}
		}, {
			'target': 0,
			'_id': 0
		}, {
			'limit': parseInt(count),
			'sort': [['timestamp', 'desc']]
		}).toArray((err, data) => {
			res.send(data);
		});
	});
	
	app.get('/latest/:count', (req, res) => {
		res.end();
	});
	
	app.listen(3000, () => {
		console.log('El servidor esta corriendo sobre http://localhost:3000');
	});
});
