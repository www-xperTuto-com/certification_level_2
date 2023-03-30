import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {TeamBasicInfo} from "../models/partial-team.type";

@Injectable()
export class TeamsService {
  readonly apiPath = 'https://free-nba.p.rapidapi.com/teams'

  constructor(private httpClient: HttpClient) {

  }

  getTeams(): Observable<Array<TeamBasicInfo>> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
      'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
    });
    return this.httpClient
      .get<{ data: Array<TeamBasicInfo> }>(this.apiPath, {headers}
      ).pipe(map(response => response?.data))
  }
}
