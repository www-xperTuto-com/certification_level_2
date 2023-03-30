import {Result} from "./result";

export class Team {
  'id'?: string;
  'name'?: string;
  'full_name'?: string;
  'division'?: string;
  'abbreviation' ?: string;
  'logo' ?: string;
  'conference' ?: string;
  'city' ?: string;
  'results' ?: Array<Result>;

}
