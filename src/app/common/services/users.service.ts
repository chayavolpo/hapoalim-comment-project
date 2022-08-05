import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users$: Subject<any> = new Subject();

  constructor(private http: HttpClient) {
    this.initUsers();
  }

  initUsers() {
    this.getUsers().subscribe({
      next: response => {
        console.log('users response: ', response);
        this.users$.next(response);
      },
      error: error => console.log('an error ocurred while fetching users:', error)
    })
  }

  getUsers() {
    return this.http.get('assets/data/users.json');
  }
}
