import { Component, OnInit } from '@angular/core';

class MenuItem {
  constructor(caption: string, link: any) { }
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  menuItems: MenuItem[];
  visible = false;
  constructor() { }

  ngOnInit() {
    this.menuItems = [
      { caption: 'Home', link: ['/expenses'] },
    ];
  }


}
