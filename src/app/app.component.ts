import { ApiService } from './folder/api.service';
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private menu: MenuController,
    private servc:ApiService
    ) {
    }
  closeMenu() {
    this.menu.close('first');
  }
  logOut(){
    this.servc.customer_login = false;
    this.servc.customer_id = '';
    this.servc.customer_name = '';
    this.servc.setStorage('login',null);
    this.menu.close('first');
  }
}
