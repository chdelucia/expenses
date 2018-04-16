import { LogService } from './../../../core/logs.service';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/observable';
import { catchError, map, tap, shareReplay } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/finally';

import { Expense } from './../models/user';

@Injectable()
export class PersonService {
  baseUrl = 'http://localhost:3000/api/expenses/';

  constructor(private http: HttpClient, private logger: LogService) {
    console.log('creo el servicio');
  }

  getExpenses(): Observable<Expense[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
    };
    return this.http.get<Expense[]>(this.baseUrl, httpOptions)
      .retry(2)
      .pipe(
        tap(res => console.table(res)),
        shareReplay(1),
        catchError(this.handleError<Expense[]>('getExpenses', []))
      )
      .share()
      .finally(() => this.logger.info(this.constructor.name, 'getExpenses', 'llamada exitosa'));
  }


  createExpense(expense: Expense): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
    };
    return this.http.post(this.baseUrl, JSON.stringify(expense), httpOptions)
      .pipe(
        tap(res => console.table(res)),
        catchError(this.handleError<Expense[]>('createExpense', []))
      )
      .finally(() => this.logger.info(this.constructor.name, 'createExpense', 'llamada exitosa'));
  }

  deleteExpense(id: string): Observable<any> {
    return this.http.delete<Expense>(this.baseUrl + id)
      .retry(2)
      .pipe(
        tap(res => console.table(res)),
        catchError(
          this.handleError<Expense[]>('deleteExpense', [])
        )
      )
      .finally(() => this.logger.info(this.constructor.name, 'deleteExpense', 'llamada exitosa'));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      console.log(result);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
