var fs = require('fs');
var io = require('socket.io').listen(8081);
var sioclient = require('socket.io-client');

var watcher = [';(function () {',
	'var socket = io.connect(\'ws://localhost:8081\');',
	'socket.on(\'update\', function () {',
	'	location.reload();',
	'});',
'}());'].join('');

sioclient.builder(io.transports(), function (err, siojs) {
	if (!err) {
		io.static.add('/watcher.js', function (path, callback) {
			callback(null, new Buffer(siojs + watcher));
		});
	}
});

fs.watch('content', function (e, f) {
	console.log(e + ' ' + f);
	//if (f[0] !== '.') { // MacOS Xではこのif文を削除
		io.sockets.emit('update');
	// }
});
