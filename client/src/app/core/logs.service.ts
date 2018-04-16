import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Log, Level } from 'ng2-logger';

@Injectable()
export class LogService {
  log = Log.create('');
  constructor( private http: HttpClient ) {}

  info(componentName: string, functionName: string, message: any, color?: string) {
    this.log['name'] = componentName;
    if (color) {
      this.log.color = color;
    }
    this.log.i(functionName, message);
  }
  error(componentName: string, functionName: string, message: any) {
    this.log['name'] = componentName;
    this.log.color = 'red';
    this.log.er(functionName, message);
  }

  handleError(e: any): Observable<any> {
    return Observable.throw(e);
  }

}
