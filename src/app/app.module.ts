import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
