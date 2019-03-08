/**
 * Created by sunxin on 2017/1/9.
 */
var express = require('express');
var router = express.Router();
var http = require('http');
var https = require('https');
var url=require("url");
var run=require("../../model/runModel")

var moment=require("moment");
/* const log4js = require("log4js"); //gql add
log4js.configure({
    appenders: { log: { type: 'file', filename: 'proxylog_'+moment().format("YYYY-MM-DD_HHmmss")+'.log' } },
    categories: { default: { appenders: ['log'], level: 'error' } }
});
const logger = log4js.getLogger('log');
logger.debug('proxy.js>>>>');
function loggerinfo(t,obj){
	//console.log('proxy.js>onProxy>req');
	
	logger.info('proxy.js>onProxy>'+t);
	logger.info(obj);
}
 */

function loggerinfo(t,obj){
	
}


var getHeader = function (req) {
    loggerinfo('getHeader:',req.headers)

    var ret = {};
    for (var i in req.headers) {
        if (!/^(host|connection|Access-|origin|referer|user-agent|user-doclever|path-doclever|url-doclever|method-doclever|headers-doclever|X-Requested-With)/i.test(i)) {
                ret[i] = req.headers[i];
        }
    }
    var headers=req.headers["headers-doclever"];

    // console.log("proxy.js>headers")
    // console.log(headers)

    if(headers)
    {
        headers=JSON.parse(headers);
        for(var key in headers)
        {
            ret[key]=headers[key];
        }
    }
    return ret;
};

var filterResHeader = function (headers) {
    var ret = {};
    for (var i in headers) {
        if (!/Access-/i.test(i)) {
            if(/set-cookie/i.test(i))
            {
                for(let index=0;index<headers[i].length;index++)
                {
                    headers[i][index]=headers[i][index].split(" ")[0];
                }
                ret[i]=headers[i];
            }
            else
            {
                ret[i] = headers[i];
            }
        }
    }
    return ret;
};

var getPath = function (req) {
    var url = req.url;
    if (url.substr(0, 7).toLowerCase() === 'http://') {
        var i = url.indexOf('/', 7);
        if (i !== -1) {
            url = url.substr(i);
        }
    }
    return url;
};

function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};

function getHost(req) {
    var url=req.headers["url-doclever"];
    url=url.replace(/^(http:\/\/|https:\/\/)/i,"");
    var arr=url.split(":");
    var ret=arr[0];
    if(ret=="127.0.0.1" || ret.toLowerCase()=="localhost")
    {
        ret=getClientIp(req);
    }
    return ret;
}

function getPort(req) {
    var url=req.headers["url-doclever"];
    var defaultPort;
    if(req.headers["url-doclever"].toLowerCase().startsWith("https://"))
    {
        defaultPort=443;
    }
    else
    {
        defaultPort=80;
    }
    url=url.replace(/^(http:\/\/|https:\/\/)/i,"");
    var arr=url.split(":");
    return arr.length>1?arr[1]:defaultPort;
}

function redirect(res,bHttps,opt,location) {
    var urlRedirect=location;
    if(urlRedirect.startsWith("/"))
    {
        urlRedirect=(bHttps?"https://":"http://")+opt.host+":"+opt.port+urlRedirect;
    }
    var objUrl=url.parse(urlRedirect);
    var request1,opt1;
    if(objUrl.protocol=="http:")
    {
        opt1={
            host:  objUrl.hostname,
            path:     objUrl.path,
            method:   "GET",
            port:objUrl.port?objUrl.port:80,
			headers:opt.headers
        }
        request1=http.request;
        bHttps=false;
    }
    else
    {
        opt1={
            host:  objUrl.hostname,
            path:     objUrl.path,
            method:   "GET",
            port:objUrl.port?objUrl.port:443,
            rejectUnauthorized: false,
            requestCert: true,
			headers:opt.headers
        }
        request1=https.request;
        bHttps=true;
    }
    var req3=request1(opt1,function (res3) {
        if(res3.statusCode==302)
        {
            handleCookieIfNecessary(opt1,res3.headers);
            opt.headers.cookie=opt1.headers.cookie;
            redirect(res,bHttps,opt,res3.headers.location)
        }
        else
        {
            var resHeader=filterResHeader(res3.headers)
            resHeader["doclever-request"]=JSON.stringify(handleSelfCookie(req3));
            res.writeHead(res3.statusCode,resHeader);
            res3.pipe(res);
            res3.on('end', function () {

            });
        }
    })
    req3.end();
    req3.on('error', function (err) {
        res.end(err.stack);
    });
}

