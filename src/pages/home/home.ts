import { Component } from '@angular/core';
import {Alert, NavController, NavParams} from 'ionic-angular';
import { getQuote, createPayment, paymentStatus } from '@nishamalik8982/aircrypto';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Select } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators, AbstractControl} from "@angular/forms";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  /*formgroup:FormGroup;
  amount:AbstractControl;
  cryptoType:AbstractControl;*/
  public  cryptoCurrency:Array<string> = ["ETH", "BTC", "LTC", "BCH"];
  public showCrypto:boolean = false;
  public showFiat:boolean = false;
  public type:string = ""; // FIAT or CRYPTO



  @ViewChild('selectCrypto') selectCrypto: Select;
  public cryptoType:string = "";


  // Currencies
  public primaryCurrency:string = "";
  public secondaryCurrency:string = "";
  public secondaryCurrencyIsFiat:boolean = false;
  public amount:number = null;
  public quoteResponse:boolean = false;

  public email:string = "";
  public quotedAmount:number = null;
  public inputAmount: boolean = false;
  public confirmQuote: boolean = false;
  public status: boolean = false;
  private Payment:any = {
    ID: null,
    address: "",
    cryptoAmount: null
  };



  constructor(public navCtrl: NavController,
              public http: HttpClient)
              {

              }




  showCurrency() {
    if ( this.type === "CRYPTO" ) {
      this.showCrypto = true;
      this.showFiat = false;
      this.secondaryCurrency = "AUD";
      this.secondaryCurrencyIsFiat = true;
    } else {
      this.secondaryCurrencyIsFiat = false;
      this.showCrypto = false;
      this.showFiat = true;
      this.primaryCurrency = "AUD";
    }

    this.status = false;
    this.confirmQuote = false;
    this.quoteResponse = true;
  }

  public showAmount() {
    this.inputAmount = true;
  }



  public getRate() {
    let that = this;
    console.log(this.amount, this.primaryCurrency, this.secondaryCurrency);
    document.getElementById('quoteResponse').textContent = 'Getting quote...';
    that.confirmQuote = true;
    getQuote(this.amount, this.primaryCurrency, this.secondaryCurrency).then(function (res) {
      document.getElementById('quoteResponse').textContent = 'Your quote: ' + that.amount + ' ' + that.primaryCurrency.toString() + ' = ' + res + ' ' + that.secondaryCurrency;
      if (that.secondaryCurrencyIsFiat && res < 30) {
        alert("Minimum amount is:  " + (that.amount*30/res).toFixed(4).toString() + that.primaryCurrency );

      } else {
        that.quotedAmount = res;
        that.status = true;
      }
    }).catch(function (e) {
      alert(e.message);
    });
  }

  public createPayment() {
    let that = this;
    if (this.secondaryCurrencyIsFiat) {
      createPayment(this.email, this.primaryCurrency, this.quotedAmount).then(function (res) {
        console.log(that.email, that.primaryCurrency, that.quotedAmount);
        let response = JSON.parse(res);
        that.Payment = {
          ID: response.Data.PaymentID,
          address: response.Data.CryptoAddress,
          cryptoAmount: response.Data.CryptoAmount
        };
        alert(
          "\npaymentID:   " + that.Payment.ID +
          "\ncryptoAddress:   " + that.Payment.address +
          "\ncryptoAmount:   " + that.Payment.cryptoAmount + "  " + that.primaryCurrency);
      }).catch(function (e) {
        alert(e.message);
      });
    } else {
      createPayment(this.email, this.secondaryCurrency, this.amount).then(function (res) {
        let response = JSON.parse(res);
        that.Payment = {
          ID: response.Data.PaymentID,
          address: response.Data.CryptoAddress,
          cryptoAmount: response.Data.CryptoAmount
        };
        alert(
          "\npaymentID:   " + that.Payment.ID +
          "\ncryptoAddress:   " + that.Payment.address +
          "\ncryptoAmount:   " + that.Payment.cryptoAmount + "  " + that.secondaryCurrency);
      }).catch(function (e) {
        alert(e.message);
      });
    }

  }


  public paymentStatus() {
    let that = this;
    paymentStatus(that.Payment.ID).then(function (res) {
      let response = JSON.parse(res);
      let TransactionStatus = response.Data.Status;
      alert("\nPayment Status:   " + TransactionStatus);
    }).catch(function (e) {
      alert(e.message);
    });
  }


}
