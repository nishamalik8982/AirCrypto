
'use strict';
var Promise = require("bluebird");
var crypto = require("crypto");
var randomNumber = require("random-number-csprng");
var base64 = require('base-64');
var request = require('request-promise');
var dateFormat = require('dateformat');
var cryptoJS = require ('crypto-js');


   var APIkey ="b25c9ae6f91d4c9f948b67ec00113456";
    var length;
    var randomNumber = function (length) {
        return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
    };
    var nonce = randomNumber(5);
    //console.log(randomNumber(5));
    var now = new Date();
    var timestamp = dateFormat(now, "yyyymmdd hh:MM:ss");
    //console.log(timestamp);
    var MID = "CFF7D059-5EFC-49B2-BD18-B937261943B5";
    var httpmethod="GET";
    var URI = "https://previewapi.paidbycoins.com/v1/cli/rates";
    var payload='';
    var signature = getPBCXHeader(MID, httpmethod,URI, timestamp, nonce, payload, APIkey);
    //console.log(signature);
    
    request({
        "uri": URI,
        "method": httpmethod,
        "apikey": APIkey,
        "JSON" : true,
        "headers":{
            "pbcx": signature,
            "User-Agent" : "Request-Promise"
        }
        }, 
      function(error, response, body) {
        console.log(response.body);
      });
    
    function getPBCXHeader(MID, httpmethod,URI, timestamp, nonce, payload, APIkey)
    {
        var sign = '';
        var base64Payload = '';
       /* if(payload!='')
        
            payload= JSON.serialize(pl);
    }*/
       var md5 = crypto.createHash('md5');
      /* if(payload!='')
       {
           try{
            console.log ("entering try block for encode-decode");
            var pl = utf8.encode(payload);
            var bytes= md5.update(pl, 'utf8').digest("hex");
            var base64Payload = base64.encode(bytes);
           // throw "decoded";
          /* }
           catch (e)
           {
               console.log("encode decode unsuccessful");
           }*/
          try{
              console.log("calculating base64string");
            var a = MID + httpmethod + URI + timestamp + nonce + base64Payload;
            var signatureRawData = a.toString();
            let newBuff = Buffer.from(APIkey, 'base64');
            var secretKeyByteArray = Buffer.from(newBuff, 'utf8');
            var signature1 = new Buffer(signatureRawData).toString('utf8')
            var requestSignatureBase64String = crypto.createHmac('sha256', secretKeyByteArray).update(signature1).digest('base64');
            sign = MID+"||"+ requestSignatureBase64String+"||"+ nonce+ "||"+timestamp;
            return sign;

       } catch(e)
          {
              console.log(e);
          }
       
      
};