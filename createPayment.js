'use strict'


exports.payment = function (){
    var Promise = require("bluebird")
    var crypto = require("crypto")
    var randomNumber = require("random-number-csprng")
    var base64 = require('base-64')
    var request = require('request')
    var querystring = require('querystring')
    var dateFormat = require('dateformat')
    var cryptoJS = require ('crypto-js')
    var header = require ('./headergen_cp.js')
    const rn = require ('./randomno.js') 
    var APIkey ="b25c9ae6f91d4c9f948b67ec00113456"
    //var nonce = rn.randomnumber(5)
    var nonce = "12345"
    //var now = new Date()
    var timestamp = "20180725 10:00:00"
    //var timestamp = dateFormat(now, "yyyymmdd hh:MM:ss")
    var MID = "CFF7D059-5EFC-49B2-BD18-B937261943B5"
    var httpmethod="POST"
    var URI = "https://previewapi.paidbycoins.com/v1/cli/createpayment"
   var payload = JSON.stringify({
        CryptoCurrency:"BTC",
        Currency:"AUD",
        Amount:234.0,
        Detail:{MerchantRefNo:"345345345",
        Email:"user@gmail.com"}
    })
    
    var payload1 = "{\"CryptoCurrency\":\"BTC\",\"Currency\":\"AUD\",\"Amount\":234.0,\"Detail\":{\"MerchantRefNo\":\"345345345\",\"Email\":\"user@gmail.com\"}}";
    
//"{\"CryptoCurrency\":\"BTC\",\"Currency\":\"AUD\",\"Amount\":234.0,\"Email\":\"user@gmail.com\",\"Detail\":{\"MerchantRefNo\":\"345345345\"}}"
    
    var signature = header.headergen (MID, httpmethod,URI, timestamp, nonce, payload1, APIkey)
    //console.log (signature)
    
    request.post({
        "encoding": 'utf8',
        "uri": URI,
        "method": httpmethod,
        "apikey": APIkey,
        "JSON" : true,
        "body": payload1,
        "headers":{
            "content-type":"application/json",
            "pbcx": "CFF7D059-5EFC-49B2-BD18-B937261943B5||sypKNhVwF30MnckD522JYAn1ZE4nUOQkmc/T4ygMu1g=||12345||20180725 10:00:00",
            "User-Agent" : "Request"
        }
    },
      function(error, response, body) {
          if(error)
          {
              return console.error('couldnt connect', error)
          }
        console.log(JSON.parse(response.body))
        console.log(error)

      });
    
   }
   