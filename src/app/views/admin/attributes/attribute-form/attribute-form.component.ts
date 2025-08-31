import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Attribute } from '../../../../../services/attribute.service';

@Component({
  selector: 'app-attribute-form',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    CommonModule,
  ],
  templateUrl: './attribute-form.component.html'
})
export class AttributeFormComponent implements OnInit {
  @Input() attribute: Attribute | null = null;
  @Input() categoryId!: number;
  @Output() save = new EventEmitter<Partial<Attribute>>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.attribute?.title || '', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit({ ...this.attribute, ...this.form.value, categoryId: this.categoryId });
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
