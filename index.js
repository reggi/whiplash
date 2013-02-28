var request = require("request");
var dotty = require("dotty");
var _ = require("underscore");

var Whiplash = function(config){
    
    var whiplash = {};

    whiplash.config = (function(config){

        if(typeof(config) === "string"){
            var config = {
                "key":config
            };
        }else if(typeof(config) == "undefined"){
            var config = {};
        }
        
        return _.defaults(config,{
            "baseurl": (dotty.exists(config,"key")) ? 'https://www.whiplashmerch.com/api' : "http://testing.whiplashmerch.com/api",
            "key": "Hc2BHTn3bcrwyPooyYTP",
            "version": 1,
        });

    })(config);

    whiplash.options = function(options){

        if(typeof(options) === "string"){
            var options = {
                "url":options
            };
        }else if(typeof(options) == "undefined"){
            var options = {};
        }

        if(dotty.exists(options,"url")){
            options.url = (options.url.match(/^\//)) ? options.url.substring(1,options.url.length) : options.url;
            options.url = whiplash.config.baseurl + "/" + options.url;
        }

        return _.defaults(options,{
            "url": whiplash.config.baseurl,
            "json": true,
            "method": "GET",
            "headers":{
                "X-API-VERSION": whiplash.config.version,
                "X-API-KEY": whiplash.config.key
            },
        });

    };

    whiplash.request = function(options,callback){
        options = whiplash.options(options);
        request(options,function(error,response,body){
            if(error){
                callback(error, body);
            }else if(response && dotty.exists(response, "statusCode")){
                callback(false, body, response.statusCode);
            }else{
                callback("no response status code", body);
            }
        });
        
    }
    
    return whiplash;

};

module.exports = Whiplash;