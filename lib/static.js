var server = new (require('node-static').Server)('./');

var config = App.Config();

App.on('connection', function(request, response, callback) {
  if (request.url == '/favicon.ico') {
	request.url = config.static.path + 'favicon.ico';
  }
	
  if (config.static.enabled && request.url.indexOf('/'+ config.static.path)===0) {
	server.serve(request, response, function(error, resp) {
	  if (error) {
		error.url = request.url;
				
		console.log(error);
	  }
	});
		
	return callback(true);
  }
	
  callback();
});
