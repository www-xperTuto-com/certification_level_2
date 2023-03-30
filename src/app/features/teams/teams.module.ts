import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TeamsRoutingModule} from "./teams-routing.module";
import {TeamsComponent} from "./components/teams.component";
import {TeamDetailComponent} from "./components/team-detail/team-detail.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatOptionModule} from "@angular/material/core";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {TeamsService} from "./services/teams-service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    TeamsComponent,
    TeamDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TeamsRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
    MatCardModule,
  ],
  providers: [TeamsService]
})
export class TeamsModule {}
