import { LoginOrRegisterComponent } from './login-or-register/login-or-register.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { DetailFoodComponent } from './foods/detail-food/detail-food.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { FoodsComponent } from './foods/foods.component';
import { DesksComponent } from './desks/desks.component';

const routes: Routes = [
  {
    path: 'home',
    component: DashboardComponent
  },
  {path:'foods',component:FoodsComponent},
  {path:'foods/:id',component:DetailFoodComponent},
  {path:'loginOrRegister' ,component:LoginOrRegisterComponent},
  {path:'desks' ,component: DesksComponent},
  {path:'shopping',component:ShoppingCartComponent},
  {path:'' , redirectTo:"home"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
