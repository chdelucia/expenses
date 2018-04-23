import { FormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../expenses/shared/services/expense.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [ ],
  providers: [ExpenseService],
  exports: [ 
    CommonModule, 
    FormsModule,
  ],

})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: SharedModule,
        providers: []
    };
 }
}
