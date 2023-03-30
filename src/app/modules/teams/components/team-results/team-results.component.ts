import {ActivatedRoute, Params, Router} from "@angular/router";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeamsService} from "../../services/teams-service";
import {Team} from "../../models/team";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-team-results',
  templateUrl: './team-results.component.html',
  styleUrls: ['./team-results.component.scss']
})
export class TeamResultsComponent implements OnInit, OnDestroy {

  team: Team = {};
  subscription!: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private teamsService: TeamsService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.getTeamById(params['teamCode'])
    });
  }

  /**
   * get the team object by ID
   *
   *@param {string} id  the team id that will be used in the API
   *@return {void}
   */
  getTeamById(id: string): void {
    this.subscription = this.teamsService.getTeamWithResults(id)
      .subscribe((teamsWithResults: Team) => {
        this.team = teamsWithResults;
      })
  }

  /**
   * navigate to the home page
   *
   *@return {void}
   */
  navigateToTeamsPage(): void {
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
