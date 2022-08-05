import {Component, Injectable, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable()
export class ForceService {
  getUserWhoHasTheForce(): Observable<string> {
    return of('Lock Skywalker');
  }
}

@Component({
  selector: 'user-force',
  template: `
    <section>
      User: <span>{{user}}</span>
    </section>`,
  encapsulation: ViewEncapsulation.None
})
export class UserForceComponent implements OnInit {
  user = `Han Solo`;

  constructor(private forceService: ForceService) {
  }

  ngOnInit() {
    this.forceService.getUserWhoHasTheForce()
      .subscribe(
        ((user: string) => {
          this.user = user
          console.log('ngOnInit: ', this.user)
        } ),
        (error => this.user = '')
      );
  }
}
