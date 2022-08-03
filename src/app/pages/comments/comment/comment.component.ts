import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/common/models/user.model';
import { Comment } from '../../../common/models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment!: Comment;
  @Input() activeUser!: User;

  constructor() {
    this.comment = {
      id: 1,
      parentCommentId: null,
      ownerId: 1,
      txt: 'hello this is a comment',
      createdAt: '2018-11-01T09:00:00.000Z',
      deletedAt: null
    }
  }

  ngOnInit(): void {
  }

  userImgUrl() {
    return `assets/images/users/${this.comment.ownerId}.jpg`
  }

}
