import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { BoardItem, BoardItemResponse } from '../../models/boardItem.model';
import { ColumnItemResponse } from '../../models/columnItem.model';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  board = new Subject<BoardItemResponse>();

  columns = new Subject<ColumnItemResponse[]>();

  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private boardsService: BoardsService
  ) {}

  ngOnInit() {
    this.boardsService
      .getBoardById(this.route.snapshot.params['id'])
      .subscribe((board) => {
        this.board.next(board);
        this.columns.next(board.columns);
        this.loading = false;
      });
  }
}
