var connect = require('connect');
var util = require('util');
var form = require('fs').readFileSync('form.html');

var app = connect()
	.use(connect.bodyParser())
	.use(connect.limit('64kb'))
	.use(function(req, res) {
		if (req.method === 'POST') {
			console.log('ユーザが次のデータをPOSTしました:\n' + req.body);
			res.end('あなたがPOSTしたデータ:\n' + util.inspect(req.body));
		}
		if (req.method === 'GET') {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(form);
		}
}).listen(8080);
