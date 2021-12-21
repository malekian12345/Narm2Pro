import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(
    private route: Router,
    private servic:ApiService
  ) {
    this.servic.getStorage('login').then(
      val=>{
        if(val){
        }else{
          route.navigate(['customer/loginOrRegister']);
        }
      }
    );
   }

  ngOnInit(): void {
  }
  navigate(RouteAdress: string) {
    console.log('you clicked');
    this.route.navigate([RouteAdress]);
  }

}
