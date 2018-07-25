


exports.genHeader = function (MID, httpmethod,URI, timestamp, nonce, payload, APIkey)
    {
        var crypto = require("crypto")
        var sign = ''
        var base64Payload = ''
       /* if(payload!='')
        
            payload= JSON.serialize(pl);
    }*/
       var md5 = crypto.createHash('md5')
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
            var a = MID + httpmethod + URI + timestamp + nonce + base64Payload
            var signatureRawData = a.toString()
            console.log(signatureRawData)
            let newBuff = Buffer.from(APIkey, 'base64')
            var secretKeyByteArray = Buffer.from(newBuff, 'utf8')
            var signature1 = new Buffer(signatureRawData).toString('utf8')
            var requestSignatureBase64String = crypto.createHmac('sha256', secretKeyByteArray).update(signature1).digest('base64')
            //console.log("requestSignatureBase64String", requestSignatureBase64String)
            sign = MID+"||"+ requestSignatureBase64String+"||"+ nonce+ "||"+timestamp
            return sign
            consle.log(sign)

       } catch(e)
          {
              console.log(e)
          }
       
      
}