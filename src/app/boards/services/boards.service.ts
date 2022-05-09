import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardItem } from '../models/boardItem.model';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private http: HttpClient) {}

  getBoards(): Observable<BoardItem[]> {
    return this.http.get<BoardItem[]>('boards');
  }
  deleteBoard(id: string): Observable<BoardItem> {
    return this.http.delete<BoardItem>('boards/' + id);
  }
}
