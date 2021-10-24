// 日本語の文字化けを防ぐため、サンプルコードにはcharset指定を含んだContent-Typeヘッダを追加しています。

var http = require('http');
var username = 'dave';
var password = 'ILikeBrie_33';
var realm = 'Node Cookbook';


http.createServer(function(req, res) {
	var auth, login;
	
	if (!req.headers.authorization) {
		authenticate(res);
		return;
	}
	
	auth = req.headers.authorization.replace(/^Basic /, '');
	auth = (new Buffer(auth, 'base64').toString('utf8'));
	
	
	login = auth.split(':'); // [0]にusername、[1]にpasswordが入ります
	
	if (login[0] === username && login[1] === password) {
		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
		res.end('柔らかいチーズが好きだ！');
		return;
	}
	
	authenticate(res);
}).listen(8080);


function authenticate(res) {
	res.writeHead(401, {
		'WWW-Authenticate': 'Basic realm="' + realm + '"',
		'Content-Type': 'text/html; charset=utf-8'
	});
	res.end('認証が必要です。');
}