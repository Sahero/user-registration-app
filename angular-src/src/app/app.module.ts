import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';

import{RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import {ValidateService} from './services/validate.service';
import {ToastyModule} from 'ng2-toasty';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';

/* For google maps autocomplete*/
import {AgmCoreModule} from 'angular2-google-maps/core'; 
//import {AgmCoreModule} from '@agm/core'; 

/* For recaptcha*/
import {RecaptchaModule} from 'ng2-recaptcha';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
/*Modal*/
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
/*Pagination */
import {NgxPaginationModule} from 'ngx-pagination';

const appRoutes: Routes = [
  {path:'home',  component: HomeComponent, canActivate:[AuthGuard]},
  {path:'register',  component: RegisterComponent},
  {path:'',  component: LoginComponent},
  {path:'login',  component: LoginComponent},
  {path:'dashboard',  component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile',  component: ProfileComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ToastyModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyBkCp6V_l9OAD9d9JpCilthH45iegInf9k',//'AIzaSyDAt8osXcV3cdpV-vaJlNLc9IvERjLxA30',// 'AIzaSyCj3EHHwE9zd5q11vyRM99o0v7LDy4gTVc',
      libraries: ['places']

    }),
    RecaptchaModule.forRoot(),
    NgxMyDatePickerModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    NgxPaginationModule        
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
