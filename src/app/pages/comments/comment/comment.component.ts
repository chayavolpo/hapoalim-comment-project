import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'src/app/common/models/user.model';
import { CommentsService } from 'src/app/common/services/comments.service';
import { Comment } from '../../../common/models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnChanges {

  @Input() comment!: Comment;
  @Input() activeUser!: User;
  @Input() commentUser!: any;
  _isEditMode: boolean = false;
  _isAddMode: boolean = false;
  commentText: string = '';

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  get isAddMode() {
    return this._isAddMode;
  }

  set isAddMode(value: boolean) {
    this._isAddMode = value;
    if(this.isAddMode) {
      this.commentText = '';
    }
  }

  get isEditMode() {
    return this._isEditMode;
  }

  set isEditMode(value: boolean) {
    this._isEditMode = value;
    if(this.isEditMode) {
      this.commentText = this.comment.txt;;
    } else {
      this.commentText = '';
    }
  }


  userImgUrl() {
    return `assets/images/users/${this.comment?.ownerId}.jpg`
  }

  toggleAddMode() {
   this.isAddMode = !this.isAddMode;
   console.log('isAddMode :', this.isAddMode, ' isEditMode: ', this.isEditMode);
  }

  toggleEditMode(e: any) {
    e.stopPropagation();
    this.isEditMode = !this.isEditMode;
    console.log('isAddMode :', this.isAddMode, ' isEditMode: ', this.isEditMode);
  }

  // submitComment() {
  //   console.log('isAddMode :', this.isAddMode, ' isEditMode: ', this.isEditMode);
  //   if(this.isAddMode) {
  //     const newComment: Comment = {
  //      id: Date.now(), // TODO: get id of last added comment + 1
  //      ownerId: this.activeUser.id,
  //      parentCommentId: this.comment.id,
  //      createdAt: new Date().toISOString(),
  //      txt: this.commentText
  //     }
  //     this.commentsService.addComment(newComment);
  //     this.isAddMode = false;
  //   } else {
  //     this.editComment();
  //   }
  // }

  // editComment() {
  //   this.comment.txt = this.commentText;
  //   this.comment.createdAt = new Date().toISOString();
  //   this.commentsService.editComment(this.comment);
  //   this.isEditMode = false;
  // }

  deleteComment() {
    this.commentsService.deleteComment(this.comment);
  }

}
