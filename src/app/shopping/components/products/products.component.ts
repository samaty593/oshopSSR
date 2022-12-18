import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'shared/models/product';
import { LoadingImageService } from 'shared/services/loading-image.service';
import { ProductService } from 'shared/services/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements AfterViewInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoaded: boolean;
  cat: string;

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    private imgload: LoadingImageService,
  ) {
    this.populateproduct();
  }    

  private populateproduct() {
    this.productService.getAll()
    .pipe(
      switchMap(r => {
       this.products = r;
        return this.route.queryParamMap;
    }))
    .subscribe(params => {
        let size = this.filteredProducts.length; 
        this.isLoaded = (size == this.products.length) ? true : false;

        this.cat = params.get('category');
        this.applyFilter();
  });
  }

  private applyFilter() {
    if (this.cat === 'all-categories' || this.cat == null) this.filteredProducts = this.products;
    else {
      this.cat = this.cat.toLowerCase();
      this.filteredProducts = this.products.filter(p => this.cat.includes(p.category.toLowerCase()));
      
      if (this.filteredProducts.length == 0) this.isLoaded = true;
    }
  }
  
  async ngAfterViewInit() {
    this.imgload.imagesLoading$.subscribe((count) => {
      if (count == 0) this.isLoaded = true;
    });
    }

}