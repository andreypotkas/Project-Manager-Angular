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
  ],
})
export class PrimengModule {}
