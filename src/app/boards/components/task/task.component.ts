import { Component, Input } from '@angular/core';
import { TaskItemResponse } from '../../models/taskItem.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: TaskItemResponse;
}
