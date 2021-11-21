import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService implements OnInit {

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  to(url: string){
    return this._router.navigateByUrl(url);
  }
}
