import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { OrderService } from '../../core/services/order/order.service';
import { IOrders } from '../../shared/interfaces/iorders';

@Component({
  selector: 'app-allorders',
  imports: [TranslatePipe,CurrencyPipe,RouterLink],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  private readonly orderService = inject(OrderService);
  private readonly authService = inject(AuthService);
  allOrders:IOrders[]=[];
  ngOnInit(): void {
    this.authService.saveUserData();
    this.orderService.getUserOrders(this.authService.userData.id).subscribe({
      next: (res) => { this.allOrders = res; }
    })
  }
}
