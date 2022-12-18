import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map } from 'rxjs';
import { SharedDataService } from 'shared/services/shared-data-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private shareservice: SharedDataService, private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    
     return  this.shareservice.getData().pipe(map(user => {
         if (user[2]) return true;
         
         this.router.navigate(['/login'])

         return false
      }))
  }
  
}
