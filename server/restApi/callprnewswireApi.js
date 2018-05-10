const querystring = require('querystring');
const https = require('https');
const http = require('http');
 
const appPrNewsRouter = function(app){

var host = 'demo.investorroom.com';
 
let  performRequest = (requestObject, success)=> {
    var dataString = JSON.stringify(requestObject.data);

    if (requestObject.method == 'GET') {
        //endpoint += '?' + querystring.stringify(data);
    }

    let headers = {
        'Content-Type': 'application/json',
        'token': requestObject.token 
    };
	
    var options = {
        host: requestObject.host,
        path: requestObject.endpoint,
        method: requestObject.method,
        headers: headers,
        port : requestObject.port
    };

    var req = requestObject.requestType.request(options, function (res) {
        res.setEncoding('utf-8');

        var responseString = '';

        res.on('data', function (data) {
            responseString += data;
        });

        res.on('end', function () {
            var responseObject = JSON.parse(responseString);
            success(responseObject);
        });
    });
    //req.write(dataString);
    if (requestObject.method !== 'GET') {
        req.write(dataString);
    }
    req.end();
}

class requestClass {
    constructor(host,endpoint,method,data,port,requestType,token){
        this.host = host;
        this.endpoint = endpoint;
        this.method = method;
        this.data = data;
        this.port = port;
        this.requestType = requestType;
        this.token = token;
    }
}

callConsumerApiGet = function(callback){
			
	const requestObject = new requestClass(host,`/api/newsfeed_releases/list.php?format=json`,
        "GET",{},443, https ,"");
			
		performRequest(requestObject,function(assets){
					callback(assets);
					//process.exit(0);
				});
}


callConsumerApiPost = function(assetIdX, callback){
            
    const requestPostObject = new requestClass(host,`/api/newsfeed_releases/get.php?id=${assetIdX}&format=json`,
        "GET",{},443, https ,"");
            
        performRequest(requestPostObject,function(assets){
                    callback(assets);
                    //process.exit(0);
                });
}


callConsumerApiPostFilter = function(year,category,keywords, callback){
            
    const requestPostFilterObject = new requestClass(host,`/api/newsfeed_releases/list.php?start_date=${year}&end_date=${year}&category=${category}&keywords=${keywords}&format=json`,
        "GET",{},443, https ,"");
            
        performRequest(requestPostFilterObject,function(assets){
                    callback(assets);
                    //process.exit(0);
                });
}

//GET Calls

app.get("/getPrNewsApiList", function(req,res){
	
	callConsumerApiGet(function(assets){
				res.send(assets);
				//process.exit(0);
		}); 
});

app.post("/postPrNewsApiList", function(req,res){
    const payload=req.body;
    const assetIdXName=payload.assetIdXName;
    const assetIdX = `${assetIdXName}`;
    console.log('assetIdX ', assetIdX);
    callConsumerApiPost(assetIdX, function(assets){
                res.send(assets);
                //process.exit(0);
        }); 

});

app.post("/postFilterPrNewsApiList", function(req,res){
    const payload=req.body;
    const yearName=payload.yearName;
    const categoryName=payload.categoryName;
    const keywordsName=payload.keywordsName;
    const year = `${yearName}`;
    const category = `${categoryName}`;
    const keywords = `${keywordsName}`;
    console.log(payload);
    callConsumerApiPostFilter(year,category,keywords, function(assets){
                res.send(assets);
                //process.exit(0);
        }); 

});

}
module.exports=appPrNewsRouter;

