import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable} from '@angular/material/table';
import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy, AfterViewInit {
  products: Product[];
  filteredProducts: any[];
  arrLenght: number;
  subscription: Subscription;
  displayedColumns: string[] = ['position','title', 'price', 'edit'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;


  constructor(private productService: ProductService ) {
    this.subscription = this.productService.getAll().subscribe(p => {
      this.products = this.filteredProducts = p;
      this.sizePage();
   });
   }

  filter(query: string) {
    if(query) {
      this.filteredProducts = this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
    } else {
      this.sizePage();
    }
  }

  sizePage() {
    const index = (this.paginator?.pageSize ?? 5)*(this.paginator?.pageIndex ?? 0);
    return this.filteredProducts = this.products.slice(index, index + (this.paginator?.pageSize));
  }

  sortData() {
    if(this.sort.active == 'title') {
      this.products = this.products.sort((a,b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
          return 0;
      })
    } else {
      this.products = this.products.sort((a,b) => {
        const priceA = a.price;
        const priceB = b.price;
        if (priceA < priceB) {
          return -1;
        }
        if (priceA > priceB) {
          return 1;
        }
          return 0;
      })
    }
     
    this.table.renderRows();
    this.sizePage();
  }

  ngAfterViewInit() {
    this.sort.sortChange
      .pipe(
        tap(() =>{
          this.sortData();
        })
      )
      .subscribe();


    this.paginator.page 
    .pipe(
       tap((p) => {
          this.sizePage();
       })
    )
    .subscribe();


  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
