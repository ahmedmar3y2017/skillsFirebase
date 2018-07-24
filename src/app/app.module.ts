import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AddskillComponent } from './components/addskill/addskill.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MyskillComponent } from './components/myskill/myskill.component';
import { SkillsComponent } from './components/skills/skills.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CountryService } from './services/country.service';
import { FirebaseserviceService } from './services/firebaseservice.service';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { UpdateSkillComponent } from './components/update-skill/update-skill.component';
import { DetailsComponent } from './components/details/details.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';




const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'addskill', component: AddskillComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'myskill', component: MyskillComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'update-skill/:id', component: UpdateSkillComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'userprofile', component: UserprofileComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AddskillComponent,
    LoginComponent,
    RegisterComponent,
    MyskillComponent,
    SkillsComponent,
    UpdateSkillComponent,
    DetailsComponent,
    UserprofileComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule, AngularFireStorageModule,
    AngularFireDatabaseModule, HttpModule, ReactiveFormsModule, FlashMessagesModule.forRoot(),
  ],
  providers: [FirebaseserviceService, CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
