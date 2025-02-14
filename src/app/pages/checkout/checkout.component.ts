import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/order/order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly orderService = inject(OrderService);
  cardId: string = '';
  checkoutForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl(null, [Validators.required])
  });
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => { this.cardId = param.get('id')! })}
  submitForm(): void {
this.orderService.checkoutSession(this.cardId,this.checkoutForm.value).subscribe({
  next:(res)=>{if(res.status==='success'){
    open(res.session.url,'_self')
  }},
error:(err)=>{console.log(err)}
})
  }
}
