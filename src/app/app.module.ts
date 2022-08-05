import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentsModule } from './pages/comments/comments.module';
import { DateFormatPipe } from './common/pipes/date-format.pipe';
import { ForceService, UserForceComponent } from './pages/user-force.component';

@NgModule({
  declarations: [
    AppComponent,
    UserForceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommentsModule,
    BrowserAnimationsModule
  ],
  providers: [ForceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
