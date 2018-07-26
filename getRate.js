'use strict'


exports.getRateNow = function (){
    var Promise = require("bluebird")
    var crypto = require("crypto")
    var randomNumber = require("random-number-csprng")
    var base64 = require('base-64')
    var request = require('request-promise')
    var dateFormat = require('dateformat')
    var cryptoJS = require ('crypto-js')
    var header = require ('./generatePBXHeader.js')
    const rn = require ('./randomno.js') 
    var APIkey ="b25c9ae6f91d4c9f948b67ec00113456"
    var nonce = rn.randomnumber(5)
  //  var nonce = "12345"
     var now = new Date()
    //var timestamp = "20180725 10:00:00"
   // var now = new Date()
    var timestamp = dateFormat(now, "yyyymmdd hh:MM:ss")
    var MID = "CFF7D059-5EFC-49B2-BD18-B937261943B5"
    var httpmethod="GET"
    var URI = "https://previewapi.paidbycoins.com/v1/cli/rates"
    var payload=''
    
    var signature = header.genHeader(MID, httpmethod,URI, timestamp, nonce, payload, APIkey)
    //console.log(signature)
    
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
        console.log(response.body)
        console.log(error)

      });
    }
       
