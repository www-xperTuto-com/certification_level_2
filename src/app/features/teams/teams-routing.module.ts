import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TeamsComponent} from "./components/teams.component";
import {TeamDetailComponent} from "./components/team-detail/team-detail.component";


const teamsRoutes: Routes = [
  {
    path: '',
    component: TeamsComponent
  },

  {
    path: 'details/:id',
    component: TeamDetailComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(teamsRoutes)],
  exports: [RouterModule],
})
export class TeamsRoutingModule {
}
