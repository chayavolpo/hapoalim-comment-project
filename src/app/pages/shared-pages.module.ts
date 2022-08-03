import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseActiveUserComponent } from './shared/components/choose-active-user/choose-active-user.component';

import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';




@NgModule({
    declarations: [
        ChooseActiveUserComponent
    ],
    imports: [
        CommonModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule
    ],
    exports: [
        ChooseActiveUserComponent,
        MatSelectModule,
        MatCardModule,
        MatButtonModule
    ]
})
export class SharedPagesModule { }
