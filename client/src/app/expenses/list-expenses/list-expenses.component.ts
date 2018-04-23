import { ExpenseService } from '../shared/services/expense.service';
import { Expense } from '../shared/models/user';

import { Component, OnInit, OnDestroy, ViewEncapsulation, OnChanges } from '@angular/core';
import 'rxjs/add/operator/retry';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { AfterContentChecked, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'Rxjs';


@Component({
  selector: 'app-list-expenses',
  templateUrl: 'list-expenses.component.html',
  styleUrls: ['list-expenses.component.less'],
  encapsulation: ViewEncapsulation.None
})

export class ListExpensesComponent implements OnInit, OnDestroy {
  expenses: Expense[];
  openCreateModal: boolean;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private expenseService: ExpenseService) { }


  ngOnInit() {
    this.getExpenses();
  }

  getExpenses(): void {
    this.expenseService.getExpenses()
      .takeUntil(this.unsubscribe)
      .subscribe(
      (data: Expense[]) => {
        this.expenses = data;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          console.log(`Backend returned code ${err.status}, body was: ${err.message}`);
        }
      });
  }

  openModal(): void {
    this.openCreateModal = true;
  }

  changed(expense: Expense): void {
    if (expense){
      this.expenses.push(expense);
    }
    this.openCreateModal = false;
  }

  delete(id: string): void {
    this.expenseService.deleteExpense(id).subscribe(
      (result: any) => {
        this.expenses = this.expenses.filter( expense => {
          return expense.id !== id;
        })
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          console.log(`Backend returned code ${err.status}, body was: ${err.message}`);
        }
      });
  }


  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
