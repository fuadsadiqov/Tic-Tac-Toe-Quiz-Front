import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Attribute, AttributeService } from '../../../../services/attribute.service';
import { ConfirmDialogService } from '../../../components/confirm-dialog/confirm-dialog.service';
import { AttributeFormComponent } from './attribute-form/attribute-form.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PaginationComponent } from '../../../components/pagination/pagination.component';

@Component({
  selector: 'app-attributes',
  standalone: true,
  imports: [CommonModule, AttributeFormComponent, RouterModule, PaginationComponent],
  templateUrl: './attributes.component.html',
})
export class AttributesComponent {
  categoryId!: string;

  private attributeService = inject(AttributeService);
  private confirm = inject(ConfirmDialogService);
  private route = inject(ActivatedRoute);

  attributes: Attribute[] = [];
  editingAttribute: Attribute | null = null;
  isModalOpen = false;

  pagination = { page: 1, limit: 10, total: 0 };
  searchTerm = '';

  selectedAttribute: any = null;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id') || '';
      this.loadAttributes();
    });
  }

  loadAttributes() {
    if (!this.categoryId) return;
    this.attributeService.getAll(
      this.categoryId,
      {
        page: this.pagination.page,
        limit: this.pagination.limit,
        search: this.searchTerm,
      }
    ).subscribe(res => {
      this.attributes = res.data;
      this.pagination = { page: Number(res.page), limit: Number(res.limit), total: Number(res.total) };
    });
  }

  addAttribute() {
    this.editingAttribute = null;
    this.isModalOpen = true;
  }

  editAttribute(attr: Attribute) {
    this.editingAttribute = attr;
    this.isModalOpen = true;
  }

  deleteAttribute(attr: Attribute) {
    this.confirm.confirm({ message: `Delete attribute "${attr.title}"?` }).then(ok => {
      if (ok) {
        this.attributeService.delete(attr.id).subscribe(() => this.loadAttributes());
      }
    });
  }

  handleSave(attr: Partial<Attribute>) {
    if (this.editingAttribute) {
      this.attributeService.update(this.editingAttribute.id, { title: attr.title! }).subscribe(() => {
        this.isModalOpen = false;
        this.loadAttributes();
      });
    } else {
      this.attributeService.create({ title: attr.title!, categoryId: attr.categoryId! }).subscribe(() => {
        this.isModalOpen = false;
        this.loadAttributes();
      });
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onPageChange(newPage: number) {
    this.pagination.page = newPage;
    this.loadAttributes();
  }

  onSearchChange(value: string) {
    this.searchTerm = value;
    this.pagination.page = 1;
    this.loadAttributes();
  }

  showPersons(attr: any) {
    this.selectedAttribute = attr;
  }

  closeShowPersonModal() {
    this.selectedAttribute = null;
  }

}
