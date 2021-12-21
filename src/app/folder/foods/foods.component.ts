import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

export interface foods {
  id: number,
  name: string,
  price: number,
  pathpic: string,
  store: number,
  selected: boolean,
  like: boolean,
  number: number
}

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss'],
})
export class FoodsComponent implements OnInit {

  foodData: foods[] = [];
  foodsSelected: foods[] = [];
  constructor(
    public toastController: ToastController,
    private servic: ApiService,
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
    servic.getStorage('foods').then(
      (data) => {
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
              number: 1
            }
            this.foodsSelected.push(temp);
          }
        }
        console.log('select=', this.foodsSelected);
        //! then geting data from server (php)
        //! get food from backend
        servic.getFoods().subscribe(
          (val: any) => {
            console.log('data from server=', val);
            for (let item of val) {
              //! local storage more important than data we get from server
              //!so if we have data from localstorage then we ignore server data
              let index = this.foodsSelected.find(indexi => indexi.id == item.id);
              // console.log('i find ',index);
              if(index){
                this.foodData.push(index);
                continue;
              }
              //! else we save the data from server
              let temp: foods = {
                id: item.id,
                name: item.foodName,
                pathpic: item.picturePath,
                price: item.price,
                store: item.store,
                selected: false,
                like: false,
                number: 1
              }
              this.foodData.push(temp);
            }
            console.log('foodData=', this.foodData);
          }
        );
      }
    );

  }

  ngOnInit() { }
  godesk(){
    this.route.navigate(['customer/desks']);
  }

  async foodclicked(id, foodname: string,store:number) {
    if(store == 0){
      return;
    }
    console.log('you clicked ', id);
    let index = this.foodData.findIndex(index => index.id == id);

    //!remove if was selected
    if (this.foodData[index].selected) {
      this.foodData[index].selected = false;
      let i = this.foodsSelected.findIndex(i => i.id == id);
      this.foodsSelected.forEach((element, index) => {
        if (index == i) {
          this.foodsSelected.splice(index, 1);
        }
      });
      console.log('after remove=', this.foodsSelected);
      this.showToast(
        ' غذای {{' + foodname + ' }} از سبد خرید حذف شد',
        "warnToast"
      );
    } else {
      //!add food for select
      this.foodData[index].selected = true;
      this.foodsSelected.push(this.foodData[index]);
      console.log('added now =', this.foodsSelected)
      this.showToast(
        ' غذای {{' + foodname + ' }} به سبد خرید اضافه شد',
        "toasting"
      );
    }
    this.servic.setStorage('foods', this.foodsSelected);
    // this.servic.seeStorage();
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
