import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { ButtonModule } from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {StyleClassModule} from 'primeng/styleclass';
import { WelcomeComponent } from './components/welcome/welcome.component';
import {CardModule} from 'primeng/card';

export const PrimengModule =[
  ButtonModule,
  CheckboxModule,
  InputTextModule,
  StyleClassModule,
  CardModule
];

@NgModule({
  declarations: [
    HeaderComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    BrowserModule,
    AppRoutingModule,
    StyleClassModule,
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }