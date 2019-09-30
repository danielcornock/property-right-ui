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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TodoItemComponent } from './todos/todo-item/todo-item.component';

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
    TodoItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    IconsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
