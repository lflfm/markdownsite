const express = require('express');
const markdownsite = require('../index.js');

let app = express();

let serveMDopts = {
		// classlessCSS: 'sakura.css',
		classlessCSS: 'modest.css',
		highlighterCSS: 'highlighter-default.css',
		cssBasePath: '/styles',
};

app.use('/markdown', markdownsite.serveMDasHTML('./docs',serveMDopts), express.static('./docs'));

app.use('/styles', express.static('./styles'));
app.get('/',function(req,res) {
	res.send(`
<html>
<body>
<a href="markdown/README.md">Open README.md</a>
</body>
</html>`);
});


let server = app.listen(8080, function() {
	const host = server.address().address;
	const port = server.address().port;

	console.log("Example site listening at http://%s:%s", host, port);
});
