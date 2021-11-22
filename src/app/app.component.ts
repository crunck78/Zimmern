import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'Zimmern';

  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(

  ) { }

  updateDrawerMode(drawer : MatDrawer) {
    drawer.mode = this.getDrawerMode();
  }

  getDrawerMode(){
    return window.innerWidth > 900 ? 'side' : 'over';
  }
}
