import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import {
  MatDialogModule,
  MatDialogRef,
  MatNativeDateModule
} from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { PropertyFormComponent } from './properties/views/property-form/property-form.component';
import { PropertiesViewComponent } from './properties/views/properties-view/properties-view.component';
import { PropertySummaryViewComponent } from './properties/views/property-summary-view/property-summary-view.component';
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
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { TenantCardComponent } from './tenants/presentation/tenant-card/tenant-card.component';
import { SafeUrlPipe } from './core/api/safe-url/safe-url.pipe';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PropertiesListComponent } from './properties/presentation/properties-list/properties-list.component';
import { PaymentListComponent } from './payments/presentation/payment-list/payment-list.component';
import { PaymentCreateComponent } from './payments/business/payment-create/payment-create.component';
import { InputDateComponent } from './components/forms/input-date/input-date.component';
import { FormInputComponent } from './components/forms/form-input/form-input.component';
import { InputTextComponent } from './components/forms/input-text/input-text.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SidebarComponent,
    PropertyFormComponent,
    PropertiesViewComponent,
    PropertySummaryViewComponent,
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
    UiPillComponent,
    ContextMenuComponent,
    TenantCardComponent,
    SafeUrlPipe,
    SearchBarComponent,
    PropertiesListComponent,
    PaymentListComponent,
    PaymentCreateComponent,
    InputDateComponent,
    FormInputComponent,
    InputTextComponent
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
    MatMenuModule,
    GooglePlaceModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot({
      timeOut: 40000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  entryComponents: [
    TenantFormComponent,
    ConfirmationModalComponent,
    TodoCreateComponent,
    PaymentCreateComponent
  ],
  providers: [{ provide: MatDialogRef, useValue: {} }, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
