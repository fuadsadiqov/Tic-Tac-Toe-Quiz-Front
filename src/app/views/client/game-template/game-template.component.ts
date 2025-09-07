// game-template.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GameService } from '../../../../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { Character, CharacterService } from '../../../../services/character.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MoveService } from '../../../../services/move.service';

@Component({
  selector: 'app-game-template',
  standalone: true,
  imports: [CommonModule, NgSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './game-template.component.html',
  styleUrl: './game-template.component.scss'
})
export class GameTemplateComponent {
  game: any;
  players: Character[] = [];

  selectedPlayer: string | null = null; // id saxlayırıq
  selectedCell: { row: any; col: any } | null = null;
  showModal = false;

  private route = inject(ActivatedRoute);
  private gameService = inject(GameService);
  private characterService = inject(CharacterService);
  private moveService = inject(MoveService);

  // search input üçün subject
  playerSearch$ = new Subject<string>();

  openModal(row: any, col: any) {
    this.selectedCell = { row, col };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedCell = null;
    this.selectedPlayer = null;
  }

  confirmSelection(playerId: string | null) {
    if (!playerId || !this.selectedCell) return;

    const payload = {
      gameId: this.game.id,
      playerId: playerId,
      rowAttributeId: this.selectedCell.row.id,
      columnAttributeId: this.selectedCell.col.id,
    };

    this.moveService.createMove(payload).subscribe({
      next: (res) => {
        console.log('Move created:', res);
        this.closeModal();
      },
      error: (err) => {
        console.error('Move validation failed:', err);
        alert(err.error?.message || 'Invalid move!');
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const gameId = params.get('id') || '';
      this.loadGames(gameId);
    });

    // typeahead search
    this.playerSearch$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => this.characterService.search(this.game.category.id, term))
      )
      .subscribe(players => this.players = players);
  }

  loadGames(id: string) {
    this.gameService.getOne(id).subscribe({
      next: (res) => {
        this.game = res;
      }
    });
  }
}