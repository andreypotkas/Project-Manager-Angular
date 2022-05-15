import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { Observable } from 'rxjs';
import { BoardItem } from '../../models/boardItem.model';
import { BoardsService } from '../../services/boards.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class BoardsComponent implements OnInit {
  loading: boolean = true;

  constructor(
    private router: Router,
    private dataService: DataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.boardsService.getBoards().subscribe((boards) => {
      this.loading = false;
      this.dataService.boards$.next(boards);
    });
  }

  get boards$(): Observable<BoardItem[]> {
    return this.dataService.boards$;
  }

  goToBoard(id: string) {
    this.router.navigate(['/boards/', id]);
  }

  deleteBoard(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this board?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.boardsService.deleteBoard(id).subscribe(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'Board deleted',
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
}
