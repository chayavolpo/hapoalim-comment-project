import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from 'src/app/common/models/comment.model';
import { User } from 'src/app/common/models/user.model';
import { CommentsService } from 'src/app/common/services/comments.service';


@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  @Input() user!: User;
  @Input() isEditComment!: boolean;
  @Input() isAddNewComment!: boolean;
  @Input() isAddCommentForComment!: boolean;
  @Input() comment!: Comment;
  @Output() toggleEditMode: EventEmitter<boolean> = new EventEmitter();
  @Output() toggleAddMode: EventEmitter<boolean> = new EventEmitter();

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
  }

  userImgUrl() {
    return `assets/images/users/${this.user?.id}.jpg`;
  }

  submitComment(commentTxt: string) {
   if(this.isEditComment) {
     this.comment.txt = commentTxt;
     this.comment.createdAt = new Date().toISOString();
     this.commentsService.editComment(this.comment);
     this.toggleEditMode.emit(false);
   } else {
    const newComment: Comment = {
      id: Date.now(), // TODO: get id of last added comment + 1
      ownerId: this.user.id,
      parentCommentId: this.isAddCommentForComment ? this.comment.id : null,
      createdAt: new Date().toISOString(),
      txt: commentTxt
     }
     this.commentsService.addComment(newComment);
     if(this.isAddCommentForComment) {
      this.toggleAddMode.emit(false);
     }
   }
  }

}
