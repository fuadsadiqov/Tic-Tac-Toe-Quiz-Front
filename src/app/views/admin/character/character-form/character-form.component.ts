import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Attribute, AttributeService } from '../../../../../services/attribute.service';
import { Character } from '../../../../../services/character.service';
import { CommonModule } from '@angular/common';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';

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

  ngOnInit() {
    this.form = new FormBuilder().group({
      name: [this.character?.name || '', Validators.required],
      attributeIds: [this.character?.attributes.map(a => a.id) || []]
    });

    this.attributeService.getAll(this.categoryId).subscribe(attrs => {
      this.attributes = attrs;
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
}
