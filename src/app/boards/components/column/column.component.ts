import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  MessageService,
  ConfirmationService,
  ConfirmEventType,
} from 'primeng/api';
import { ColumnItemResponse } from '../../models/columnItem.model';
import { ColumnsService } from '../../services/columns.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() column!: ColumnItemResponse;

  @Input() boardId!: string;

  loading = false;

  title = new FormControl('', [Validators.required]);

  editMode = false;

  constructor(
    private columnService: ColumnsService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  onPressDeleteColumn(column: ColumnItemResponse) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this column?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.dataService.deleteColumn(column).subscribe(() => {
          this.getBoard();
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'Column deleted',
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

  getBoard() {
    this.loading = true;
    const boardId = this.route.snapshot.params['id'];
    this.dataService.getCurrentBoard(boardId).subscribe(() => {
      this.loading = false;
      this.editMode = false;
    });
  }

  onTitlePress() {
    this.title.setValue(this.column.title);
    if (!this.editMode) this.editMode = true;
  }

  closeEditMode() {
    this.editMode = false;
  }

  changeColumnTitle() {
    this.loading = true;
    this.columnService
      .updateColumn(this.boardId, this.column.id, {
        title: this.title.value,
        order: this.column.order,
      })
      .subscribe(() => {
        this.getBoard();
      });
  }
}
