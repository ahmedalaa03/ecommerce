import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  categories: WritableSignal<ICategory[]> = signal([]);
  ngOnInit(): void { this.getCategoriesData(); }
  getCategoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => { this.categories.set(res.data); }
    })
  }
}
