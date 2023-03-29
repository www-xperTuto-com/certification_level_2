import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TeamsRoutingModule} from "./teams-routing.module";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TeamsRoutingModule
  ]
})
export class TeamsModule {}
