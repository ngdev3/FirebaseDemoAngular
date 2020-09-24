import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/car/list/list.component';
import { AddComponent } from './components/car/add/add.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {NgxUiLoaderConfig, NgxUiLoaderModule} from 'ngx-ui-loader';

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AuthService } from "./shared/services/auth.service";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  'bgsColor': '#e45243',
  'bgsOpacity': 0.5,
  'bgsPosition': 'bottom-right',
  'bgsSize': 60,
  'bgsType': 'ball-spin-clockwise',
  'blur': 5,
  'delay': 0,
  'fastFadeOut': true,
  'fgsColor': '#e45243',
  'fgsPosition': 'center-center',
  'fgsSize': 60,
  'fgsType': 'folding-cube',
  'gap': 24,
  'logoPosition': 'center-center',
  'logoSize': 120,
  'logoUrl': '',
  'masterLoaderId': 'master',
  'overlayBorderRadius': '0',
  'overlayColor': 'rgba(40, 40, 40, 0.8)',
  'pbColor': 'red',
  'pbDirection': 'ltr',
  'pbThickness': 3,
  'hasProgressBar': true,
  'text': 'EventKart',
  'textColor': '#FFFFFF',
  'textPosition': 'center-center',
  'maxTime': -1,
  'minTime': 300
}
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    SignInComponent,
    SignUpComponent,
    VerifyEmailComponent
  ],
  imports: [
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ToastrModule.forRoot({
      closeButton: true,
    }),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
