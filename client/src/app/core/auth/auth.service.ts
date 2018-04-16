import { LogService } from './../logs.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private isLogged = false;
  private userName;
  constructor( private logger: LogService) {}

  login(form: any) {
    this.userName = form.name;
    this.isLogged = true;
    this.logger.info('PersonService', 'getUsers', 'Logged as:' + this.userName);
    return this.isLogged;
  }

  logout() {
    this.isLogged = false;
  }
  getUserName() {
    return this.userName;
  }
  getStatus() {
    this.logger.info('PersonService', 'getStatus', 'is logged?:' + this.isLogged);
    return this.isLogged;
  }


}
