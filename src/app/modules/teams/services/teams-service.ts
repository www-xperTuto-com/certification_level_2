import {TEAM_results, TEAMS_LIST} from "../../../config/teams.const";
import {combineLatest, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Config} from "../../../config/config";
import {Injectable} from "@angular/core";
import {Result} from "../models/result";
import {Team} from "../models/team";

@Injectable()
export class TeamsService {

  trackedTeams: Array<Team> = [];

  constructor(private httpClient: HttpClient) {
  }

  /**
   *track the team by adding it to the global object and to the storage
   *
   *@param  {Team} team the team that will be tracked
   *@return {void}
   */
  trackTeam(team: Team): void {
    this.trackedTeams.push(team);
    this.updateStorage();
  }

  /**
   *unTrack the team by removing it from the global object and from the storage
   *
   *@param  {Team} team the team that will be unTacked
   *@return {void}
   */
  unTrackTeam(team: Team): void {
    let teamIndex = this.trackedTeams.findIndex((item: Team) => item.id === team.id);
    if (teamIndex !== -1) {
      this.trackedTeams.splice(teamIndex, 1);
      this.updateStorage();
    }
  }

  /**
   *check if the team is already tracked or not
   *
   *@param  {Team} team the team that will be checked
   *@return {boolean} if true then it is tracked , not tracked otherwise
   */
  isAlreadyTrackedTeam(team: Team): boolean {
    return this.trackedTeams.findIndex((item: Team) => item.id === team.id) !== -1;
  }

  /**
   *call API to get all teams , used to populate select options
   *
   *@return {Observable<Array<Team>>} an observable getting all the teams
   */
  getTeams(): Observable<Array<Team>> {
    return this.httpClient
      .get<{ data: Array<Team> }>(`${Config.apiEndpoint}${TEAMS_LIST}`)
      .pipe(map(response => response?.data))
  }

  /**
   *call API to get all results by team
   *
   *@param {string} teamId the team that will be used to get the related results
   *@return {Observable<Array<Result>>} an observable getting all the results by team
   */
  getTeamResults(teamId: string): Observable<Array<Result>> {
    const dateQuery: string = this.getDateParams();
    const apiParams: string = TEAM_results
      .replace('{dates}', dateQuery)
      .replace('{teamId}', teamId);

    return this.httpClient
      .get<{ data: Array<Result> }>(`${Config.apiEndpoint}${apiParams}`)
      .pipe(map(response => response?.data))
  }

  /**
   *use the existing api call by adding some conditions to get a specific team object
   *
   *@param {string} teamId the team id that will be used to apply the filter
   *@return {Observable<Team>} an observable getting the team object
   */
  getTeamById(teamId: string): Observable<Team> {
    return this.getTeams()
      .pipe(
        map(teams => teams.filter((team: Team) => team.id == teamId)),
        map(filteredTeams => filteredTeams[0]));
  }

  /**
   *combine the two observables to generate a team object including a result property
   *
   *@param {string} teamId the team id that will be used to call the two api
   *@return {Observable<Team>} an observable getting the team object
   */
  getTeamWithResults(teamId: string): Observable<Team> {
    const team$: Observable<Team> = this.getTeamById(teamId);
    const results$: Observable<Array<Result>> = this.getTeamResults(teamId);

    return combineLatest([team$, results$]).pipe(
      map(([team, results]) => {
        team = {...team, results: results};
        return team;
      })
    );
  }

  /**
   *get the last 12 days and generate the api query
   *
   *@return {string} the query that contains the 12 last days
   */
  getDateParams(): string {
    const today: Date = new Date();
    let datesQueryString: string = '';

    for (let i = 0; i < 12; i++) {
      const date: Date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      const formattedDate: string = date.toISOString().substring(0, 10);
      datesQueryString += "&dates[]=" + formattedDate;
    }

    return datesQueryString;
  }

  /**
   *update the global object using the storage
   *used to get the tracked teams when switching between routes
   *
   *@return {void}
   */
  checkTrackedFromStorage(): void {
    // @ts-ignore
    const trackedTeams: string = localStorage.getItem('trackedTeams');
    if (!!trackedTeams) {
      this.trackedTeams = JSON.parse(trackedTeams);
    }
  }

  /**
   *update the storage when we track a new team
   * used to get the tracked teams when switching between routes
   *
   *@return {void}
   */
  updateStorage(): void {
    localStorage.setItem('trackedTeams', JSON.stringify(this.trackedTeams));
  }
}
