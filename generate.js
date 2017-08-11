const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017/ucalitics';

const targets = ['div', 'li', 'a', 'h1', 'font'];
const types = ['move', 'click','over', 'out', null];

MongoClient.connect(uri, (err, db) => {
	for (i = 0; i < 10000; i++) {
		let data = {
			'x': getRandomInt(0, 2048),
			'y': getRandomInt(0, 1080),
			'target': getRandomValue(targets),
			'timestamp': getRandomTimestamp(),
			'type': getRandomValue(types)
		};
		
		db.collection('tracker').insertOne(data, (err, result) => {
				if (!err) {
					console.log('Se inserto un registro.');
				}
			}
		);
	}
});

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomValue(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function getRandomTimestamp() {
	return addZero(getRandomInt(0, 12)) + ':' + addZero(getRandomInt(0, 59));
}

function addZero(value) {
	if (value < 10) {
		return '0' + value;
	}
	
	return value;
}