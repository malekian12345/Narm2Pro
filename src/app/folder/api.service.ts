import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
// import { Storage } from '@ionic/storage';
import { Storage } from '@ionic/storage-angular';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/timeout';

//! لطفا ای پی آی سیستم خودتون را وارد کنید از طریق دستور زیر
//! " ipconfig " write it in cmd
const baseApi:string = 'http://192.168.43.215:80';
//!لطفا محل قرار گیری فایل بک اند را از قسمت
//! htdocs
//! به بعد را وارد کنید مثلا از من به صورت زیر بود
//! E:\xampp\htdocs\AngularPro\Resturan\backend
const backEnd_Path:string = '/AngularPro/resturan/backend';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _storage: Storage | null = null;
  customer_name:string = '';
  customer_id:string = '';
  customer_login:boolean = false;
  constructor(
    public http: HttpClient,
    private storage: Storage
  ) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public setStorage(key: string, value: any) {
    this._storage?.set(key, value);
  }

  //! see all storage
  public seeStorage(){
    this._storage.forEach((key, value, index) => {
      console.log('at index[',index,'][',key,']==',value);
      console.log('');
    });
  }

  //!get from storage
  async getStorage(key: string){
    return await this._storage.get(key);
  }

  //!remove from storage
  async removeStorage(key: string){
    await this._storage.remove(key);;
  }

  addCustomer(data:any){
    return this.http.post(baseApi+backEnd_Path+'/create.php',data);
  }
  addTransactionFood(data:any){
    // console.log(" i try service");
    // console.log(baseApi+backEnd_Path+'/tranfood.php');
    // console.log('the data=',data);
    return this.http.post(baseApi+backEnd_Path+'/tranfood.php',data);
  }
  addTransactionDesk(data:any){
    return this.http.post(baseApi+backEnd_Path+'/tranDesk.php',data);
  }
  addTransactionFoodANDdesk(data:any){
    return this.http.post(baseApi+backEnd_Path+'/foodANDdesk.php',data);
  }
  LoginCustomer(data:any){
    return this.http.post(baseApi+backEnd_Path+'/login.php',data);
  }
  getFoods(){
    return this.http.get(baseApi+backEnd_Path+'/getFoods.php');
  }
  getDesks(){
    return this.http.get(baseApi+backEnd_Path+'/getDesks.php');
  }
}
