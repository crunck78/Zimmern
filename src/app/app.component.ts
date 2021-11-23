import { Component } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Zimmern';

  constructor(
    public translate: TranslateService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('ro');
  }

  updateDrawerMode(drawer: MatDrawer) {
    drawer.mode = this.getDrawerMode();
  }

  getDrawerMode() {
    return window.innerWidth > 900 ? 'side' : 'over';
  }
}
