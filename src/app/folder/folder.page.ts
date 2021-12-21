import { ApiService } from './api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute,
    private servic:ApiService,
    private menu: MenuController,
    ) {
      this.servic.getStorage('login').then(
        val =>{
          console.log('val',val);
          if(val){
            this.servic.customer_login = true;
            this.servic.customer_id = val.id;
            this.servic.customer_name = val.customerName;
            // console.log(servic.customer_login,' login?')
          }
        }
      )
     }

  ngOnInit() {
    // this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.folder = "سرآشپزباشی";

  }
  openMenu(){
    this.menu.open('first');
  }
}
