import { Component, Input } from '@angular/core';
import { ColumnItemResponse } from '../../models/columnItem.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() column!: ColumnItemResponse;
}
