var thrift = require('thrift');
var Echo = require('./gen-nodejs/TEchoService.js');
const assert = require('assert');


var options = {
   transport: thrift.TBufferedTransport,
   protocol: thrift.TJSONProtocol,
   path: "/thrift/echo/echo",
   headers: {"Connection": "close"}
};

var connection = thrift.createHttpConnection("huginn", 9000, options);

connection.on('error', function(err) {
	assert(false, err);
});

var client = thrift.createHttpClient(Echo, connection);

client.echo('hi', function(err, response) {
	if (err) {
		console.log("InvalidOperation " + err);
	}else {
		console.log("response: " + response);
	}
});
