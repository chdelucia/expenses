import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';

interface IBreadcrumb {
  label: string;
  params: Params;
  url: string;
  urlTranslate: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent implements OnInit {
  subscription$: Subject<null> = new Subject;
  public breadcrumbInit: any[];

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location) {
    this.breadcrumbInit = [];
  }

  ngOnInit() {
    this.router.events
      .takeUntil(this.subscription$)
      .subscribe((val) => {
        if (val instanceof NavigationEnd) {
          this.breadcrumbInit = [];
          const ROUTE_DATA_BREADCRUMB: string = 'breadcrumb';
          const varLocation = this.router.url.charAt(0).replace('/', '') +
            this.router.url.slice(1);
          if (varLocation !== '') {
            const locationNew = varLocation.split('/');
            let urlBreadcrumb: string = '';
            locationNew.forEach((element) => {
              urlBreadcrumb += '/' + element;
              const breadcrumb = {
                label: this.createUrl(element),
                url: urlBreadcrumb,
                translateLabel: element.toUpperCase()
              };
              this.breadcrumbInit.push(breadcrumb);
            });
          }
        }
      });
  }


  createUrl(value: any): string {
    let retValue;
    if (value.path) {
      retValue = value.path.charAt(0).toUpperCase() +
        value.path.substring(1, 10) + ' ' +
        value.path.charAt(10).toUpperCase() + value.path.slice(11);
    } else {
      retValue = value.charAt(0).toUpperCase() +
        value.substring(1, 10) + ' ' +
        value.charAt(10).toUpperCase() + value.slice(11);
    }
    return retValue;
  }

  ngOnDestroy(): void {
    this.subscription$.next(null);
  }
}
