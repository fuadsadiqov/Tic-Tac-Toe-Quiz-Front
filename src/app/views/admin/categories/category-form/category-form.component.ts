import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category, CategoryService } from '../../../../../services/category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent {
  private categoryService = inject(CategoryService);

  @Input() category: Category | null = null;
  @Output() closed = new EventEmitter<boolean>();

  title = '';

  ngOnInit() {
    if (this.category) {
      this.title = this.category.title;
    }
  }

  save() {
    if (this.category) {
      this.categoryService.update(this.category.id, { title: this.title }).subscribe(() => {
        this.closed.emit(true);
      });
    } else {
      this.categoryService.add({ title: this.title }).subscribe(() => {
        this.closed.emit(true);
      });
    }
  }

  close() {
    this.closed.emit(false);
  }
}
