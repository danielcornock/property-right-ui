import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AuthGuardService as AuthGuard } from './auth/services/guards/auth-guard.service';
import { PropertiesViewComponent } from './properties/views/properties-view/properties-view.component';
import { PropertySummaryViewComponent } from './properties/views/property-summary-view/property-summary-view.component';
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
    path: 'properties/:propertyId/edit',
    canActivate: [AuthGuard],
    component: PropertyFormComponent
  },
  {
    path: 'properties/:propertyId',
    canActivate: [AuthGuard],
    component: PropertySummaryViewComponent
  },
  {
    path: 'tenants/:tenantId',
    canActivate: [AuthGuard],
    component: TenantOverviewPageComponent
  },
  {
    path: 'properties',
    canActivate: [AuthGuard],
    component: PropertiesViewComponent
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
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
