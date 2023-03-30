import { TeamCardHeaderComponent } from './components/partials/team-card-header/team-card-header.component';
import { TeamSelectorComponent } from './components/partials/team-selector/team-selector.component';
import { TeamCardComponent } from './components/partials/team-card/team-card.component';
import {TeamResultsComponent} from "./components/team-results/team-results.component";
import {RapidApiInterceptor} from "../../core/intercptors/rapid-api.interceptor";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TeamsComponent} from "./components/teams.component";
import {TeamsRoutingModule} from "./teams-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {TeamsService} from "./services/teams-service";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

@NgModule({
  declarations: [
    TeamsComponent,
    TeamResultsComponent,
    TeamSelectorComponent,
    TeamCardComponent,
    TeamCardHeaderComponent
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
    MatIconModule,
    MatProgressSpinnerModule
  ],
  providers: [TeamsService,
    { provide: HTTP_INTERCEPTORS, useClass: RapidApiInterceptor, multi:true }]
})
export class TeamsModule {}
