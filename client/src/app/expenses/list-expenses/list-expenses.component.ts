
// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

// Rxjs
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/takeUntil';

// Models and Services
import { ExpenseService } from '../shared/services/expense.service';
import { Expense } from '../shared/models/user';


@Component({
  selector: 'app-list-expenses',
  templateUrl: 'list-expenses.component.html',
  styleUrls: ['list-expenses.component.less'],
})

export class ListExpensesComponent implements OnInit, OnDestroy {
  expenses: Expense[];
  openCreateModal: boolean;
  alertMessage: string;
  private unsubscribe: Subject<void> = new Subject();

  /**
   *
   * @param {ExpenseService} expenseService
   */
  constructor(private expenseService: ExpenseService) { }


  ngOnInit() {
    this.getExpenses();
  }


  /**
   * get the list of expenses
   */
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
            this.alertMessage = 'An error occurred:' + err.error.message;
          } else {
            // The backend returned an unsuccessful response code.
            this.alertMessage = `Backend returned code ${err.status}, body was: ${err.message}`;
          }
        });
  }

  /**
   * Dismiss alert
   */
  onCloseAlert() {
    this.alertMessage = '';
  }

  /**
   * Open the modal to create a new expense
   */
  openModal(): void {
    this.openCreateModal = true;
  }

  /**
   * Update the list of expenses
   * @param {Expense} expense
   */
  onChanged(expense: Expense): void {
    if (expense) {
      this.expenses.push(expense);
    }
    this.openCreateModal = false;
  }

  /**
   * delete expense and update the list.
   * @param {strin} id
   */
  onDelete(id: string): void {
    this.expenseService.deleteExpense(id).subscribe(
      (result: any) => {
        this.expenses = this.expenses.filter(expense => {
          return expense.id !== id;
        });
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


  /**
   * Cancel subscriptions
  */
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