function handleCookieIfNecessary(opt, headers) {
    let cookies = headers["set-cookie"];
    if (cookies) {
        for (let index in cookies) {
            let cookie = cookies[index];
            let realOfCookie = cookie.split(";")[0];
            if (!opt.headers.cookie) {
                opt.headers.cookie = "";
            }
            opt.headers.cookie += realOfCookie + ";";
        }
    }
}

function handleSelfCookie(req) {
    var arr=req._headers;
    arr["url"]=req.method+" "+req.path;
    var cookie=arr["cookie"];
    if(!cookie)
    {
        return arr;
    }
    var arrCookie=cookie.split(";");
    var keys=["id","name","photo","qq","sex","company","phone","loginCount","age","email"];
    arrCookie=arrCookie.filter(function (obj) {
        obj=obj.trim();
        for(let key of keys)
        {
            if(obj.startsWith(key+"="))
            {
                return false;
            }
        }
        return true;
    })
    arr["cookie"]=arrCookie.join(";");
    return arr;
}

var counter = 0;
var onProxy = function (req, res) {
    console.log('proxy.js>onProxy>req');
	//loggerinfo('req-start',req)
	//loggerinfo('res-start',res)
	
    counter++;
    var num = counter;
    var bHttps=false;
    if(req.headers["url-doclever"].toLowerCase().startsWith("https://"))
    {
        bHttps=true;
    }
    var opt,request;
    if(bHttps)
    {
        opt= {
            host:     getHost(req),
            path:     req.headers["path-doclever"],
            method:   req.headers["method-doclever"],
            headers:  getHeader(req),
            port:		getPort(req),
            rejectUnauthorized: false,
            requestCert: true,
        };
        request=https.request;
    }
    else
    {
        opt= {
            host:     getHost(req),
            path:     req.headers["path-doclever"],
            method:   req.headers["method-doclever"],
            headers:  getHeader(req),
            port:		getPort(req)
        };
        request=http.request;
    }

    
	
    run.create({
        user:req.headers["user-doclever"],
        host:opt.host,
        path:opt.path,
    },function (err) {
        console.log('proxy.js>run.create>err');
        console.log(err);
    })
	
	loggerinfo('opt-before request>opt:',opt)
	
    var req2 = request(opt, function (res2) {
		
       loggerinfo('res2-in request:',res2)
	   
        if(res2.statusCode==302)
        {
            loggerinfo('res2-in request>statuscode=302:',res2.headers.location)
            handleCookieIfNecessary(opt,res2.headers);
            redirect(res,bHttps,opt,res2.headers.location)
        }
        else
        {
            var resHeader=filterResHeader(res2.headers)
            resHeader["doclever-request"]=JSON.stringify(handleSelfCookie(req2));
            res.writeHead(res2.statusCode, resHeader);
			
			loggerinfo('res-before pipe:',res)
			
			res2.on('data', (chunk) => {
				loggerinfo('res2.on-data1:',chunk.toString())
			});//geqiuli add
			
            res2.pipe(res);
			
			res2.on('data', (chunk) => {
				loggerinfo('res2.on-data2:',chunk.toString())
			});//geqiuli add
	
	
            res2.on('end', function () {
                loggerinfo('req2.on-data:','res2.on--end')
            });
        }
    });
	
	loggerinfo('req2-after request:',req2)
	
	
    if (/POST|PUT|PATCH/i.test(req.method)) {
		loggerinfo('if post/put/patch req:',req)
		
        req.pipe(req2);
		req.on('data', (chunk) => {
			loggerinfo('req.on-data:',chunk.toString())
		});//geqiuli add
		loggerinfo('if post/put/patch after pipe req2:',req2)
		loggerinfo('if post/put/patch after pipe req:',req)
		
    } else {
        req2.end();
    }
	
	req2.on('data', (chunk) => {
		loggerinfo('req2.on-data:',chunk)
	});//geqiuli add
	
	
    req2.on('error', function (err) {
        console.log('req2.on>err')
        console.log(err)
        res.end(err.stack);
    });
};

