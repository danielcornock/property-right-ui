import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { PropertyFormComponent } from './views/property-form/property-form.component';
import { PropertyListComponent } from './views/property-list/property-list.component';
import { PropertySummaryComponent } from './views/property-summary/property-summary.component';
import { TodoListComponent } from './business/todos/todo-list/todo-list.component';
import { TodoCreateComponent } from './business/todos/todo-create/todo-create.component';
import { TodosPageComponent } from './views/todos-page/todos-page.component';
import { IconsModule } from './icons/icons.module';
import { LoadingAnimationComponent } from './presentation-components/loading-animation/loading-animation.component';
import { CheckboxComponent } from './presentation-components/forms/checkbox/checkbox.component';
import { UiIconComponent } from './presentation-components/assets/ui-icon/ui-icon.component';

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
    UiIconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    IconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
