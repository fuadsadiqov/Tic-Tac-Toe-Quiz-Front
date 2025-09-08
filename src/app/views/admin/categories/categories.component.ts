import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category, CategoryService } from '../../../../services/category.service';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ConfirmDialogService } from '../../../components/confirm-dialog/confirm-dialog.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, CategoryFormComponent, RouterModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
private categoryService = inject(CategoryService);
private confirmService = inject(ConfirmDialogService);
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  showModal = false;

  ngOnInit() {
    this.load();
  }

  load() {
    this.categoryService.getAll({ includeAttributes: true }).subscribe(res => this.categories = res);
  }

  addCategory() {
    this.selectedCategory = null;
    this.showModal = true;
  }

  editCategory(cat: Category) {
    this.selectedCategory = cat;
    this.showModal = true;
  }

  confirmDelete(catId: number) {
    this.confirmService.confirm({
      title: 'Delete Category',
      message: 'Are you sure you want to delete this category?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
    }).then((result: any) => {
      if (result) this.deleteCategory(catId);
    });
  }

  deleteCategory(id: number) {
    this.categoryService.delete(id).subscribe(() => this.load());
  }

  modalClosed(refresh: boolean) {
    this.showModal = false;
    this.selectedCategory = null;
    if (refresh) this.load();
  }

}
