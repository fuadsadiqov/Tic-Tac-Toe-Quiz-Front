import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Attribute, AttributeService } from '../../../../services/attribute.service';
import { ConfirmDialogService } from '../../../components/confirm-dialog/confirm-dialog.service';
import { AttributeFormComponent } from './attribute-form/attribute-form.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-attributes',
  standalone: true,
  imports: [CommonModule, AttributeFormComponent, RouterModule],
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

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id') || '';
      this.loadAttributes();
    });
  }

  loadAttributes() {
    if (!this.categoryId) return;
    this.attributeService.getAll(this.categoryId).subscribe(res => this.attributes = res);
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
}
