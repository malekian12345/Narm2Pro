import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login-or-register',
  templateUrl: './login-or-register.component.html',
  styleUrls: ['./login-or-register.component.scss'],
})
export class LoginOrRegisterComponent implements OnInit {
  wantRegiste: boolean = false;
  hide1 = true;
  hide2 = true;
  hide3 = true;
  registerForm: FormGroup;
  loginform: FormGroup;
  pass2: string = '';
  constructor(
    private rout: Router,
    private _formbuilder: FormBuilder,
    public toastController: ToastController,
    private servic: ApiService,
    public loadingController: LoadingController,
    private route: Router,
  ) {
    // this.servic.getStorage('login').then(
    //   val=>{
    //     if(val){
    //     }else{
    //       route.navigate(['customer/home']);
    //     }
    //   }
    // );
    this.registerForm = this._formbuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required]],
      passConfirm: ['', [Validators.required]]
    });
    this.loginform = this._formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required]]
    });
  }
  ngOnInit() { }

  async login() {
    console.log(this.loginform.value);
    //loader start
    const loading = await this.loadingController.create({
      cssClass: 'loader-class',
      message: 'اندکی صبر...',
      spinner: "bubbles"
    });
    await loading.present();

    //checking email
    if (!this.loginform.controls['email'].valid) {
      loading.dismiss();
      this.toastMsg(
        "ایمیل به درستی وارد نشده است",
        "errorToast"
      );
      return;
    }
    //checking form
    if (!this.loginform.valid) {
      loading.dismiss();
      this.toastMsg(
        "لطفا تمامی مقادیر لازم را وارد کنید",
        "errorToast"
      );
      return;
    }

    this.servic.LoginCustomer(this.loginform.value).subscribe(
      (val: any) => {
        console.log(val);
        if (val.isUser) {
          if (val.login == true) {
            this.servic.customer_id = val.id;
            this.servic.customer_name = val.name;
            this.servic.customer_login = true;
            loading.dismiss();
            this.toastMsg(
              "ورود موفقیت آمیز ... خوش آمدید",
              "toasting"
            );
            let customerLogin = {
              "id":val.id,
              "customerName":val.name
            }
            this.servic.setStorage('login',customerLogin);
            this.rout.navigate(['customer/home']);
            // this.rout.navigateByUrl('/customer', { skipLocationChange: true }).then(() => {
            //   this.rout.navigate(['customer/home']);
            // });
          } else {
            loading.dismiss();
            this.toastMsg(
              "ایمیل یا رمز عبور اشتباه می باشد",
              "errorToast"
            );
          }
        } else {
          loading.dismiss();
          this.toastMsg(
            "این ایمیل قبلا عضو نشده است",
            "errorToast"
          );
          this.wantRegiste = true;
        }

      },
      err => {
        loading.dismiss();
        this.toastMsg(
          "مشكلی پیش آمده",
          "errorToast"
        );
      }
    )
  }

  async register() {

    //loader start
    const loading = await this.loadingController.create({
      cssClass: 'loader-class',
      message: 'اندکی صبر...',
      spinner: "bubbles"
    });
    await loading.present();

    //checking input
    if (!this.registerForm.controls['email'].valid) {
      loading.dismiss();
      this.toastMsg(
        "ایمیل به درستی وارد نشده است",
        "errorToast"
      );
      return;
    }
    if (!this.registerForm.valid) {
      loading.dismiss();
      this.toastMsg(
        "لطفا تمامی مقادیر لازم را وارد کنید",
        "errorToast"
      );
      return;
    }

    //checking 2 passwords
    if (this.registerForm.controls['passConfirm'].value == this.registerForm.controls['pass'].value) {
      this.servic.addCustomer(this.registerForm.value).subscribe(
        (val: any) => {
          console.log('val=', val);
          if (val.status == 'Success') {
            loading.dismiss();
            this.toastMsg(
              "با موفقیت عضو شدید .... حال روی ورود کلیک کنید",
              "toasting"
            );

            this.loginform.controls['email'].setValue(this.registerForm.controls['email'].value);
            this.loginform.controls['pass'].setValue(this.registerForm.controls['pass'].value);
            this.registerForm.reset();
            this.wantRegiste = false;

          } else if (val.message == 'email is already exist') {
            loading.dismiss();
            this.toastMsg(
              'این ایمیل قبلا در سامانه ثبت شده است',
              'errorToast'
            );
          } else {
            loading.dismiss();
            this.toastMsg(
              'این ایمیل قبلا در سامانه ثبت شده است',
              'errorToast'
            );
          }
        },
        err => {
          loading.dismiss();
          this.toastMsg(
            "مشكلی پیش آمده",
            "errorToast"
          );
        }
      )
    } else {
      await loading.dismiss();
      this.toastMsg(
        'رمز عبور و تكرار رمز عبور باهم مطابقت ندارند',
        'errorToast')
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'loader-class',
      message: 'اندکی صبر...',
      spinner: "bubbles"
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  async toastMsg(msg: string, cssCl: string) {
    //errorToast
    // toasting
    let toast = await this.toastController.create({
      message: msg,
      duration: 3500,
      cssClass: cssCl,
      position: 'top'
    });
    toast.present();
  }
}
