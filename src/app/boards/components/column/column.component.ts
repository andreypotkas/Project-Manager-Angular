import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { BoardItemResponse } from '../../models/boardItem.model';
import { ColumnItemResponse } from '../../models/columnItem.model';
import { CreateTaskItem } from '../../models/taskItem.model';
import { TasksService } from '../../services/task.service';
import { ModalTaskComponent } from '../task/modal-task/modal-task.component';
@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  providers: [DialogService, MessageService],
})
export class ColumnComponent {
  @Input() column!: ColumnItemResponse;
  boardId: string = this.route.snapshot.params['id'];
  constructor(
    private taskService: TasksService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  createTask(): void {
    const task: CreateTaskItem = {
      title: 'Task: pet the cat',
      done: false,
      order: 1,
      description: 'Domestic cat needs to be stroked gently',
      userId: String(this.authService.getUserId()),
    };

    this.taskService
      .addTask(this.boardId, this.column.id, task)
      .subscribe((data) => console.log(data));
  }
}
