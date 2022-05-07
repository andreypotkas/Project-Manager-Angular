import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './components/header/header.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { FooterComponent } from './components/footer/footer.component';
import { BoardsModule } from '../boards/boards.module';
import { PrimengModule } from '../primeng/primeng.module';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [
    HeaderComponent,
    WelcomeComponent,
    FooterComponent,
    NotFoundPageComponent,
  ],
  imports: [
    CommonModule,
    PrimengModule,
    BrowserModule,
    AppRoutingModule,
    BoardsModule,
    MessagesModule,
    MessageModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PrimengModule,
    MessagesModule,
    MessageModule,
    // StyleClassModule,
    // BrowserAnimationsModule,
  ],
})
export class CoreModule {}
