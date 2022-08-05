import { UsersService } from './../../../../common/services/users.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/common/models/user.model';

@Component({
  selector: 'app-choose-active-user',
  templateUrl: './choose-active-user.component.html',
  styleUrls: ['./choose-active-user.component.scss']
})
export class ChooseActiveUserComponent implements OnInit {

  @Output() userChanged: EventEmitter<any> =  new EventEmitter<any>();
  users:any = [];
  selectedUser!: User;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.users$.subscribe( users => {
      this.users = users;
      this.selectedUser = users[0];
      this.userChanged.emit(this.selectedUser);
      console.log('users in component: ', this.users);
    })
  }

  selectionChanged() {
    console.log('user changed: ', this.selectedUser)
    this.userChanged.emit(this.selectedUser);
  }

}
