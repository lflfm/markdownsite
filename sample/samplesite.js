const express = require('express');
const markdownsite = require('../');

let app = express();

let serveMDopts = {
		pageTitle: 'Sample site for serveMarkdown',
		// classlessCSS: 'sakura.css',
		classlessCSS: 'modest.css',
		highlighterCSS: 'highlighter-default.css',
		cssBasePath: '/styles',
		redirectOnDefault: false,
		defaultMDfiles: ['README.md', 'README.MD', 'readme.md', 'index.md','something.md'],
};

app.use('/', markdownsite.serveMDasHTML('./docs',serveMDopts), express.static('./docs'));

app.use('/styles', express.static('./styles'));
// app.get('/',function(req,res) {
// 	res.send(`
// <html>
// <body>
// <a href="markdown/README.md">Open README.md</a>
// </body>
// </html>`);
// });


let server = app.listen(8080, function() {
	const host = server.address().address;
	const port = server.address().port;

	console.log("Example site listening at http://%s:%s", host, port);
});
