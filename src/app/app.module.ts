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
    ReactiveFormsModule
  ],
  providers: [DA_Guard],
  bootstrap: [AppComponent]
})

export class AppModule { }
