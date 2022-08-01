import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignInComponent} from './components/auth/sign-in/sign-in.component';
import {SignUpComponent} from './components/auth/sign-up/sign-up.component';
import {LayoutComponent} from './components/layout/layout.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ToDoListComponent} from './components/layout/to-do-list/to-do-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  CreateUpdateListComponent
} from './components/layout/to-do-list/create-update-list/create-update-list.component';
import {MatDialogModule} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {NgxSpinnerModule} from "ngx-spinner";
import {httpInterceptorProviders} from "./interceptors";
import {ToastrModule} from "ngx-toastr";
import { UpdateItemComponent } from './components/layout/to-do-list/update-item/update-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    LayoutComponent,
    PageNotFoundComponent,
    ToDoListComponent,
    CreateUpdateListComponent,
    UpdateItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      enableHtml: true
    })
  ],
  providers: [DatePipe, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {
}
