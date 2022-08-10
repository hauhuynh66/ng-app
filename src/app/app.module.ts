import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule} from "./material.module";
import { BasicRoutingModule, BasicRoutingComponents } from './router.module';
import { ExamRoutingModule, ExamRoutingComponents } from './exam.module';
import { ChartModule } from 'angular2-chartjs';
import { DA_Guard } from './guard_da';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    BasicRoutingComponents,
    ExamRoutingComponents
  ],
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ExamRoutingModule,
    BasicRoutingModule,
    FormsModule,
    ChartModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [DA_Guard],
  bootstrap: [AppComponent]
})

export class AppModule { }
