import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged!: boolean;
  private subscription!: Subscription;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkToken();
    this.subscription = this.authService.isLogged.subscribe(
      (data) => (this.isLogged = data)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
