import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { GameService } from '../../../../services/game.service';
import { ActivatedRoute } from '@angular/router';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { CharacterService } from '../../../../services/character.service';

@Component({
  selector: 'app-game-template',
  standalone: true,
  imports: [CommonModule, NgSelectModule],
  templateUrl: './game-template.component.html',
  styleUrl: './game-template.component.scss'
})
export class GameTemplateComponent {
  game: any;
  players: [] = [];

  selectedCell: { row: any; col: any } | null = null;
  showModal = false;

  private route = inject(ActivatedRoute);
  private gameService = inject(GameService);
  private characterService = inject(CharacterService);

  openModal(row: any, col: any) {
    this.selectedCell = { row, col };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedCell = null;
  }

  confirmSelection(player: any) {
    console.log('Selected player:', player, 'for cell:', this.selectedCell);
    this.closeModal();
  }

  getPlayers(id: string){
    this.characterService.getOne(id).subscribe({
      next: (res) => {
        this.players = res.;
      }
    })
  }

  loadGames(id: string){
    this.gameService.getOne(id).subscribe({
      next: (res) => {
        this.game = res;
      }
    })
  }

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const gameId = params.get('id') || '';
      this.loadGames(gameId);
    });
  }
}
