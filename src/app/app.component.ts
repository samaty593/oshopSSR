import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'shared/services/shared-data-service.service';
import { ShoppingCartGlobalVarService } from 'shared/services/shopping-cart-global-var.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private shareService: SharedDataService, 
    private route: ActivatedRoute, 
    private router : Router, 
    private ngzone: NgZone, 
    private cartService: ShoppingCartService,
    private globalCart: ShoppingCartGlobalVarService) {
    
    this.shareService.getData().subscribe((user) => {
      this.ngzone.run(() => {
        this.router.navigate([user[1]]);
      })
    })
   
  }

  async ngOnInit() {
    (await this.cartService.getcart()).subscribe(cart => this.globalCart.setCart(cart));
  }


  }
