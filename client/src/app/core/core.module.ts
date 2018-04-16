import { AuthService } from './auth/auth.service';
import { LogService } from './logs.service';
import { RouterModule } from '@angular/router';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectivePreloadingStrategy } from './selective-preload-strategy.service';

import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HeaderComponent } from './header/header.component';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AuthGuard } from './auth/auth.guard';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    BreadcrumbComponent,
    HeaderComponent,
  ],
  providers: [
    SelectivePreloadingStrategy,
    LogService,
    AuthGuard,
    AuthService
  ],
  exports: [
    RouterModule,
    BreadcrumbComponent,
    HeaderComponent,
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
