import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'shared/models/shopping-cart';
import { ShoppingCartGlobalVarService } from 'shared/services/shopping-cart-global-var.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  cart$: Observable<Cart>;

  constructor(
    private globalCart: ShoppingCartGlobalVarService,
  ) { }

 ngOnInit() {
    this.cart$ = this.globalCart.getLastCart();
   
  }



}
