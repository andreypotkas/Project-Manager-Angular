import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  defaultIfEmpty,
  forkJoin,
  map,
  mergeMap,
  Subject,
  tap,
} from 'rxjs';
import { BoardItem, BoardItemResponse } from '../models/boardItem.model';
import { ColumnItemResponse } from '../models/columnItem.model';
import { BoardsService } from './boards.service';
import { ColumnsService } from './columns.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  boards$ = new BehaviorSubject<BoardItem[]>([]);

  board$ = new Subject<BoardItemResponse>();

  board!: BoardItemResponse;

  constructor(
    private boardsService: BoardsService,
    private columnService: ColumnsService
  ) {}

  getBoards() {
    return this.boardsService.getBoards().pipe(
      tap((boards) => {
        this.boards$.next(boards);
      })
    );
  }

  getCurrentBoard(id: string) {
    return this.boardsService.getBoardById(id).pipe(
      tap((board) => {
        board.columns = board.columns.sort((a, b) => a.order - b.order);
        this.board = board;
        console.log('bb', board);
        this.board$.next(board);
      })
    );
  }

  deleteColumn(column: ColumnItemResponse) {
    return this.columnService.deleteColumn(this.board.id, column.id).pipe(
      map(() => {
        const changeBoardsOrderRequests = this.board.columns
          .filter((item) => item.order > column.order)
          .map((item) => {
            return this.columnService.updateColumn(this.board.id, item.id, {
              title: item.title,
              order: item.order - 1,
            });
          });

        return changeBoardsOrderRequests;
      }),
      mergeMap((requests) => forkJoin(requests)),
      defaultIfEmpty(null)
    );
  }
}
