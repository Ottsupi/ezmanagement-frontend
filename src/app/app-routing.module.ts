import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopWindowComponent } from './shop-window/shop-window.component';
import { RecieptComponent } from './reciept/reciept.component';

const routes: Routes = [
  { path: '', component: ShopWindowComponent },
  { path: 'receipt', component: RecieptComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
