import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Order } from 'shared/models/order';
import { ShippingForm } from 'shared/models/shipping-form';
import { Cart } from 'shared/models/shopping-cart';
import { OrderService } from 'shared/services/order.service';
import { SharedDataService } from 'shared/services/shared-data-service.service';
import { ShoppingCartGlobalVarService } from 'shared/services/shopping-cart-global-var.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent {
  shipping: ShippingForm = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
  };
  @Input('cart') cart: Cart;
  private userId: string;

  constructor(
    private globalCart: ShoppingCartGlobalVarService,
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private userNameService: SharedDataService,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.userNameService.getData().subscribe(arr => this.userId = arr[3])
  }


  placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);

    let res = this.orderService.storeOrder(order)
      .pipe(
        switchMap(order => {
          this.router.navigate(['/order-success', order.insertedId]);
          return this.cartService.clearCart(); 
        }
    ))

    res.pipe(
          switchMap(cart => { return cart} ))
           .subscribe((cart)=>this.globalCart.setCart(cart));
    


  }
}
