import { CommentsService } from './../../common/services/comments.service';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'src/app/common/models/user.model';
import { UsersService } from 'src/app/common/services/users.service';
import { Comment } from '../../common/models/comment.model'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges, OnDestroy {

  activeUser!: User;
  comments!: Comment[];
  users!: User[];
  commentsSubscription!: Subscription;
  usersSubscription!: Subscription;
  commentsWithChildren: Comment[] = [];
  childrenObj: { [k: string]: any } = {};

  constructor(private usersService: UsersService, private commentsService: CommentsService) {

  }

  ngOnInit(): void {
    this.commentsSubscription = this.commentsService.commentsChildrenObj$.subscribe((res: { [k: string]: Comment[] }) => {
      this.childrenObj = res;
      for (let children in this.childrenObj) {
        this.childrenObj[children].sort((a: Comment, b: Comment) => {
          return (new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1)
        });
      }
      console.log('childrenObj: ', this.childrenObj);

    });

    this.usersSubscription = this.usersService.users$.subscribe((res) => {
      this.users = res;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  userChanged(user: any) {
    this.activeUser = user;
    console.log('in comments component user changed: ', this.activeUser);
  }

  getCommentUser(comment: Comment) {
    return this.users?.find(user => user.id === comment.ownerId);
  }

  nestedMargin(level: any) {
    return level > 1 ? `${level * 2}rem` : '';
  }

  ngOnDestroy(): void {
    this.commentsSubscription.unsubscribe();
  }

  userImgUrl() {
    return `assets/images/users/${this.activeUser?.id}.jpg`;
  }




}
