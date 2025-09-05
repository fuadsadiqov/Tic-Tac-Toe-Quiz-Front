import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { GameService } from '../../../../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  loading = false;
  game: any = null;

  private gameService = inject(GameService);

  createGame(){
    this.gameService.createGame().subscribe({
      next: (res) => {
          this.game = res;
          console.log('Game created:', res);
          this.loading = false;
      },
      error: (err) => {
          console.error('Game creation failed:', err);
          this.loading = false;
      }
    });
  }
}
