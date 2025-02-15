import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const ngxSpinnerService =inject(NgxSpinnerService);
  if(!(req.url.includes('cart')&&req.method ==='PUT'))
  ngxSpinnerService.show();
  return next(req).pipe(finalize(()=>{
    ngxSpinnerService.hide();
  }));
};
