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
	
	app.param('removeCount', (req, res, next, count) => {
		res.send(count + ' van a ser eliminados.');
		for (i = 0; i < parseInt(count); i++) {
			db.collection('tracker').deleteOne({}, (err, obj) => {
				if (err) {
					throw err;
				}
			});
		}
	});
	
	app.get('/delete/:removeCount', (req, res) => {
		res.end();
	});
	
	app.param(['start', 'end'], (req, res, next, value)  => {
		let start = req.params.start;
		let end = req.params.end;
		
		db.collection('tracker').deleteMany({
			'timestamp': {
				$gt: start,
				$lt: end
			}
		}, (err, obj) => {
			if (err) {
				throw err;
			}
			
			res.send(obj.result.n + " registros eliminados.");
		});
	});

	app.get('/deleteBetween/:start/:end', (req, res) => {
		res.end();
	});
	
	app.get('/report', (req, res) => {		
		let result = [];
		
		db.collection('tracker').aggregate([
		{
			'$match': {
				'type': {
					$ne: null
				}
			}
		},
		{
			'$group': {
				_id: '$type',
				count: {
					$sum:1
				}
			}
		},
		{
			$sort: {
				'count': -1
			}
		}], (err, obj) => {
			if (err) {
				throw err;
			}
			
			console.log(obj[0]);
		});
		
		/*
		db.collection('tracker').aggregate([
		{
			'$bucket': {
				'groupBy': '$timestamp',
				'boundaries': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
				'output': {
					'count': { $sum: 1 },
					'horas': { $push: '$timestamp'}
				}
			}
		}], (err, obj) => {
			if (err) {
				throw err;
			}
			
			console.log(obj);
			return obj;
		});*/
		
		let clicks = db.collection('tracker').find({
			'y': {
				$gt: 540
			}
		}).count((err, count) => {
			if (err) {
				throw err;
			}
			
			console.log(count);
		});
	});
	
	app.listen(3000, () => {
		console.log('El servidor esta corriendo sobre http://localhost:3000');
	});
});
