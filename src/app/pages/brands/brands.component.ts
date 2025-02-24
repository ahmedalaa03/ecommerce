import { Component, inject, signal, WritableSignal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrand } from '../../shared/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  imports: [TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
private readonly brandsService = inject(BrandsService);
  brands: WritableSignal<IBrand[]> = signal([]);
  ngOnInit(): void { this.getBrandsData(); }
  getBrandsData(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => { this.brands.set(res.data); }
    })
  }
}
