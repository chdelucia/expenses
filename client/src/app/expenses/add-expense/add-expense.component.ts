import { Component, EventEmitter, Input, Output, OnChanges, OnInit, OnDestroy, } from '@angular/core';
import { Expense, ModelForm } from '../shared/models/user';
import { PersonService } from '../shared/services/person.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.less']
})
export class AddExpenseComponent implements OnInit, OnDestroy {
  @Input() show: boolean;
  @Output() changed = new EventEmitter<Expense>();
  model: ModelForm = new ModelForm();

  private unsubscribe: Subject<void> = new Subject();

  constructor(private person: PersonService) { }


  ngOnInit() {
    console.log(`ngOnInit for`);
  }

  save(expensesForm: Expense) {
    expensesForm.date = expensesForm.date ? new Date(expensesForm.date) : new Date();
    this.person.createExpense(expensesForm)
    .takeUntil(this.unsubscribe)
    .subscribe(
      (expense: Expense) => {
        this.changed.emit(expense);
      }, f => {
      }
    );

  }

  close() {
    this.show = false;
    this.changed.emit(null);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
