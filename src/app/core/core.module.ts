import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';

import { DropDownComponent } from './components/drop-down/drop-down.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    NavbarComponent,
    DropDownComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    SharedModule,
    MatIconModule,
    MatBadgeModule,
    RouterModule.forChild([])
  ],
  exports: [
    NavbarComponent,
  ]
})
export class CoreModule { }
