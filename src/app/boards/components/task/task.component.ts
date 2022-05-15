import { Component, Input } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ColumnItemResponse } from '../../models/columnItem.model';
import { TaskItemResponse } from '../../models/taskItem.model';
import { ModalTaskComponent } from './modal-task/modal-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: TaskItemResponse;
  @Input() column!: ColumnItemResponse;
  @Input() boardId!: string;
  constructor(private dialogService: DialogService) {}
  showModal(): void {
    const ref = this.dialogService.open(ModalTaskComponent, {
      data: {
        task: { ...this.task, columnId: this.column.id, boardId: this.boardId },
      },
      header: 'Edit task',
      width: '50%',
    });
  }
}
