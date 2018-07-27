'use strict'


exports.getRateNow = function (MID,APIkey){
    var Promise = require("bluebird");
    var crypto = require("crypto");
    var randomNumber = require("random-number-csprng");
    var base64 = require('base-64');
    var request = require('request-promise');
    var dateFormat = require('dateformat');
    var cryptoJS = require ('crypto-js');
    var header = require ('./headergen.js');
    const rn = require ('./randomno.js');
    var nonce = rn.randomnumber(5);
    var now = new Date();
    var timestamp = dateFormat(now, "yyyymmdd hh:MM:ss");
    var httpmethod="GET";
    var URI = "https://previewapi.paidbycoins.com/v1/cli/rates";
    var payload='';

    var signature = header.headergen(MID, httpmethod,URI, timestamp, nonce, payload, APIkey);
    return request({
            "uri": URI,
            "method": httpmethod,
            "apikey": APIkey,
            "JSON" : true,
            "headers":{
                "pbcx": signature,
                "User-Agent" : "Request-Promise"
            }},
            function(error, response, body) {
                if (error) {
                    //handle error
                    console.log(error);
                }
            })
            .then(function(response) {
                return response;
            });
}

exports.createPayment = function (CryptoCurrency,Currency,Amount,MerchantRefNumber,Email,MID,APIkey){
    var Promise = require("bluebird");
    var crypto = require("crypto");
    var randomNumber = require("random-number-csprng");
    var base64 = require('base-64');
    var request = require('request-promise');
    var querystring = require('querystring');
    var dateFormat = require('dateformat');
    var cryptoJS = require ('crypto-js');
    var header = require ('./headergen.js');
    const rn = require ('./randomno.js');
    var nonce = rn.randomnumber(5);
    var now = new Date();
    var timestamp = dateFormat(now, "yyyymmdd hh:MM:ss");
    var httpmethod="POST";
    var URI = "https://previewapi.paidbycoins.com/v1/cli/createpayment";

    var payload = JSON.stringify({
        CryptoCurrency: CryptoCurrency,
        Currency: Currency,
        Amount: Amount,
        Detail:{
            MerchantRefNo: MerchantRefNumber,
            Email: Email
        }
    });

    var signature = header.headergen (MID, httpmethod,URI, timestamp, nonce, payload, APIkey);
    return request.post({
            "encoding": 'utf8',
            "uri": URI,
            "method": httpmethod,
            "apikey": APIkey,
            "JSON" : true,
            "body": payload,
            "headers":{
                "content-type":"application/json",
                "pbcx": signature,
                "User-Agent" : "Request"
            }},
            function(error, response, body) {
                if(error) {
                    return console.error('couldnt connect', error);
                }
            })
            .then(function(response) {
                return response;
            });
}

exports.paymentStatus = function (MID,APIkey,paymentID) {
    var Promise = require("bluebird");
    var crypto = require("crypto");
    var randomNumber = require("random-number-csprng");
    var base64 = require('base-64');
    var request = require('request-promise');
    var querystring = require('querystring');
    var dateFormat = require('dateformat');
    var cryptoJS = require ('crypto-js');
    var header = require ('./generatePBXHeader.js');
    const rn = require ('./randomno.js');
    var nonce = rn.randomnumber(5);
    var now = new Date();
    var timestamp = dateFormat(now, "yyyymmdd hh:MM:ss");
    var httpmethod="GET";
    var URI = "https://previewapi.paidbycoins.com/v1/cli/status/" + paymentID;

    var payload = "";

    var signature = header.genHeader(MID, httpmethod,URI, timestamp, nonce, payload, APIkey);
    return request({
            "encoding": 'utf8',
            "uri": URI,
            "method": httpmethod,
            "apikey": APIkey,
            "JSON" : true,
            "body": payload,
            "headers":{
                "content-type":"application/json",
                "pbcx": signature,
                "User-Agent" : "Request"
            }},
        function(error, response, body) {
            if(error) {
                return console.error('couldnt connect', error);
            }
        })
        .then(function(response) {
            return response;
        });
}