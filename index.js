var request = require("request");
var dotty = require("dotty");

var Whiplash = function(options){
    
    var whiplash = {};

    if(typeof(options) == "string"){
        var key = options;
    }else if(typeof(options) == "object"){
        var key = options.key;
        var version = options.version;
        var test = options.test;        
    }

    whiplash.url = function(){
        var url;
        if (typeof(test) == "boolean" && test == true || typeof(key) !== "string") {
            url = 'http://testing.whiplashmerch.com/api/';
        } else {
            url = 'https://www.whiplashmerch.com/api/';
        }
        return url;
    }();

    whiplash.key = function(){
        if (typeof(key) !== "string") {
            key = 'Hc2BHTn3bcrwyPooyYTP';
        }
        return key;
    }();

    whiplash.version = function(){
        if (typeof(version) == "undefined") {
            version = "1";
        }
        return version;
    }();

    whiplash.request = function(options,callbacks){

        if(typeof(options) == "string"){
            var string = options;
            var options = {};
            options.url = whiplash.url + string;
        }else if(typeof(options) == "object"){
            options.url = whiplash.url + options.url;
        }

        options.method = (dotty.exists(options,"method")) ? options.method : "GET";
        options.query = (dotty.exists(options,"query")) ? options.query : {};

        request({
            "method": options.method,
            "url": options.url,
            "json":true,
            "headers":{
                "X-API-VERSION": whiplash.version,
                "X-API-KEY": whiplash.key
            },
            "query": options.query
        },function(error,response,body){
            if(error){
                callbacks.error(error, body);
            }else if(response.statusCode !== 200){
                callbacks.error("whiplash order response code :"+ response.statusCode, body);
            }else{
                callbacks.success(body);
            }
        });
        
    }

    return whiplash;

};

module.exports = Whiplash;