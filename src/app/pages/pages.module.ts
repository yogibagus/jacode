import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AppsComponent } from './apps/apps.component';
import { ChartsModule } from 'ng2-charts';
import { UsersComponent } from './users/users.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select'
import { DataTablesModule } from 'angular-datatables';
import { RolesComponent } from './roles/roles.component';
import { MenuComponent } from './menu/menu.component';
import { CustomerComponent } from './customer/customer.component';
import { PromoComponent } from './promo/promo.component';
import { DiskonComponent } from './diskon/diskon.component';
import { ProfileComponent } from './profile/profile.component'
import { JwtInterceptor } from '../core/interceptors/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrderComponent } from './order/order.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 0.3
};

@NgModule({
  declarations: [DashboardComponent, AppsComponent, UsersComponent, RolesComponent, MenuComponent, CustomerComponent, PromoComponent, DiskonComponent, ProfileComponent, OrderComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    PerfectScrollbarModule,
    ChartsModule,
    LayoutsModule,
    FormsModule,
    NgSelectModule,
    DataTablesModule,
    ReactiveFormsModule 
  ],
  providers: [
   
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
  ]
})
export class PagesModule { }
