import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ProductListComponent} from './product-list/product-list.component';
import {CartComponent} from './cart/cart.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
