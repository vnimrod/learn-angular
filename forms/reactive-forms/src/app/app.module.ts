import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AssignmentComponent } from './assignment/assignment.component';

@NgModule({
  declarations: [AppComponent, AssignmentComponent],
  // need to import ReactiveFormsModule
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
