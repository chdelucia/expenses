import { Component, EventEmitter, Input, Output, OnChanges, OnInit, OnDestroy, } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Expense, ModelForm } from '../shared/models/user';
import { ExpenseService } from '../shared/services/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.less']
})
export class AddExpenseComponent implements OnInit, OnDestroy {

  @Input() show: boolean; // Show the form
  @Output() changed = new EventEmitter<Expense>(); // Send the new expense
  model: ModelForm = new ModelForm(); 

  /** while exist keep sucription alive */
  private unsubscribe: Subject<void> = new Subject();

  /**
   * 
   * @param {ExpenseService} expenseService 
   */
  constructor(private expenseService: ExpenseService) { }


  ngOnInit() {}

  /**
   * Create an Expense and emit it
   * @param {Expense} expensesForm 
   */
  save(expensesForm: Expense) {
    expensesForm.date = expensesForm.date ? new Date(expensesForm.date) : new Date();
    this.expenseService.createExpense(expensesForm)
    .takeUntil(this.unsubscribe)
    .subscribe(
      (expense: Expense) => {
        this.changed.emit(expense);
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
   * Close the modal
   */
  close():void {
    this.show = false;
    this.changed.emit(null);
  }

  /** 
   * Cancel subscriptions
  */
  ngOnDestroy():void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
