import {TeamsService} from "../../../services/teams-service";
import {Component, Input} from '@angular/core';
import {Result} from "../../../models/result";
import {Team} from "../../../models/team";
import {Router} from "@angular/router";

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent {

  @Input() team: Team = {};

  constructor(private teamsService: TeamsService, private router: Router) {
  }

  /**
   *unTrack the team by removing it from home page and from the storage
   *
   *@return {void}
   */
  unTrackTeam(): void {
    this.teamsService.unTrackTeam(this.team);
  }

  /**
   * check if the team is winning or not to use the appropriate label and style
   *
   *@param {Result} result used to check if the team is winning or not
   *@return {boolean} if true the team is winning ,loosing otherwise
   */
  isWinning(result: Result): boolean {
    const isTeamPlayingHome = result.home_team.id == this.team.id;

    if(isTeamPlayingHome) {
      return  result.home_team_score > result.visitor_team_score;
    } else {
      return  result.visitor_team_score > result.home_team_score;
    }
  }

  /** navigate to the results pages
   *
   *@return {void}
   */
  navigateToResultsPage(): void {
    this.router.navigate(['/results/' + this.team.id]);
  }

  /**
   * we get the average scored and conceded points of the current team
   *
   *@return { avgScoredPts: number, avgConcedePts: number } returning the average scored and conceded points
   */
  get teamScores(): { avgScoredPts: number, avgConcedePts: number } {

    let scoredPts: number = 0;
    let concedePts: number = 0;

    if (this.team?.results?.length == 0) {
      return {
        avgScoredPts: scoredPts,
        avgConcedePts: concedePts
      }
    }

    this.team.results?.forEach((result: Result) => {
      if (result.home_team?.id == this.team.id) {
        scoredPts += result.home_team_score;
        concedePts += result.visitor_team_score;
      } else {
        scoredPts += result.visitor_team_score;
        concedePts += result.home_team_score;
      }
    })
    // @ts-ignore
    const averageScoredPts: number = Math.floor(scoredPts / this.team.results.length);
    // @ts-ignore
    const averageConcedePts: number = Math.floor(concedePts / this.team.results.length);

    return {
      avgScoredPts: averageScoredPts,
      avgConcedePts: averageConcedePts
    }
  }

}
