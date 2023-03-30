import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TeamsComponent} from "./components/teams.component";
import {TeamResultsComponent} from "./components/team-results/team-results.component";


const teamsRoutes: Routes = [
  {
    path: '',
    component: TeamsComponent
  },

  {
    path: 'results/:teamCode',
    component: TeamResultsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(teamsRoutes)],
  exports: [RouterModule],
})
export class TeamsRoutingModule {
}
