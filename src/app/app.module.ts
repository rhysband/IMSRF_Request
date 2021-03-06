import { NgModule } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AlertService, AuthGuardService, AuthService, ValidationService } from '@shared';
import { firebaseKeys } from './firebase.config';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';

import { ToasterComponent } from './shared/toaster/toaster.component';
import { ControlMessagesComponent } from './shared/control-messages/control-messages.component';
import { LandingComponent , NewRequesterComponent} from './pages/landing/landing.component';
import { MainComponent, NewRequestComponent, ViewRequestComponent, ViewDispatchComponent, FeedbackComponent } from './pages/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    ContentAnimateDirective,
    ToasterComponent,
    ControlMessagesComponent,
    LandingComponent,
    NewRequestComponent,
    ViewRequestComponent,
    MainComponent,
    NewRequesterComponent,
    NavbarComponent,
    FooterComponent,
    ViewDispatchComponent,
    FeedbackComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseKeys),
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    MatFormFieldModule,
    MaterialFileInputModule

  ],
  providers: [
    AlertService,
    AuthGuardService,
    AuthService,
    ValidationService,
    AngularFireStorage,
    BrowserAnimationsModule,
    BrowserModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
