import {Component, Input} from '@angular/core';
import {Team} from "../../../models/team";

@Component({
  selector: 'app-team-card-header',
  templateUrl: './team-card-header.component.html',
  styleUrls: ['./team-card-header.component.scss']
})
export class TeamCardHeaderComponent {

  @Input() team: Team = {};
  constructor() { }
}
