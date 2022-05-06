import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule} from "./material.module";
import { BasicRoutingModule, BasicRoutingComponents } from './routes/basic';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ChartModule } from 'angular2-chartjs';
import { MiscComponent } from './components/misc/misc.component';
import { CreatenoteComponent } from './components/dialog/createnote/createnote.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicRoutingComponents,
    PagenotfoundComponent,
    MiscComponent,
    CreatenoteComponent
  ],
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    BasicRoutingModule, 
    FormsModule,
    ChartModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
