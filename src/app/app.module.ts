import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule, MatDialogRef } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { PropertyFormComponent } from './properties/views/property-form/property-form.component';
import { PropertyListComponent } from './properties/views/property-list/property-list.component';
import { PropertySummaryComponent } from './properties/views/property-summary/property-summary.component';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { TodoCreateComponent } from './todos/todo-create/todo-create.component';
import { TodosPageComponent } from './todos/views/todos-page/todos-page.component';
import { IconsModule } from './icons/icons.module';
import { LoadingAnimationComponent } from './components/assets/loading-animation/loading-animation.component';
import { CheckboxComponent } from './components/forms/checkbox/checkbox.component';
import { UiIconComponent } from './components/assets/ui-icon/ui-icon.component';
import { PropertyCardComponent } from './properties/presentation/property-card/property-card.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { TodoItemComponent } from './todos/todo-item/todo-item.component';
import { TenantsPageComponent } from './tenants/views/tenants-page/tenants-page.component';
import { TenantFormComponent } from './tenants/business/tenant-form/tenant-form.component';
import { TenantListComponent } from './tenants/business/tenant-list/tenant-list.component';
import { TenantOverviewPageComponent } from './tenants/views/tenant-overview-page/tenant-overview-page.component';
import { AvatarIconComponent } from './components/assets/avatar-icon/avatar-icon.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { UiPillComponent } from './components/assets/ui-pill/ui-pill.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SidebarComponent,
    PropertyFormComponent,
    PropertyListComponent,
    PropertySummaryComponent,
    TodoListComponent,
    TodoCreateComponent,
    TodosPageComponent,
    LoadingAnimationComponent,
    CheckboxComponent,
    UiIconComponent,
    PropertyCardComponent,
    TopbarComponent,
    TodoItemComponent,
    TenantsPageComponent,
    TenantFormComponent,
    TenantListComponent,
    TenantOverviewPageComponent,
    AvatarIconComponent,
    ConfirmationModalComponent,
    UiPillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    IconsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ToastrModule.forRoot()
  ],
  entryComponents: [
    TenantFormComponent,
    ConfirmationModalComponent,
    TodoCreateComponent
  ],
  providers: [{ provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule {}
