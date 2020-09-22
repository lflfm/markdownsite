const url = require('url');
const fs = require('fs');

const marked = require('marked');
const hljs = require('highlight.js');

const DEFAULT_MARKER_OPTIONS = {
	renderer: new marked.Renderer(),
	highlight: function(code, language) {
		const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
		return hljs.highlight(validLanguage, code).value;
	},
	pedantic: false,
	gfm: true,
	breaks: false,
	sanitize: false,
	smartLists: true,
	smartypants: false,
	xhtml: false
};

function serveMDasHTML(rootDir, options = {}) {
	const opts = {
		pageTitle: options.pageTitle || 'serveMDasHTML',
		cssBasePath: options.cssBasePath || '.',
		classlessCSS: options.classlessCSS || '',
		highlighterCSS: options.highlighterCSS || '',
		htmlPreContent: options.htmlPreContent || '',
		htmlPosContent: options.htmlPosContent || '',
		markerOptions: options.markerOptions || DEFAULT_MARKER_OPTIONS,
		extraHtmlHead: options.extraHtmlHead || '',
	};
	marked.setOptions(opts.markerOptions);
	return function(req, res, next) {
		const thisurl = url.parse(req.url);
		if (thisurl.pathname.substr(-3, 3) == '.md') {
			let classlesscss = '';
			let highlightercss = '';
			if (opts.classlessCSS.length>0) classlesscss = `<link rel="stylesheet" href="${opts.cssBasePath}/${opts.classlessCSS}">`;
			if (opts.highlighterCSS.length>0) highlightercss = `<link rel="stylesheet" href="${opts.cssBasePath}/${opts.highlighterCSS}">`;
			const convertedContents = marked(fs.readFileSync(rootDir + thisurl.pathname).toString());
			res.send(`
<html>
	<head>
		<title>${opts.pageTitle}</title>
		${classlesscss}
		${highlightercss}
${opts.extraHtmlHead}
	</head>
<body>
${opts.htmlPreContent}
${convertedContents}
${opts.htmlPosContent}
</body>
</html>`);
		}
		else next();
	};
}

module.exports = { serveMDasHTML };
