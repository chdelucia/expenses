import { FormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from '../expenses/shared/services/person.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [ ],
  providers: [PersonService],
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
