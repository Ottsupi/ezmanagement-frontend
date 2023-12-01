import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalBasicComponent } from './modal-basic/modal-basic.component';
import { InventoryTableComponent } from './inventory-table/inventory-table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CartTableComponent } from './cart-table/cart-table.component';
import { ShopWindowComponent } from './shop-window/shop-window.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RecieptComponent } from './reciept/reciept.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalBasicComponent,
    InventoryTableComponent,
    CartTableComponent,
    ShopWindowComponent,
    NavbarComponent,
    RecieptComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
