import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';

import { TimerComponent } from './Timer/timer/timer.component';
import {MatButtonModule} from "@angular/material/button";
import { SolveTimePipe } from './Pipes/solve-time.pipe';
import { SolvedDialogComponent } from './Timer/solved-dialog/solved-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { SolvesComponent } from './Solves/solves/solves.component';
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    SolveTimePipe,
    SolvedDialogComponent,
    SolvesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  entryComponents: [SolvedDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
