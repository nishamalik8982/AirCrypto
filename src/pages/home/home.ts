import { Component } from '@angular/core';
import {Alert, NavController, NavParams} from 'ionic-angular';
import { getQuote, createPayment, paymentStatus } from '@nishamalik8982/aircrypto';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
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
  public amount:number = null;
  public cryptoType:string = "";
  public fiatcurrency:string = "";
  public email:string = "";
  public quotedAmount:number = null;
  public hideShowCrypto: boolean = false;
  public confirmQuote: boolean = false;
  public status: boolean = false;
  public payload:any;
  private Payment:any = {
    ID: null,
    address: "",
    cryptoAmount: null
  };

  public MerchantRefNumber:string = "345345345";


  constructor(public navCtrl: NavController, public http: HttpClient
              /*public  navParams: NavParams,
              public formBuilder: FormBuilder*/) {
                  /*this.formgroup = formBuilder.group({
                    amount:['',Validators.required],
                    cryptoType:['',Validators.required]
                  });
                  this.amount= this.formgroup.controls['amount'];
                  this.cryptoType= this.formgroup.controls['cryptoType'];*/

  }
  public showHideCurrency() {
    this.hideShowCrypto = true;
  }



  public getRate() {
    let that = this;
    console.log(this.amount, this.fiatcurrency, this.cryptoType);
    document.getElementById('quoteResponse').textContent = 'Getting quote...';
    that.confirmQuote = true;
    console.log("button on");
    getQuote(this.amount, this.fiatcurrency, this.cryptoType).then(function (res) {
      document.getElementById('quoteResponse').textContent = 'Your quote: ' + that.amount + ' ' + that.fiatcurrency.toString() + ' = ' + res + ' ' + that.cryptoType;
      that.quotedAmount = res;
      that.status = true;
    }).catch(function (e) {
      alert(e.message);
    });
  }

  public createPayment() {
    let that = this;
    createPayment(this.email, this.cryptoType, this.amount, this.MerchantRefNumber).then(function (res) {
      let response = JSON.parse(res);
      that.Payment = {
        ID: response.Data.PaymentID,
        address: response.Data.CryptoAddress,
        cryptoAmount: response.Data.CryptoAmount
      };
      alert(
        "\npaymentID:   " + that.Payment.ID +
        "\ncryptoAddress:   " + that.Payment.address +
        "\ncryptoAmount:   " + that.Payment.cryptoAmount + "  " + that.cryptoType);

      /*if (that.quotedAmount === that.Payment.cryptoAmount) {
        alert("Details of your payment:" +
          "paymentID: " + that.Payment.ID +
          "cryptoAddress: " + that.Payment.address +
          "cryptoAmount: " + that.Payment.cryptoAmount);
      } else {
        alert("Quote matching error");
        console.log(that.quotedAmount, that.Payment.cryptoAmount);
      }*/

    }).catch(function (e) {
      alert(e.message);
    });
  }
  /*public createPayment() {
    console.log('Creating payment');

    this.http.post("localhost:3000/users/createPayment", { // see point 7 User Guide)
      email : this.email,
      quotedAmount: this.quotedAmount,
      cryptoType: this.cryptoType
    }).subscribe(
      res => {
    console.log(res);
  },
  (err: HttpErrorResponse) => {
    console.log(err.error);
    console.log(err.name);
    console.log(err.message);
    console.log(err.status);
  }
  );
}*/

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
