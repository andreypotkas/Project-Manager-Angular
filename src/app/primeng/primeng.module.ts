import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { CardModule } from 'primeng/card';
import { OrderListModule } from 'primeng/orderlist';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DataViewModule } from 'primeng/dataview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    StyleClassModule,
    CardModule,
    OrderListModule,
    DragDropModule,
    DataViewModule,
    ConfirmDialogModule,
    ToastModule,
    PanelModule,
  ],
  exports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    StyleClassModule,
    CardModule,
    OrderListModule,
    DragDropModule,
    DataViewModule,
    ConfirmDialogModule,
    ToastModule,
    PanelModule,
  ],
})
export class PrimengModule {}
