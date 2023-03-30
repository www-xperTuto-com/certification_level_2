import {Team} from "./team";

export class Result {
  "id" : number;
  "date" ?: string;
  "period" ?: number;
  "postseason" ?: boolean;
  "season" ?: number;
  "status" ?: string;
  "time" ?: string;
  "home_team_score" : number;
  "visitor_team_score" : number;
  "home_team" : Team;
  "visitor_team" : Team;



}
