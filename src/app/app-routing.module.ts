import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AuthGuardService as AuthGuard } from './auth/services/guards/auth-guard.service';
import { PropertyListComponent } from './properties/views/property-list/property-list.component';
import { PropertySummaryComponent } from './properties/views/property-summary/property-summary.component';
import { TodosPageComponent } from './todos/views/todos-page/todos-page.component';
import { PropertyFormComponent } from './properties/views/property-form/property-form.component';
import { TenantsPageComponent } from './tenants/views/tenants-page/tenants-page.component';
import { TenantOverviewPageComponent } from './tenants/views/tenant-overview-page/tenant-overview-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: 'properties/create',
    canActivate: [AuthGuard],
    component: PropertyFormComponent
  },
  {
    path: 'properties/edit/:propertyId',
    canActivate: [AuthGuard],
    component: PropertyFormComponent
  },
  {
    path: 'properties/:propertyId',
    canActivate: [AuthGuard],
    component: PropertySummaryComponent
  },
  {
    path: 'tenants/:tenantId',
    canActivate: [AuthGuard],
    component: TenantOverviewPageComponent
  },
  {
    path: 'properties',
    canActivate: [AuthGuard],
    component: PropertyListComponent
  },
  {
    path: 'tenants',
    canActivate: [AuthGuard],
    component: TenantsPageComponent
  },
  {
    path: 'todos',
    canActivate: [AuthGuard],
    component: TodosPageComponent
  },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
