import { Component } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Zimmern';

  constructor(
    
   ){}


  ngOnInit(): void {
    
  }

  updateDrawerMode( drawer : MatDrawer){
    drawer.mode = window.innerWidth > 900 ? 'side' : 'over';
  }
}
