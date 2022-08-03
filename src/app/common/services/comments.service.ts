import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../models/comment.model';



@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  comments!: any;
  
  constructor(private http: HttpClient) { 
    this.getComments().subscribe(res =>{
      console.log('comments response: ', res, typeof res);
      this.comments = res;
    });
  }

  getComments() {
    return this.http.get('assets/data/comments.json')
  }

  getCommentsByUserId(ownerId: number) {
    return this.comments?.filter( (comment: Comment) => {
      comment.ownerId === ownerId
    })
  }
}
