import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColumnItem, CreateColumnItem } from '../models/columnItem.model';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  constructor(private http: HttpClient) {}

  getColumns(boardId: string): Observable<ColumnItem[]> {
    return this.http.get<ColumnItem[]>('boards/' + boardId + '/columns');
  }

  getColumnById(boardId: string, columnId: string): Observable<ColumnItem> {
    return this.http.get<ColumnItem>(
      'boards/' + boardId + '/columns/' + columnId
    );
  }

  addColumn(
    boardId: string,
    newColumn: CreateColumnItem
  ): Observable<ColumnItem> {
    return this.http.post<ColumnItem>(
      'boards/' + boardId + '/columns',
      newColumn
    );
  }

  updateColumn(
    boardId: string,
    columnId: string,
    changedColumn: CreateColumnItem
  ): Observable<ColumnItem> {
    return this.http.post<ColumnItem>(
      'boards/' + boardId + '/columns/' + columnId,
      changedColumn
    );
  }

  deleteColumn(boardId: string, columnId: string) {
    return this.http.delete('boards/' + boardId + '/columns/' + columnId);
  }
}
