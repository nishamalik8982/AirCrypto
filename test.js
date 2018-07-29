
'use strict'


var aircrypto = require ('./index.js')

var paymentID = "";
// Quantities to get from user
var amount = 234.0;
var fiatCurrency = "AUD"; // or USD ?
var cryptoType = "XRP";
var userEmail = "user@gmail.com";
var MerchantRefNumber = "345345345"; // ??

aircrypto.getQuote(amount, fiatCurrency, cryptoType).then(function (res) {
    let quotes = JSON.parse(res);
    let y = quotes.Data.filter(function(element){
        return element.PrimaryCurrency === cryptoType && element.SecondaryCurrency === fiatCurrency;
    });
    console.log('QUOTE: %f %s == %d %s',amount.toFixed(2),fiatCurrency,(amount/y[0].Price).toFixed(2),cryptoType);
});



aircrypto.createPayment(userEmail, cryptoType, amount,MerchantRefNumber).then(function (res) {
    let payment = JSON.parse(res);
    paymentID = payment.Data.PaymentID;

    console.log('PAYMENT: status: %s, payment id: %s', payment.Status, paymentID);

    aircrypto.paymentStatus(paymentID).then(function (res) {
        let paymentStatus = JSON.parse(res);
        console.log('PAYMENT STATUS: %s,  %s', payment.Status, paymentStatus.Data.Status);
    });
});
