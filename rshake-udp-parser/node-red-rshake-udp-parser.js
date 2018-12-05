module.exports = function(RED) {
    var Node = false;
    var Flow = false;
    
    
    function as_json(data) {
	data = data.replace(new RegExp("'", 'g'), "\"").replace(new RegExp("{", 'g'), "[").replace(new RegExp("}", 'g'), "]");
	return JSON.parse(data);
    }
    
    function last_ts(jinput) {
	var ret = {};
	var channel = jinput[0];
	var key = channel + "_tslast";
	
	ret.last = Flow.get(key);
	ret.now = (jinput[1] * 1000);
	
	Flow.set(key, ret.now);

	return ret;
    }
    
    function RunNode(msg) {
	var input = msg.payload;
	var jinput = as_json(input);
	
	var ts = last_ts(jinput);
	
	if(ts.last === undefined) {
	    msg.payload = 0;
	    return msg;
	}
	
	
	var data = {};
	
	data.ts_range = (ts.now - ts.last);
	data.ts = ts.now;
	data.channel = jinput[0];
	data.packets = [];

	for(var i=2; i < jinput.length; i++) {
	    data.packets.push(jinput[i]);
	}

	msg.payload = data;

	return msg;
    }


    function InitNode(config) {
	RED.nodes.createNode(this,config);
	
	Node = this;
	Flow = this.context().flow;
	
	Node.on('input', function(msg) {
	    msg = RunNode(msg);
	    Node.send(msg);
	});
    }

    RED.nodes.registerType("rshake-udp-parser", InitNode);
}