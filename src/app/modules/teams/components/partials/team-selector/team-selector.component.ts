import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {TeamsService} from "../../../services/teams-service";
import {Team} from "../../../models/team";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-team-selector',
  templateUrl: './team-selector.component.html',
  styleUrls: ['./team-selector.component.scss']
})
export class TeamSelectorComponent implements OnInit, OnDestroy {
  teams: Array<Team> = [];
  selectedOption: Team = {};
  subscription!: Subscription;
  @Output() selectedTeamEmitter: EventEmitter<Team> = new EventEmitter<Team>();
  constructor(private teamsService: TeamsService) {
  }

  ngOnInit(): void {
    this.getTeamList();
  }

  /**
   * set the selected Team when we return to the home page
   * only if we have one tracked team
   *
   * @return void
   */
  setSelectedTeam(): void {
    if (this.teamsService.trackedTeams.length == 1) {
      // @ts-ignore
      this.selectedOption = this.teams.find((team: Team) => team.id === this.teamsService.trackedTeams[0].id);
    }
  }

  /**
   * check if the team is already tracked to disable the option from the select options
   *
   *@param {Team} team the team that will be checked
   *@return {boolean} if true we disable the option , we enable otherwise
   */
  isTrackedTeam(team: Team): boolean {
    return this.teamsService.isAlreadyTrackedTeam(team);
  }

  /**
   * get the list of teams to populate the option list
   *
   *@return {void}
   */
  getTeamList(): void {
    this.subscription = this.teamsService.getTeams()
      .subscribe((teams: Array<Team>) => {
        this.teams = teams;
        this.setSelectedTeam();
      })
  }

  /**
   * send the selected team to the parent using the event emitter
   * the team will be tracked and displayed in the home page
   *
   *@return {void}
   */
  trackTeam(): void {
    this.selectedTeamEmitter.emit(this.selectedOption)
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
