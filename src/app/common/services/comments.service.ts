import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Comment, CommentsChildrenObj } from '../models/comment.model';



@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  readonly STORAGE_COMMENTS_KEY = 'comments';
  readonly STORAGE_DELETED_COMMENTS_KEY = 'deletedComments';

  comments: Comment[] = [];
  comments$: ReplaySubject<Comment[]> = new ReplaySubject();
  commentsChildrenObj: CommentsChildrenObj = {};
  commentsChildrenObj$: ReplaySubject<CommentsChildrenObj> = new ReplaySubject();
  deletedComments: Comment[] = [];

  constructor(private http: HttpClient) {
    this.initComments();
  }

  initComments() {
    const comments = localStorage.getItem(this.STORAGE_COMMENTS_KEY);
    const deletedComments = localStorage.getItem(this.STORAGE_DELETED_COMMENTS_KEY);
    if(deletedComments) {
      this.setDeletedComments(JSON.parse(deletedComments), false)
    }
    if (comments) {
      this.setComments(JSON.parse(comments), false)
    } else {
      this.getComments().subscribe((res: any[]) => {
        console.log('comments response: ', res, typeof res);
        this.setCommentsChildrenObj(res);
        this.setComments(this.commentsChildrenObj, true);
      });
    }
  }

  getComments(): Observable<any[]> {
    return this.http.get<any[]>('assets/data/comments.json');
  }

  setCommentsChildrenObj(comments: Comment[]) {
    this.comments = comments;
    this.comments.forEach((comment: Comment) => {
      const key = comment.parentCommentId || 0;
      if (!this.commentsChildrenObj[key]) this.commentsChildrenObj[key] = [];
      this.commentsChildrenObj[key].push(comment);
    });
    console.log('this.commentsChildrenObj: ', this.commentsChildrenObj)
  }

  setComments(commentsObj: CommentsChildrenObj, ifUpdateStorage: boolean) {
    this.commentsChildrenObj = commentsObj;
    if (ifUpdateStorage) {
      localStorage.setItem(this.STORAGE_COMMENTS_KEY, JSON.stringify(this.commentsChildrenObj));
    }
    this.commentsChildrenObj$.next(this.commentsChildrenObj);
    console.log('comments in service: ', this.commentsChildrenObj);
  }

  setDeletedComments(deletedComments: Comment[], ifUpdateStorage: boolean) {
    if(ifUpdateStorage) {
      localStorage.setItem(this.STORAGE_DELETED_COMMENTS_KEY, JSON.stringify(this.deletedComments));
    }
    this.deletedComments = deletedComments
  }

  editComment(editComment: Comment) {
    let key = editComment.parentCommentId || 0;
    const index = this.commentsChildrenObj[key].findIndex(comment => comment.id === editComment.id);
    this.commentsChildrenObj[key][index] = editComment;
    this.setComments(this.commentsChildrenObj, true);
  }

  addComment(comment: Comment) {
    console.log('in add comment: ', comment);
    const key = comment.parentCommentId || 0;
    if(!this.commentsChildrenObj[key]) this.commentsChildrenObj[key] = [];
    this.commentsChildrenObj[key].push(comment);
    this.setComments(this.commentsChildrenObj, true);
  }

  deleteComment(commentToDelete: Comment,) {
    console.log('delete comment id:', commentToDelete);
    const { id, parentCommentId } = commentToDelete;
    this.deepCommentDelete(id, parentCommentId || 0);
    this.setComments(this.commentsChildrenObj, true);
  }

  deepCommentDelete(commentId: number, parentCommentId: number) {
    if (this.commentsChildrenObj[commentId]) {
      this.commentsChildrenObj[commentId].forEach(comment => this.deepCommentDelete(comment.id, comment.parentCommentId || 0));
    }
    if (!this.commentsChildrenObj[commentId] || this.commentsChildrenObj[commentId].length < 1) {
      const deletedComment = this.commentsChildrenObj[parentCommentId].find(comment => comment.id === commentId);
      if (deletedComment) {
        deletedComment.deletedAt = new Date().toISOString();
        this.deletedComments.push(deletedComment);
        this.setDeletedComments(this.deletedComments, true);
      }
      this.commentsChildrenObj[parentCommentId] = this.commentsChildrenObj[parentCommentId].filter(comment => {
        console.log('comment.id: ', comment.id, ' commentId: ', commentId, ' parentCommentId: ', parentCommentId);
        return comment.id !== commentId
      });

    }
  }


}
