import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  concat,
  concatMap,
  defaultIfEmpty,
  forkJoin,
  last,
  map,
  mergeMap,
  Subject,
  tap,
} from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { BoardItem, BoardItemResponse } from '../models/boardItem.model';
import { ColumnItemResponse } from '../models/columnItem.model';
import { BoardsService } from './boards.service';
import { ColumnsService } from './columns.service';
import { TasksService } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  boards$ = new BehaviorSubject<BoardItem[]>([]);

  board$ = new Subject<BoardItemResponse>();

  board!: BoardItemResponse;

  constructor(
    private boardsService: BoardsService,
    private columnService: ColumnsService,
    private taskService: TasksService,
    private authService: AuthService
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
        board.columns.forEach((column) => {
          column.tasks = column.tasks.sort((a, b) => a.order - b.order);
        });
        this.board = board;
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
        return concat(...changeBoardsOrderRequests);
      }),
      last()
    );
  }

  replaceColumn(previousOrder: number, newOrder: number) {
    const column = this.board.columns[previousOrder - 1];
    if (newOrder < previousOrder) {
      return this.columnService
        .updateColumn(this.board.id, column.id, {
          title: column.title,
          order: -1,
        })
        .pipe(
          mergeMap(() => {
            const changeBoardsOrderRequests = this.board.columns
              .filter(
                (item) => item.order >= newOrder && item.order < previousOrder
              )
              .reverse()
              .map((item) => {
                return this.columnService.updateColumn(this.board.id, item.id, {
                  title: item.title,
                  order: item.order + 1,
                });
              });

            changeBoardsOrderRequests.push(
              this.columnService.updateColumn(this.board.id, column.id, {
                title: column.title,
                order: newOrder,
              })
            );

            return concat(...changeBoardsOrderRequests);
          }),
          last()
        );
    } else {
      return this.columnService
        .updateColumn(this.board.id, column.id, {
          title: column.title,
          order: -1,
        })
        .pipe(
          mergeMap(() => {
            const changeBoardsOrderRequests = this.board.columns
              .filter(
                (item) => item.order <= newOrder && item.order > previousOrder
              )
              .map((item) => {
                return this.columnService.updateColumn(this.board.id, item.id, {
                  title: item.title,
                  order: item.order - 1,
                });
              });

            changeBoardsOrderRequests.push(
              this.columnService.updateColumn(this.board.id, column.id, {
                title: column.title,
                order: newOrder,
              })
            );

            return concat(...changeBoardsOrderRequests);
          }),
          last()
        );
    }
  }

  replaceTask(
    previousOrder: number,
    newOrder: number,
    column: ColumnItemResponse
  ) {
    const task = column.tasks[previousOrder - 1];

    if (newOrder < previousOrder) {
      return this.taskService
        .updateTask(this.board.id, column.id, task.id, {
          title: task.title,
          done: task.done,
          order: -1,
          description: task.description,
          userId: this.authService.getUserId() || '',
          boardId: this.board.id,
          columnId: column.id,
        })
        .pipe(
          mergeMap(() => {
            const changeTasksOrderRequests = column.tasks
              .filter(
                (item) => item.order >= newOrder && item.order < previousOrder
              )
              .reverse()
              .map((item) => {
                return this.taskService.updateTask(
                  this.board.id,
                  column.id,
                  item.id,
                  {
                    title: item.title,
                    done: item.done,
                    order: item.order + 1,
                    description: item.description,
                    userId: this.authService.getUserId() || '',
                    boardId: this.board.id,
                    columnId: column.id,
                  }
                );
              });

            changeTasksOrderRequests.push(
              this.taskService.updateTask(this.board.id, column.id, task.id, {
                title: task.title,
                done: task.done,
                order: newOrder,
                description: task.description,
                userId: this.authService.getUserId() || '',
                boardId: this.board.id,
                columnId: column.id,
              })
            );

            return concat(...changeTasksOrderRequests);
          }),
          last()
        );
    } else {
      return this.taskService
        .updateTask(this.board.id, column.id, task.id, {
          title: task.title,
          done: task.done,
          order: -1,
          description: task.description,
          userId: this.authService.getUserId() || '',
          boardId: this.board.id,
          columnId: column.id,
        })
        .pipe(
          mergeMap(() => {
            const changeTasksOrderRequests = column.tasks
              .filter(
                (item) => item.order <= newOrder && item.order > previousOrder
              )
              .map((item) => {
                return this.taskService.updateTask(
                  this.board.id,
                  column.id,
                  item.id,
                  {
                    title: item.title,
                    done: item.done,
                    order: item.order - 1,
                    description: item.description,
                    userId: this.authService.getUserId() || '',
                    boardId: this.board.id,
                    columnId: column.id,
                  }
                );
              });

            changeTasksOrderRequests.push(
              this.taskService.updateTask(this.board.id, column.id, task.id, {
                title: task.title,
                done: task.done,
                order: newOrder,
                description: task.description,
                userId: this.authService.getUserId() || '',
                boardId: this.board.id,
                columnId: column.id,
              })
            );

            return concat(...changeTasksOrderRequests);
          }),
          last()
        );
    }
  }
}
