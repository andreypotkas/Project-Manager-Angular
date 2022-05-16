import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  TaskItemResponse,
  UpdateTaskItem,
} from 'src/app/boards/models/taskItem.model';
import { TasksService } from 'src/app/boards/services/task.service';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.scss'],
  providers: [MessageService],
})
export class ModalTaskComponent implements OnInit {
  public modalForm: FormGroup;
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private taskService: TasksService
  ) {
    this.modalForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      order: new FormControl(null, [Validators.required]),
      done: new FormControl(false, [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.modalForm.valid) {
      const taskId = this.config.data.task.id;
      const taskData: UpdateTaskItem = {
        userId: this.config.data.task.userId,
        boardId: this.config.data.task.boardId,
        columnId: this.config.data.task.columnId,
        ...this.modalForm.value,
      };
      this.taskService
        .updateTask(taskData.boardId, taskData.columnId, taskId, taskData)
        .subscribe((task: TaskItemResponse) => {
          this.ref.close(task);
        });
    }
  }

  ngOnInit(): void {
    const { task } = this.config.data;
    this.modalForm.setValue({
      title: task.title,
      description: task.description,
      order: task.order,
      done: task.done,
    });
  }
}
