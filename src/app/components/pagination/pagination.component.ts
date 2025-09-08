import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() total = 0;
  @Input() page = 1;
  @Input() limit = 10;
  @Output() pageChange = new EventEmitter<number>();
  @Output() searchChange = new EventEmitter<string>();

  get totalPages(): number {
    return Math.ceil(this.total / this.limit) || 1;
  }

  changePage(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.pageChange.emit(newPage);
  }

  onSearchChange(text: any){
    this.searchChange.emit(text.target.value);
  }

  get pages(): (any)[] {
    const pages: (number | string)[] = [];
    const total = this.totalPages;

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // həmişə ilk səhifə
    pages.push(1);

    // əvvəlki hissədə boşluq varsa
    if (this.page > 4) {
      pages.push('...');
    }

    // hazırki səhifənin 2 əvvəlki və 1 sonrakı
    const start = Math.max(2, this.page - 2);
    const end = Math.min(total - 1, this.page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // sonrakı hissədə boşluq varsa
    if (this.page + 1 < total - 1) {
      pages.push('...');
    }

    // sonuncu səhifə
    pages.push(total);

    return pages;
  }
}
