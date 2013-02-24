# Whiplash Node.js API Libary

This is a very small API library for [Whiplash](https://www.whiplashmerch.com/), you can find the documentation [here](https://www.whiplashmerch.com/documentation/api).

## Installation

[npmjs.org/package/whiplash](https://npmjs.org/package/whiplash)

    npm install whiplash

---

## Usage

    var whiplash = new require("whiplash")();

or 
    
    var Whiplash = new require("whiplash");
    var whiplash = new Whiplash();

---

## Parameters

The `new Whiplash()` object can take a couple of different argument sets.

### Nothing

No arguments, like the following, will connect you to with a test key and the testing url.

	var whiplash = new Whiplash();

### String

A key in the form of a `string`, like so, `version` is automatically `1` and `test` is automatically `false`.
	
	var whiplash = new Whiplash("j54kjh83ij2h23");

### Object
	
A key in the form of a `object, like so.

	var whiplash = new Whiplash({
		"key": "j54kjh83ij2h23",
		"version": "1",
		"test": true
	});

---	

## Request

The last function you'll ever need `whiplash.request()`. This function is very similar to the object above in terms of parameters.

	
	whiplash.request(options,callbacks);
	
The function takes two parameters.

### Option Parameter

#### String

If options is a string it will be the same as `options.url` see below.

#### Object

There is only one mandatory value if you use options as an object and that is `options.url`. No preceding `/` is needed when specifying a path (e.g. `orders`, `orders/originator`)
	
You can specify `options.method` and `query`.

The defaults are as follows:

	var options = {
		"method":"GET",
		"query":{},
	}

### Callbacks Parameter

The `callbacks` param is a object, which needs to contain both `success` and `error`.

### Example

        whiplash.request({
            "method":"DELETE",
            "url":"orders/"+id
        }, function(err, body){
			if(err) console.log(err);
			console.log(body);
		});

---

## Complete Example

The following example returns all `orders`.

# OLD

	var Whiplash = new require("whiplash");
	var whiplash = new Whiplash("j54kjh83ij2h23");
	whiplash.request("orders",{
		success:function(body){
			console.log(body)
		},
		error:function(error, body){
			console.log(error);
			console.log(body);
		}
	});
 
# New

	var Whiplash = new require("whiplash");
	var whiplash = new Whiplash("j54kjh83ij2h23");
	whiplash.request("orders", function(err, body){
		if(err) console.log(err);
		console.log(body);
	});