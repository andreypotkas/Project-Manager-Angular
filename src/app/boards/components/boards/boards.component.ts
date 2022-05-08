import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { BoardItem } from '../../models/boardItem.model';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class BoardsComponent {
  boards: BoardItem[] = [
    {
      id: '1',
      title: 'Test',
    },
  ];
  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  goToBoard(id: string) {
    this.router.navigate(['/boards/', id]);
  }
  deleteBoard(id: string) {
    console.log(1);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {},
      reject: () => {},
    });
  }
}
