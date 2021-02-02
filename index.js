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
		defaultMDfiles: options.defaultMDfiles || ['README.md', 'README.MD', 'readme.md', 'index.md'],
		redirectOnDefault: (typeof options.redirectOnDefault === 'boolean') ? options.redirectOnDefault : true, //redirect instead of rendering directly when a default is found
	};
	marked.setOptions(opts.markerOptions);
	return function(req, res, next) {
		let thisurl = url.parse(req.url).pathname;
		let renderMD = false;
		// if request is for a Markdown file, mark to render as MD, else check if it's a directory request and if so, check if we have any default MD's in this dir.
		if (thisurl.substr(-3, 3) == '.md') renderMD = true;
		else if (thisurl.substr(-1, 1) == '/') {
			let i = 0;
			while (!renderMD && i < opts.defaultMDfiles.length) {
				if (fs.existsSync(rootDir + thisurl + opts.defaultMDfiles[i])) {
					if (opts.redirectOnDefault) return res.redirect(req.baseUrl + req.url + opts.defaultMDfiles[i]);
					thisurl += opts.defaultMDfiles[i];
					renderMD = true;
				}
				i++;
			}
		}
		// if we didn't find something to render, then just go to next middleware, else, render and send response
		if (!renderMD) return next();
		else {
			let classlesscss = '';
			let highlightercss = '';
			if (opts.classlessCSS.length > 0) classlesscss = `<link rel="stylesheet" href="${opts.cssBasePath}/${opts.classlessCSS}">`;
			if (opts.highlighterCSS.length > 0) highlightercss = `<link rel="stylesheet" href="${opts.cssBasePath}/${opts.highlighterCSS}">`;
			const convertedContents = marked(fs.readFileSync(rootDir + thisurl).toString());
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
	};
}

module.exports = { serveMDasHTML, DEFAULT_MARKER_OPTIONS };
