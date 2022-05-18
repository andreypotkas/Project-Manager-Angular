import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ColumnItemResponse } from '../../models/columnItem.model';
import { TaskItemResponse } from '../../models/taskItem.model';
import { BoardsService } from '../../services/boards.service';
import { DataService } from '../../services/data.service';
import { TasksService } from '../../services/task.service';
import { ModalTaskComponent } from './modal-task/modal-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class TaskComponent {
  @Input() task!: TaskItemResponse;
  @Input() column!: ColumnItemResponse;
  @Input() boardId!: string;
  dialogRef: any;
  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private taskService: TasksService,
    private boardsService: BoardsService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private dataService: DataService
  ) {}

  createTask(): void {
    this.dialogRef = this.dialogService.open(ModalTaskComponent, {
      data: {
        mode: 'create',
        columnId: this.column.id,
        boardId: this.boardId,
        userId: this.authService.getUserId(),
      },
      header: 'Create task',
      width: '50%',
    });

    this.dialogRef.onClose.subscribe((task: TaskItemResponse) => {
      if (task) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          key: 'create',
          detail: `Task created`,
        });
      }

      this.boardsService
        .getBoardById(this.route.snapshot.params['id'])
        .pipe(take(1))
        .subscribe((board) => {
          this.dataService.board$.next(board);
        });
    });
  }

  deleteTask(taskId: string): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this board?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.taskService
          .deleteTask(this.boardId, this.column.id, taskId)
          .subscribe(() => {
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Task deleted',
            });
            this.boardsService
              .getBoardById(this.route.snapshot.params['id'])
              .pipe(take(1))
              .subscribe((board) => {
                this.dataService.board$.next(board);
              });
          });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }
  editTask(): void {
    this.dialogRef = this.dialogService.open(ModalTaskComponent, {
      data: {
        task: { ...this.task },
        columnId: this.column.id,
        boardId: this.boardId,
        userId: this.task.userId,
        mode: 'edit',
      },
      header: 'Edit task',
      width: '50%',
    });

    this.dialogRef.onClose.subscribe((task: TaskItemResponse) => {
      if (task) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          key: 'edit',
          detail: `Task id: ${task.id} edited`,
        });
      }

      this.boardsService
        .getBoardById(this.route.snapshot.params['id'])
        .pipe(take(1))
        .subscribe((board) => {
          this.dataService.board$.next(board);
          //TODO
          // this.loading = false;
        });
    });
  }
}
