import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { ColumnItemResponse } from '../../models/columnItem.model';
import { TaskItemResponse } from '../../models/taskItem.model';
import { ModalTaskComponent } from './modal-task/modal-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [MessageService],
})
export class TaskComponent {
  @Input() task!: TaskItemResponse;
  @Input() column!: ColumnItemResponse;
  @Input() boardId!: string;
  dialogRef: any;
  constructor(
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}
  showModal(): void {
    this.dialogRef = this.dialogService.open(ModalTaskComponent, {
      data: {
        task: { ...this.task, columnId: this.column.id, boardId: this.boardId },
      },
      header: 'Edit task',
      width: '50%',
    });

    this.dialogRef.onClose.subscribe((task: TaskItemResponse) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Task id: ${task.id} edited`,
      });
    });
  }
}
