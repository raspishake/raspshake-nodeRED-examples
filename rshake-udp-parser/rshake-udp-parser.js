module.exports = function(RED) {
    function RShakeUdpParserNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
    	    var flow = this.context().flow;
    	    var input = msg.payload;
	    input = input.replace(new RegExp("'", 'g'), "\"")
	    .replace(new RegExp("{", 'g'), "[")
	    .replace(new RegExp("}", 'g'), "]");

	    var jdata = JSON.parse(input);

	    input = jdata;
	    data = {};

	    var ts_last = flow.get("TSlast");
	    var ts_now = input[1] * 1000;
	    var rate = 0;

	    flow.set("TSlast", ts_now);
	    if(ts_last === undefined) {
		msg.payload = 0;
		return msg;
	    }

	    data.ts_range = (ts_now - ts_last);
	    data.ts = ts_now;
	    data.packets = [];

	    for(var i=2; i < input.length; i++) {
		data.packets.push(input[i]);
	    }

	    msg.payload = data;

	    node.send(msg);
        });
    }
    RED.nodes.registerType("rshake-udp-parser", RShakeUdpParserNode);
}