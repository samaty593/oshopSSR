import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'shared/services/shared-data-service.service';
import { ShoppingCartGlobalVarService } from 'shared/services/shopping-cart-global-var.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username: string;
  shoppingCartItemCount;

  constructor(
    private shareservice: SharedDataService, 
    private shoppingCartService: ShoppingCartService,
    private globalCart: ShoppingCartGlobalVarService,
    ) { 
  }

  async ngOnInit() {
    this.shareservice.getData().subscribe(user => this.username = user[0]);

    this.globalCart.getLastCart().subscribe(cart => {
      this.shoppingCartItemCount =  cart.count
    })

  }

}