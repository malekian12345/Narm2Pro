import { LoginOrRegisterComponent } from './login-or-register/login-or-register.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { DetailFoodComponent } from './foods/detail-food/detail-food.component';
import { DesksComponent } from './desks/desks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FoodsComponent } from './foods/foods.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  DateAdapter,  MAT_DATE_FORMATS,  MAT_DATE_LOCALE } from "@angular/material/core";
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from "../share/material.persian-date.adapter";
import {MatCardModule} from '@angular/material/card';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatIconModule,
    FolderPageRoutingModule,
    MatDatepickerModule,
    MatInputModule,
   ReactiveFormsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatCardModule,
    NgxMaterialTimepickerModule
  ],
  declarations: [
    FolderPage,
    FoodsComponent,
    DashboardComponent,
    DesksComponent,
    DetailFoodComponent,
    ShoppingCartComponent,
    LoginOrRegisterComponent
  ],
  providers: [
    { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS }
  ]
})
export class FolderPageModule {}
