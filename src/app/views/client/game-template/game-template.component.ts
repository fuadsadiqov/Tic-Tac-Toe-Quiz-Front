// game-template.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GameService } from '../../../../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { Character, CharacterService } from '../../../../services/character.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MovesByGame, MoveService } from '../../../../services/move.service';
import { ToastrService } from 'ngx-toastr';
import { GameMode } from '../../../../core/enum/game.enum';

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
  moves: MovesByGame[] = [];

  selectedPlayer: string | null = null;
  selectedCell: { row: any; col: any } | null = null;
  showModal = false;

  currentPlayerName: string | null = null;
  currentTurn: 'X' | 'O' | null = null;

  private toastService = inject(ToastrService);
  private route = inject(ActivatedRoute);
  private gameService = inject(GameService);
  private characterService = inject(CharacterService);
  private moveService = inject(MoveService);

  playerSearch$ = new Subject<string>();

  openModal(row: any, col: any) {
    const move = this.getMoveForCell(row, col);
    if (move) return;
    this.selectedCell = { row, col };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedCell = null;
    this.selectedPlayer = null;
  }

  confirmSelection(personId: string | null) {
    if (!personId || !this.selectedCell) return;

    const payload = {
      gameId: this.game.id,
      personId: personId,
      currentTurn: this.currentTurn,
      rowAttributeId: this.selectedCell.row.id,
      columnAttributeId: this.selectedCell.col.id,
    };

    this.moveService.createMove(payload).subscribe({
      next: (res) => {
        this.closeModal();
        this.loadMoves();
      },
      error: (err) => {
        if(err.status === 400){
          this.closeModal();
          this.loadGames(this.game.id);
        }
      } 
    });
  }

  updateCurrentTurn() {
    if (!this.game) return;

    if (!this.moves || this.moves.length === 0) {
      this.currentTurn = 'X';
      this.currentPlayerName = this.game.mode === GameMode.ONLINE
        ? this.game.playerX?.username
        : this.game.playerXName;
      return;
    }

    const totalMoves = this.moves.length + (this.game.failedMoves || 0);
    this.currentTurn = totalMoves % 2 === 0 ? 'X' : 'O';

    if (this.game.mode === GameMode.ONLINE) {
      this.currentPlayerName = this.currentTurn === 'X'
        ? this.game.playerX?.username
        : this.game.playerO?.username;
    } else {
      this.currentPlayerName = this.currentTurn === 'X'
        ? this.game.playerXName
        : this.game.playerOName;
    }
  }

  getMoveForCell(row: any, col: any) {
    return this.moves.find(m => 
      m.rowAttributeId === row.id && 
      m.columnAttributeId === col.id
    );
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
        this.loadMoves();
      }
    });
  }

  loadMoves() {
    this.moveService.getMovesByGame(this.game.id).subscribe((moves: MovesByGame[]) => {
      this.moves = moves;
      this.updateCurrentTurn();
    });
  }
}