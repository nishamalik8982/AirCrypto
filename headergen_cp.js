
exports.headergen = function (MID, httpmethod, URI, timestamp, nonce, payload, APIkey) {

     var crypto = require("crypto")
     
    //var md5 = crypto.createHash("md5")
   // var md5 = require("crypto-js)
    //var sha256 = require("crypto-js/hmac-sha256")
    var CryptoJS = require("crypto-js");
    var JSON = require ("json-serialize")
    var base64 = require('base-64')
    var pl= payload;
    var apikey = APIkey
    

    function md5(string) {    
        return crypto.createHash('md5').update(Buffer(string)).digest('base64');
    }
    function hm()
{
    var apibase64 = Buffer("b25c9ae6f91d4c9f948b67ec00113456", 'base64'); 
    var a = MID + httpmethod + URI + timestamp + nonce + base64Payload   
    //console.log(a)
   // var rawbytes = Buffer(a, 'utf8');
    return crypto.createHmac('sha256', apibase64).update(Buffer(a)).digest('base64');
}

    //crypto-js/enc-base64
    // var pl = json.stringify(payload)
    try {
        console.log("entering try block for encode-decode")
        var base64Payload = md5(pl)
       //console.log(bytes)
       // console.log(plaintext)
        //var bytes = md5.toString(plaintext)
        //console.log(bytes)
        //var base64Payload = base64.encode(bytes)
        //console.log("bas64payloadis: ", base64Payload)
    }
    catch (e) {
        console.log(e)
    }
    try 
    {
       // var a = MID + httpmethod + URI + timestamp + nonce + base64Payload
        //var apibase64 = Buffer(apikey, 'base64');    
       // var signatureRawData = Buffer(a, 'utf8');
       // var rawbytes = Buffer(a, 'utf8');
        var rs = hm();
        console.log("requestsignaturebase64string is", rs)
        //console.log(signatureRawData)
        //let newBuff = Buffer.from(APIkey, 'base64')
        //var secretKeyByteArray = Buffer.from(newBuff, 'utf8')
       /* var signature1 = new Buffer(signatureRawData).toString('utf8')
       // var requestSignatureBase64String = CryptoJS.HmacSHA256(signature1, secretKeyByteArray);
       var requestSignatureBase64String = crypto.createHmac('sha256', secretKeyByteArray).update(signature1).digest('hex');
       console.log("requestSignatureBase64String", requestSignatureBase64String)*/
        //var rs = hm("CFF7D059-5EFC-49B2-BD18-B937261943B5POSThttps://previewapi.paidbycoins.com/v1/cli/createpayment20180725 10:00:0012345gpLRVWfYAJ9AwhRFFlKCaA==");
       // console.log(rs)
        //console.log(rs);
        var sign = MID + "||" + rs + "||" + nonce + "||" + timestamp
        console.log ("Signature: ",sign)
        return sign

    } catch (e) {
        console.log(e)
    }
}

