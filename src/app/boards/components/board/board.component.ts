import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { BoardItemResponse } from '../../models/boardItem.model';
import { ColumnItemResponse } from '../../models/columnItem.model';
import { ColumnsService } from '../../services/columns.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [MessageService],
})
export class BoardComponent implements OnInit {
  loading: boolean = true;

  displayModal = false;

  title = new FormControl('', [Validators.required, Validators.minLength(6)]);

  columns!: ColumnItemResponse[];

  constructor(
    private route: ActivatedRoute,
    private columnService: ColumnsService,
    private dataService: DataService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getBoard();

    this.dataService.board$.subscribe(
      (board) => (this.columns = board.columns)
    );
  }

  get board$(): Observable<BoardItemResponse> {
    return this.dataService.board$;
  }

  addColumn() {
    const newColumnTitle = this.title.value;
    const newColumnOrder = this.getNewColumnOrder();
    this.columnService
      .addColumn(this.dataService.board.id, {
        title: newColumnTitle,
        order: newColumnOrder,
      })
      .subscribe(() => {
        this.getBoard();
        this.displayModal = false;
        this.title.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Column Created',
        });
      });
  }

  getBoard() {
    this.loading = true;
    const boardId = this.route.snapshot.params['id'];
    this.dataService.getCurrentBoard(boardId).subscribe(() => {
      this.loading = false;
    });
  }

  getNewColumnOrder() {
    return (
      this.dataService.board.columns.reduce(
        (acc, column) => (acc > column.order ? acc : column.order),
        0
      ) + 1
    );
  }

  dropColumn(event: CdkDragDrop<ColumnItemResponse[]>) {
    if (event.previousIndex === event.currentIndex) return;

    this.dataService
      .replaceColumn(event.previousIndex + 1, event.currentIndex + 1)
      .subscribe(() => {
        this.getBoard();
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Column replaced',
        });
      });

    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
