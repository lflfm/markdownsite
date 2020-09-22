# markdownsite
serve markdown files as html  
With this express middleware, you can serve markdown files as if they were HTML.  
This can be useful to host project documentation, blogs and anything markdown.  

Use in a similar way to express.static; except this will only send a response for requests to .md files and will call `next` for anything else.  
See the sample site in the `sample` dir