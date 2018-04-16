import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { ListExpensesComponent } from './list-expenses/list-expenses.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';


@NgModule({
  imports: [
    ExpensesRoutingModule,
    SharedModule.forRoot(),
  ],
  declarations: [
    ListExpensesComponent,
    AddExpenseComponent
  ],
  providers: [ ]
})
export class ExpensesModule { }
