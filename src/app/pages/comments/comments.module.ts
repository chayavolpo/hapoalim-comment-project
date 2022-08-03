import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CommentsComponent } from './comments.component';
import { SharedPagesModule } from '../shared-pages.module';
import { CommentComponent } from './comment/comment.component';

const routes: Routes = [
  { path: '', component: CommentsComponent, pathMatch: 'full' }
]

@NgModule({
  declarations: [
    CommentsComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedPagesModule
  ]
})
export class CommentsModule { }
