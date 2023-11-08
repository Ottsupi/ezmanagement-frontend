import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalBasicComponent } from './modal-basic/modal-basic.component';
import { InventoryTableComponent } from './inventory-table/inventory-table.component';
import { HttpClientModule } from '@angular/common/http';
import { InventoryAddmodalComponent } from './inventory-table/inventory-addmodal/inventory-addmodal.component';
import { FormsModule } from '@angular/forms';
import { InventoryEditmodalComponent } from './inventory-table/inventory-editmodal/inventory-editmodal.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalBasicComponent,
    InventoryTableComponent,
    InventoryAddmodalComponent,
    InventoryEditmodalComponent
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
