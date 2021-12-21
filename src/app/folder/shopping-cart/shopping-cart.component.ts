import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from './../api.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Desk } from '../desks/desks.component';
import { foods } from './../foods/foods.component';
import * as moment from 'jalali-moment';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
export interface sendingFood {
  id: number,
  foodNumber: number,
  foodTotal_price: number
}
export interface sendingDeskT {
  id: number,
  totalPrice: number

}
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShoppingCartComponent implements OnInit {
  selectedDate: any | null;
  minDate: Date;
  time1: string;
  time2: string;
  foodsData: foods[] = [];
  desksData: Desk[] = [];
  TheForm: FormGroup;
  deskReservedBefore: any;
  constructor(
    public toastController: ToastController,
    private servic: ApiService,
    public loadingController: LoadingController,
    private formbuild: FormBuilder,
    private route: Router,
  ) {
    this.servic.getStorage('login').then(
      val => {
        if (val) {
        } else {
          route.navigate(['customer/loginOrRegister']);
        }
      }
    );
    this.TheForm = formbuild.group({
      foods: this.formbuild.array([]),
      customerID: [''],
      date_reserved: [''],
      time1_reserved: ['']
    });
    this.minDate = new Date();
    console.log(this.minDate);
    //! getting data from localstorafe {{foods}}
    servic.getStorage('foods').then(
      (data: any) => {
        console.log('foods from storage=', data);
        if (data) {
          for (let d of data) {
            let temp: foods = {
              id: d.id,
              name: d.name,
              like: d.like,
              pathpic: d.pathpic,
              price: d.price,
              selected: d.selected,
              store: d.store,
              number: d.number
            }
            this.foodsData.push(temp);
          }
          console.log('foodData=', this.foodsData);
        }
      }
    );
    //! گرفتن اطلاعات میز از حافظه دستگاه
    servic.getStorage('desks').then(
      (data: any) => {
        console.log('desks from storage=', data);
        if (data) {
          for (let d of data) {
            let temp: Desk = {
              id: d.id,
              capacity: d.capacity,
              picturePath: d.picturePath,
              price: d.price,
              selected: d.selected,
              totalPrice: d.totalPrice
            }
            this.desksData.push(temp);
          }
          console.log('desksData=', this.desksData);
        }
      }
    )
  }

  ngOnInit() { }
  //! خرید نهایی
  transaction() {
    // this.selectedDate = moment();
    // this.time1 = '04:00';
    // this.time2 = '06:00';
    // console.log('tafright---::',typeof(this.time1));
    // let tt1 = moment().hour(12);
    // console.log(tt1.get('hour'));
    // console.log(this.time1[0])

    if (this.selectedDate) {
      let m = this.selectedDate;
      m.locale('fa'); // change locale for this moment instance
      console.log(m.format('YYYY-M-D'));
      console.log(this.time1);
      console.log(this.time2);

      let timei2: boolean = false;
      if (this.desksData.length == 0) {
        timei2 = true
      } else if (this.time2) {
        timei2 = true;
      }

      if (this.time1 && timei2) {
        if (this.time2) {
          //! checking time start and time end
          let h1 = parseInt(this.time1[0]) * 10 + parseInt(this.time1[1]);
          let h2 = parseInt(this.time2[0]) * 10 + parseInt(this.time2[1]);
          let h = h2 - h1;//total hour

          if (h < 0) {
            this.toastMsg(
              'زمان پایان نباید قبل از زمان شروع باشد',
              'errorToast'
            );
            return;
          } else if (h == 0) {
            let m1 = parseInt(this.time1[3]) * 10 + parseInt(this.time1[4]);
            let m2 = parseInt(this.time2[3]) * 10 + parseInt(this.time2[4]);
            let m = m2 - m1;//total miniute
            if (m == 0) {
              this.toastMsg(
                'زمان پایان و زمان شروع یکسان می باشد',
                'errorToast'
              );
              return;
            }
            if (m < 30) {
              this.toastMsg(
                'حداقل ۳۰ دقیقه بین زمان شروع و زمان پایان فاصله باشد',
                'errorToast'
              );
              return;
            }
            if (m < 0) {
              this.toastMsg(
                'زمان پایان نباید قبل از زمان شروع باشد',
                'errorToast'
              );
              return;
            }
            // console.log('m is ===',m)
          }
        }


        if (this.foodsData.length && this.desksData.length) {
          console.log("you have 2 desk and food");
          //!--------------------------------------------------------------
          //TODO sending both desk and foods data
          //!--------------------------------------------------------------
          let sendFood: sendingFood[] = [];
          for (let item of this.foodsData) {
            let temp: sendingFood = {
              id: item.id,
              foodNumber: item.number,
              foodTotal_price: (item.number * item.price)
            }
            sendFood.push(temp);
            // this.TheForm.controls['foods'].
          }
          if (this.desksData[0].totalPrice == 0) {
            this.countPrice();
          }
          let arraySendDesk: sendingDeskT[] = [];
          for (let item of this.desksData) {
            let temp: sendingDeskT = {
              id: item.id,
              totalPrice: item.totalPrice
            };
            arraySendDesk.push(temp);
          }
          // let sendingDesks = {
          //   "deskDD": arraySendDesk,
          //   "customerID": this.servic.customer_id,
          //   "date_reserved": m.format('YYYY-M-D'),
          //   // "date_reserved": '2021-12-01',
          //   "start_time": this.time1,
          //   "end_time": this.time2
          // }
          // let Sending_foodData = {
          //   "foodDD": sendFood,
          //   "customerID": this.servic.customer_id,
          //   "date_reserved": m.format('YYYY-M-D'),
          //   "time_reserved": this.time1
          // }
          let SendingBoth = {
            "deskDD": arraySendDesk,
            "foodDD": sendFood,
            "customerID": this.servic.customer_id,
            "date_reserved": m.format('YYYY-M-D'),
            "start_time": this.time1,
            "end_time": this.time2
          }
          this.servic.addTransactionFoodANDdesk(SendingBoth).subscribe(
            (val: any) => {
              console.log('2 val =', val);
              if (val.status == "Success") {
                this.toastMsg(
                  'تراکنش غذا و میز با موفقیت ثبت شدند',
                  'toasting'
                );
                this.desksData = [];
                this.foodsData = [];
                this.servic.setStorage('foods',this.foodsData);
                this.servic.setStorage('desks',this.desksData);
              } else if (val.status == "FoodError") {
                let id = val.msg;
                let indexi = this.foodsData.findIndex(index => index.id == id);
                this.toastMsg(
                  'غذای ' + this.foodsData[indexi].name + ' میزان کمتری از آن موجود است از سبد خرید حذف کرده و دوباره ظرفیت آن را چک کنید',
                  'errorToast'
                );
              } else if (val.status == 'reserved') {
                this.deskReservedBefore = val;
                console.log('desk reserved:', this.deskReservedBefore);
                this.toastMsg(
                  'تراكنش رزرو ميز با خطا مواجه شد',
                  'errorToast1'
                );
              } else {
                this.toastMsg(
                  'مشکلی پیش آمد....تراکنش غذا ثبت نشد....',
                  'errorToast'
                );
              }
            }
          )

        } else if (this.foodsData.length || this.desksData.length) {
          console.log('only one');
          //! try sending food transaction to server
          if (this.foodsData.length) {
            // if (false) {
            let sendFood: sendingFood[] = [];
            for (let item of this.foodsData) {
              let temp: sendingFood = {
                id: item.id,
                foodNumber: item.number,
                foodTotal_price: (item.number * item.price)
              }
              sendFood.push(temp);
              // this.TheForm.controls['foods'].
            }
            let Sending_foodData = {
              "foodDD": sendFood,
              "customerID": this.servic.customer_id,
              "date_reserved": m.format('YYYY-M-D'),
              "time_reserved": this.time1
            }
            // console.log('the 3 position of food:',sendFood);
            // console.log('the form=',this.TheForm.value);
            // console.log('let send',Sending_foodData);
            this.servic.addTransactionFood(Sending_foodData).subscribe(
              (val: any) => {
                console.log(val);
                if (val.status == "Success") {
                  this.toastMsg(
                    'تراکنش غذا با موفقیت ثبت شد',
                    'toasting'
                  );
                  this.foodsData = [];
                  this.servic.setStorage('foods',this.foodsData);
                } else if (val.status == "MoreThanStored") {
                  let id = val.msg;
                  let indexi = this.foodsData.findIndex(index => index.id == id);

                  this.toastMsg(
                    'به تازگی غذای '  + this.foodsData[indexi].name + ' به تعداد '+val.newStore+' از آن موجود است ',
                    'errorToast'
                  );
                  this.foodsData[indexi].number = parseInt(val.newStore)-1;
                  this.foodsData[indexi].store = parseInt(val.newStore);
                  this.servic.setStorage('foods',this.foodsData);
                } else {
                  this.toastMsg(
                    'مشکلی پیش آمد....تراکنش غذا ثبت نشد....زمان دیگری را امتحان کنید',
                    'errorToast'
                  );
                }
              }
            );
          }
          //! تلاش برای فرستادن تراکنش میز ها
          if (this.desksData.length) {
            console.log('let start');
            if (this.desksData[0].totalPrice == 0) {
              this.countPrice();
            }
            let arraySendDesk: sendingDeskT[] = [];
            for (let item of this.desksData) {
              let temp: sendingDeskT = {
                id: item.id,
                totalPrice: item.totalPrice
              };
              arraySendDesk.push(temp);
            }
            let sendingDesks = {
              "deskDD": arraySendDesk,
              "customerID": this.servic.customer_id,
              "date_reserved": m.format('YYYY-M-D'),
              // "date_reserved": '2021-12-01',
              "start_time": this.time1,
              "end_time": this.time2
            }
            this.servic.addTransactionDesk(sendingDesks).subscribe(
              (val: any) => {
                console.log(val);
                if (val.status == "Success") {
                  this.toastMsg(
                    'تراكنش ميز با موفقيت ثبت شد',
                    'toasting1'
                  );
                  this.desksData = [];
                  this.servic.setStorage('desks',this.desksData);
                } else {
                  this.deskReservedBefore = val;
                  console.log('desk reserved:', this.deskReservedBefore);
                  this.toastMsg(
                    'تراكنش رزرو ميز با خطا مواجه شد',
                    'errorToast1'
                  );
                }
              }
            )
          }
        } else {
          this.toastMsg(
            'سبد خرید شما خالی است',
            'errorToast'
          );
        }
      } else {
        this.toastMsg(
          'لطفا زمان رزو را انتخاب کنید',
          'errorToast'
        );
      }
    } else {
      this.toastMsg(
        'لطفا تاریخ رزو را انتخاب کنید',
        'errorToast'
      );
    }

  }

  //محاسبه میزان قیمت میز بر اساس زمان وارد شده
  countPrice() {
    if (this.time2 && this.time1) {
      let h1 = parseInt(this.time1[0]) * 10 + parseInt(this.time1[1]);
      let h2 = parseInt(this.time2[0]) * 10 + parseInt(this.time2[1]);
      let h = h2 - h1;//total hour

      let m1 = parseInt(this.time1[3]) * 10 + parseInt(this.time1[4]);
      let m2 = parseInt(this.time2[3]) * 10 + parseInt(this.time2[4]);
      let m = m2 - m1;//total miniute

      // console.log('hour=',h);
      // console.log('miniute=',m);
      if (h >= 0) {
        if (m < 0) {
          m = m * - 1;
        }
        for (let it of this.desksData) {
          it.totalPrice = it.price * h + ((it.price / 60) * m);
        }
      }
    }
  }

  //! deleteing food from list
  deleteFood(id) {
    console.log('you clicked ', id);
    let indexi = this.foodsData.findIndex(index => index.id == id);
    this.foodsData.forEach((element, index) => {
      if (index == indexi) {
        this.foodsData.splice(index, 1);
      }
    });
    console.log('new foodsData:', this.foodsData);
    this.servic.setStorage('foods', this.foodsData);
  }
  //! delete desk from list
  deleteDesk(id) {
    console.log('you clicked ', id);
    let indexi = this.desksData.findIndex(index => index.id == id);
    this.desksData.forEach((element, index) => {
      if (index == indexi) {
        this.desksData.splice(index, 1);
      }
    });
    console.log('new desksData:', this.desksData);
    this.servic.setStorage('desks', this.desksData);
  }
  async toastMsg(msg: string, cssCl: string) {
    //errorToast
    // toasting
    let toast = await this.toastController.create({
      message: msg,
      duration: 4500,
      cssClass: cssCl,
      position: 'top'
    });
    toast.present();
  }
}