router.post("/",function (req,res) {
	
	onProxy(req,res)
	loggerinfo('router after post /proxy req:',req)
	loggerinfo('router after post /proxy res:',res)
})

var onProxy2 = function (req, res) {
    console.log('proxy.js>onProxy2>onProxy2>req');
	loggerinfo('onProxy2>req-start',req)
	//loggerinfo('res-start',res)
	
    counter++;
    var num = counter;
    var bHttps=false;
    if(req.headers["url-doclever"].toLowerCase().startsWith("https://"))
    {
        bHttps=true;
    }
    var opt,request;
    if(bHttps)
    {
        opt= {
            host:     getHost(req),
            path:     req.headers["path-doclever"],
            method:   req.headers["method-doclever"],
            headers:  getHeader(req),
            port:		getPort(req),
            rejectUnauthorized: false,
            requestCert: true,
        };
        request=https.request;
    }
    else
    {
        opt= {
            host:     getHost(req),
            path:     req.headers["path-doclever"],
            method:   req.headers["method-doclever"],
            headers:  getHeader(req),
            port:		getPort(req)
        };
        request=http.request;
    }

    
	
    run.create({
        user:req.headers["user-doclever"],
        host:opt.host,
        path:opt.path,
    },function (err) {
        console.log('proxy.js>run.create>err');
        console.log(err);
    })
	
	loggerinfo('onProxy2>opt-before request:',opt)
	
    var req2 = request(opt, function (res2) {
		
       loggerinfo('onProxy2>res2-in request:',res2)
	   
        if(res2.statusCode==302)
        {
            loggerinfo('onProxy2>res2-in request>statuscode=302:',res2.headers.location)
            handleCookieIfNecessary(opt,res2.headers);
            redirect(res,bHttps,opt,res2.headers.location)
        }
        else
        {
            var resHeader=filterResHeader(res2.headers)
            resHeader["doclever-request"]=JSON.stringify(handleSelfCookie(req2));
            res.writeHead(res2.statusCode, resHeader);
			
			loggerinfo('onProxy2>res-before pipe:',res)
			
			res2.on('data', (chunk) => {
				loggerinfo('onProxy2>res2.on-data1:',chunk.toString())
			});//geqiuli add
			
            res2.pipe(res);
			
			res2.on('data', (chunk) => {
				loggerinfo('onProxy2>res2.on-data2:',chunk.toString())
			});//geqiuli add
	
	
            res2.on('end', function () {
                loggerinfo('onProxy2>req2.on-data:','res2.on--end')
            });
        }
    });
	
	loggerinfo('onProxy2>req2-after request:',req2)
	
	
    if (/POST|PUT|PATCH/i.test(req.method)) {
		loggerinfo('if post/put/patch req:',req)
		
        req.pipe(req2);
		req.on('data', (chunk) => {
			loggerinfo('req.on-data:',chunk.toString())
		});//geqiuli add
		loggerinfo('if post/put/patch after pipe req2:',req2)
		loggerinfo('if post/put/patch after pipe req:',req)
		
    } else {
        req2.end();
    }
	
	
    req2.on('error', function (err) {
        console.log('req2.on>err')
        console.log(err)
        res.end(err.stack);
    });
};
router.post("/proxy2",function (req,res) {
	
	onProxy2(req,res)
})

module.exports=router;