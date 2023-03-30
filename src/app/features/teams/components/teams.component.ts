import {Component, OnInit} from '@angular/core';
import {TeamsService} from "../services/teams-service";
import {TeamBasicInfo} from "../models/partial-team.type";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  teams: Array<TeamBasicInfo> = [];
  selectedOption: string = '';

  constructor(private teamsService: TeamsService) {

  }

  ngOnInit(): void {
    this.getTeamList();
  }

  getTeamList(): void {
    this.teamsService.getTeams()
      .subscribe((teams: Array<TeamBasicInfo>) => {
        console.log(teams);
        this.teams = teams;
      })
  }

  showDetails(): void {
  console.log(this.selectedOption);
  }
}
