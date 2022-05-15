import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
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
    private dataService: DataService
  ) {}

  deleteColumn(column: ColumnItemResponse) {
    this.loading = true;
    // this.columnService.deleteColumn(this.boardId, id).subscribe(() => {
    //   const columnsCount = this.dataService.board.columns.length;
    //   if (this.column.order < columnsCount) {
    //     const changeBoardsOrderRequests = this.dataService.board.columns
    //       .filter((item) => item.order > this.column.order)
    //       .map((item) => {
    //         return this.columnService.updateColumn(this.boardId, item.id, {
    //           title: item.title,
    //           order: item.order - 1,
    //         });
    //       });

    //     forkJoin(changeBoardsOrderRequests).subscribe(() => {
    //       this.getBoard();
    //     });
    //   } else {
    //     this.getBoard();
    //   }
    // });
    this.dataService.deleteColumn(column).subscribe(() => {
      this.getBoard();
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
