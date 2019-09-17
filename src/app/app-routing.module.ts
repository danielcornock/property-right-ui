import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AuthGuardService as AuthGuard } from './auth/services/guards/auth-guard.service';
import { PropertyListComponent } from './views/property-list/property-list.component';
import { PropertySummaryComponent } from './views/property-summary/property-summary.component';
import { TodosPageComponent } from './views/todos-page/todos-page.component';

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
    path: 'properties/:propertyId',
    canActivate: [AuthGuard],
    component: PropertySummaryComponent
  },
  {
    path: 'properties',
    canActivate: [AuthGuard],
    component: PropertyListComponent
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
