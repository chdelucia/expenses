import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './core/auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { SelectivePreloadingStrategy } from './core/selective-preload-strategy.service';

const routes: Routes = [
  { path: '', redirectTo: 'expenses', pathMatch: 'full' },
  { path: 'expenses', loadChildren: 'app/expenses/expenses.module#ExpensesModule', data: { preload: false } },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        //enableTracing: true,
        preloadingStrategy: SelectivePreloadingStrategy
      }
    )
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
