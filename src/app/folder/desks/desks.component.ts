import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

export interface Desk {
  id: number,
  capacity: number,
  picturePath: string,
  price: number,
  totalPrice: number,
  selected: boolean
}
@Component({
  selector: 'app-desks',
  templateUrl: './desks.component.html',
  styleUrls: ['./desks.component.scss'],
})
export class DesksComponent implements OnInit {
  deskData: Desk[] = [];
  deskSelected: Desk[] = [];
  constructor(
    private servic: ApiService,
    public toastController: ToastController,
    private route: Router,
  ) {
    this.servic.getStorage('login').then(
      val=>{
        if(val){
        }else{
          route.navigate(['customer/loginOrRegister']);
        }
      }
    );
    //! first geting selected data from storage
    servic.getStorage('desks').then(
      (data) => {
        //! if we have data from local storage get it
        if (data) {
          for (let d of data) {
            let temp: Desk = {
              id: d.id,
              capacity: d.capacity,
              picturePath: d.picturePath,
              price: d.price,
              selected: d.selected,
              totalPrice: 0
            }
            this.deskSelected.push(temp);
          }
        }
        console.log('select=', this.deskSelected);
        //! then geting data from server (php)
        servic.getDesks().subscribe(
          (val: any) => {
            console.log('data from server=', val);
            for (let item of val) {
              //! local storage more important than data we get from server
              //!so if we have data from localstorage then we ignore server data
              let index = this.deskSelected.find(indexi => indexi.id == item.id);
              // console.log('i find ',index);
              if(index){
                this.deskData.push(index);
                continue;
              }
              //! else we save the data from server
              let temp: Desk = {
                id: item.id,
                capacity: item.capacity,
                picturePath: item.PicturePath,
                price: item.PricePerHour,
                selected: false,
                totalPrice: 0
              }
              this.deskData.push(temp);
            }
            console.log('DeskData=', this.deskData);
          }
        );
      }
    );


  }
  godesk(){
    this.route.navigate(['customer/shopping']);
  }
  ngOnInit() { }

  async deskClick(id) {
    console.log('you clicked ', id);
    let index = this.deskData.findIndex(index => index.id == id);

    //!remove if was selected
    if (this.deskData[index].selected) {
      this.deskData[index].selected = false;
      let i = this.deskSelected.findIndex(i => i.id == id);
      this.deskSelected.forEach((element, index) => {
        if (index == i) {
          this.deskSelected.splice(index, 1);
        }
      });
      console.log('after remove=', this.deskSelected);
      this.showToast(
        ' میز شماره  {{' + id + ' }} از سبد خرید حذف شد',
        "warnToast"
      );
    } else {
      //!add desk for select
      this.deskData[index].selected = true;
      this.deskSelected.push(this.deskData[index]);
      console.log('added now =', this.deskSelected)
      this.showToast(
        ' میز شماره {{' + id + ' }} به سبد خرید اضافه شد',
        "toasting"
      );
    }
    this.servic.setStorage('desks', this.deskSelected);
    this.servic.seeStorage();
  }

  async showToast(msg: string, cssCl: string) {
    let toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      cssClass: cssCl,
      position: 'top'
    });
    toast.present();
  }
}
