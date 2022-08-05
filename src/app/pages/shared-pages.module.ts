import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseActiveUserComponent } from './shared/components/choose-active-user/choose-active-user.component';

import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DateFormatPipe } from '../common/pipes/date-format.pipe';
import { AddCommentComponent } from './shared/components/add-comment/add-comment.component';




@NgModule({
  declarations: [
    ChooseActiveUserComponent,
    DateFormatPipe,
    AddCommentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [
    ChooseActiveUserComponent,
    AddCommentComponent,
    DateFormatPipe,
    FormsModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class SharedPagesModule { }
