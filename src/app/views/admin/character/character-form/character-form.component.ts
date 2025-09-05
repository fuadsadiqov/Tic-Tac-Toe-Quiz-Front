import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Attribute, AttributeService } from '../../../../../services/attribute.service';
import { Character } from '../../../../../services/character.service';
import { CommonModule } from '@angular/common';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './character-form.component.html',
})
export class CharacterFormComponent implements OnInit {
  @Input() character: Character | null = null;
  @Input() categoryId!: string;
  @Output() save = new EventEmitter<Partial<Character>>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  attributes: Attribute[] = [];

  private attributeService = inject(AttributeService);
  private toastService = inject(ToastrService);

  ngOnInit() {
    this.form = new FormBuilder().group({
      name: [this.character?.name || '', Validators.required],
      attributeIds: [this.character?.attributes.map(a => a.id) || []]
    });

    this.attributeService.getAll(this.categoryId).subscribe(attrs => {
      this.attributes = attrs.data;
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit({ ...this.character, ...this.form.value, categoryId: this.categoryId });
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  addAttribute = (name: string) => {
    const newAttr = { title: name, categoryId: this.categoryId };

    const temp = { id: null, title: name };

    this.attributeService.create(newAttr).subscribe({
      next: (saved) => {
          this.attributes = [...this.attributes, saved];

          const index = this.attributes.findIndex(a => a.title === temp.title && a.id === null);
          if (index > -1) {
            this.attributes[index] = saved;
          }

          const selected = this.form.get('attributeIds')?.value || [];
          const updated = selected.map((x: any) => (x === null ? saved.id : x));
          this.form.get('attributeIds')?.setValue(updated);
        },
        error: (err) => this.toastService.warning('Attribute əlavə olunmadı:')
    })
    return temp;
  };


}
