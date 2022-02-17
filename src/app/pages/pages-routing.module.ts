import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { AppsComponent } from './apps/apps.component';
import { CustomerComponent } from './customer/customer.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DiskonComponent } from './diskon/diskon.component';
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';
import { ProfileComponent } from './profile/profile.component';
import { PromoComponent } from './promo/promo.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'apps', component: AppsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'promo', component: PromoComponent },
  { path: 'diskon', component: DiskonComponent },
  { path: 'profile', component: ProfileComponent },

  // kitchen
  { path: 'order', component: OrderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
