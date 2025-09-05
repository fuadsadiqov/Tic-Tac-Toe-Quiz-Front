import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterFormComponent } from './character-form/character-form.component';
import { CharacterService, Character } from '../../../../services/character.service';
import { ConfirmDialogService } from '../../../components/confirm-dialog/confirm-dialog.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaginationComponent } from '../../../components/pagination/pagination.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, CharacterFormComponent, RouterModule, PaginationComponent],
  templateUrl: './character.component.html',
})
export class CharactersComponent {
  math = Math
  categoryId!: string;

  private service = inject(CharacterService);
  private confirm = inject(ConfirmDialogService);
  private route = inject(ActivatedRoute);
  private toast = inject(ToastrService);

  characters: Character[] = [];
  editingCharacter: Character | null = null;
  isModalOpen = false;

  pagination = { page: 1, limit: 10, total: 0 };
  searchTerm = '';

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id') || '';
      this.loadCharacters();
    });
  }

  loadCharacters() {
    if (!this.categoryId) return;
    this.service.getAll(this.categoryId, {
      page: this.pagination.page,
      limit: this.pagination.limit,
      search: this.searchTerm
    }).subscribe(res => {
      this.characters = res.data;
      this.pagination = { page: Number(res.page), limit: Number(res.limit), total: Number(res.total) };
    });
  }

  addCharacter() {
    this.editingCharacter = null;
    this.isModalOpen = true;
  }

  editCharacter(c: Character) {
    this.editingCharacter = c;
    this.isModalOpen = true;
  }

  deleteCharacter(c: Character) {
    this.confirm.confirm({ message: `Delete character "${c.name}"?` }).then(ok => {
      if (ok) this.service.delete(c.id).subscribe(() => this.loadCharacters());
    });
  }

  handleSave(c: Partial<Character>) {
    if (this.editingCharacter) {
      this.service.update(this.editingCharacter.id, c).subscribe(() => {
        this.isModalOpen = false;
        this.toast.success("Character updated successfully.");
        this.loadCharacters();
      });
    } else {
      this.service.create(c).subscribe(() => {
        this.isModalOpen = false;
        this.toast.success("Character created successfully.");
        this.loadCharacters();
      });
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onPageChange(newPage: number) {
    this.pagination.page = newPage;
    this.loadCharacters();
  }

  onSearchChange(value: string) {
    this.searchTerm = value;
    this.pagination.page = 1;
    this.loadCharacters();
  }
}
