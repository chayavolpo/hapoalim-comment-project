import { CommentsService } from './../../common/services/comments.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'src/app/common/models/user.model';
import { UsersService } from 'src/app/common/services/users.service';
import { Comment } from '../../common/models/comment.model'

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges {

  activeUser!: User;
  usersComments!: Comment[]

  constructor(private usersService: UsersService, private commentsService: CommentsService) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['activeUser']) {
      this.getUsersComments();
    }
  }

  userChanged(user: any) {
    this.activeUser = user;
    console.log('in comments component user changed: ', this.activeUser);
  }

  getUsersComments() {
    this.usersComments = this.commentsService.getCommentsByUserId(this.activeUser?.id);
  }

}
