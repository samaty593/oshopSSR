import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { AuthGardService } from 'shared/services/guardes/auth-gard.service';
import { SharedModule } from 'shared/shared.module';

import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';



@NgModule({
  declarations: [
    CheckOutComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    ProductsComponent,
    ShippingFormComponent,
    ShoppingCartComponent,
    ShoppingCartSummaryComponent,
    ProductFilterComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'products' , component: ProductsComponent },
      { path: 'shopping-cart' , component: ShoppingCartComponent },
      { path: 'check-out' , component: CheckOutComponent, canActivate: [AuthGardService] },
      { path: 'order-success/:id' , component: OrderSuccessComponent, canActivate: [AuthGardService]  },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGardService]  },
    ]),
    HttpClientModule,
    MatTableModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    LayoutModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
  ]
})
export class ShoppingModule { }
