import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Result} from "../../modules/teams/models/result";
import {Team} from "../../modules/teams/models/team";
import {Config} from "../../config/config";
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class RapidApiInterceptor implements HttpInterceptor {
  constructor() {
  }


  //todo : In our case we have only two API so i tried to put the types
  //  but in normal cases , we put 'any' as type , because we certainly have a huge number of APIs in our application
  //  if there is a way to prevent the 'any' type in the interceptors, i'll be glad to discuss that
  intercept(req: HttpRequest<{ data: Array<Team> }|{ data: Array<Result> }>, next: HttpHandler):
    Observable<HttpEvent<{ data: Array<Team> }|{ data: Array<Result> }>> {

    req = req.clone({
      setHeaders: {
        'X-RapidAPI-Key': Config.apiKey,
        'X-RapidAPI-Host': Config.apiHost,
      },
    });

    return next.handle(req);
  }
}
