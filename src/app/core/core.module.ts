import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './components/header/header.component';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { FooterComponent } from './components/footer/footer.component';
import { BoardsModule } from '../boards/boards.module';
import { PrimengModule } from '../primeng/primeng.module';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
@NgModule({
  declarations: [HeaderComponent, WelcomeComponent, FooterComponent],
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
  ],
})
export class CoreModule {}
