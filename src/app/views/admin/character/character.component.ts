import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterFormComponent } from './character-form/character-form.component';
import { CharacterService, Character } from '../../../../services/character.service';
import { ConfirmDialogService } from '../../../components/confirm-dialog/confirm-dialog.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, CharacterFormComponent, RouterModule],
  templateUrl: './character.component.html',
})
export class CharactersComponent {
  categoryId!: string;

  private service = inject(CharacterService);
  private confirm = inject(ConfirmDialogService);
  private route = inject(ActivatedRoute);

  characters: Character[] = [];
  editingCharacter: Character | null = null;
  isModalOpen = false;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id') || '';
      this.loadCharacters();
    });
  }

  loadCharacters() {
    if (!this.categoryId) return;
    this.service.getAll(this.categoryId).subscribe(res => this.characters = res);
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
        this.loadCharacters();
      });
    } else {
      this.service.create(c).subscribe(() => {
        this.isModalOpen = false;
        this.loadCharacters();
      });
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
