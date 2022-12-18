import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { ImgLoadDirective } from './directives/img-load.directive';
import { CategoryService } from './services/category.service';
import { AuthGardService } from './services/guardes/auth-gard.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { SharedDataService } from './services/shared-data-service.service';
import { ShoppingCartGlobalVarService } from './services/shopping-cart-global-var.service';
import { ShoppingCartService } from './services/shopping-cart.service';

@NgModule({
  declarations: [
    ProductQuantityComponent,
    ProductCardComponent,
    ImgLoadDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,

  ],
  providers: [
      SharedDataService, 
      CategoryService, 
      ProductService, 
      ShoppingCartService, 
      ShoppingCartGlobalVarService, 
      OrderService,
      AuthGardService

    ],

  exports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    ProductCardComponent,
    ProductQuantityComponent,
    ImgLoadDirective,
  ]
})
export class SharedModule { }
