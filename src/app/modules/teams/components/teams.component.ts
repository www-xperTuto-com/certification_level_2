import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeamsService} from "../services/teams-service";
import {Result} from "../models/result";
import {Team} from "../models/team";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit, OnDestroy {

  teams: Array<Team> = [];
  selectedTeams: Array<Team> = [];
  subscription!: Subscription;

  constructor(private teamsService: TeamsService) {
  }

  ngOnInit(): void {
    this.teamsService.checkTrackedFromStorage();
    this.selectedTeams = this.teamsService.trackedTeams;
  }

  /**
   * track the team , by getting the results ,
   * displaying it in the home page and saving in the storage
   *
   *@param {Team} team  the team that will be used to get the details
   *@return {void}
   */
  trackTeam(team: Team): void {
    if (team?.id && !this.teamsService.isAlreadyTrackedTeam(team)) {
      this.subscription = this.teamsService.getTeamResults(team.id)
        .subscribe((results: Array<Result>) => {
          team.results = results;
          this.teamsService.trackTeam(team);
        })
    }
  }

  ngOnDestroy(): void {
    //todo: even if the API call returns a single response and completes,
    // it is still considered a best practice to unsubscribe from the Observable to prevent memory leaks

    this.subscription?.unsubscribe();
  }

}
