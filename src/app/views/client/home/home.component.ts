import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { CreateGameDto, GameService } from '../../../../services/game.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameMode } from '../../../../core/enum/game.enum';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  loading = false;
  game: any = null;
  categories: any[] = [];
  selectedCategoryId: string | null = null;
  showCategoryModal = false;

  currentMode: GameMode | null = null; 

  // for local game
  showLocalModal = false;
  localPlayerX: string = '';
  localPlayerO: string = '';

  // for join game
  gameIdInput: string = '';

  private categoryService = inject(CategoryService);
  private gameService = inject(GameService);
  private router = inject(Router);

  joinGame() {
    if (!this.gameIdInput) return;
    this.router.navigate(['/game', this.gameIdInput]);
  }

  onCreateGameClick() {
    this.currentMode = GameMode.ONLINE;
    this.showCategoryModal = true;
  }

  onPlayLocalClick() {
    this.currentMode = GameMode.OFFLINE;
    this.showCategoryModal = true;
  }

  confirmCategorySelection() {
    if (!this.selectedCategoryId) return;

    this.showCategoryModal = false;

    if (this.currentMode === 'online') {
      this.startOnlineGame();
    } else if (this.currentMode === 'offline') {
      this.showLocalModal = true;
    }
  }


  startOnlineGame() {
    if (!this.selectedCategoryId) return;
    this.loading = true;

    const payload: CreateGameDto = {
      mode: GameMode.ONLINE,
      categoryId: this.selectedCategoryId,
    };

    this.createGame(payload)
  }

  startLocalGame() {
    if (!this.selectedCategoryId) return;
    this.loading = true;

    const payload: CreateGameDto = {
      mode: GameMode.OFFLINE,
      categoryId: this.selectedCategoryId,
      playerXName: this.localPlayerX || 'Player X',
      playerOName: this.localPlayerO || 'Player O'
    };

    this.createGame(payload)
  }

  createGame(payload: CreateGameDto) {
    this.loading = true;

    this.gameService.createGame(payload).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.router.navigate(['/game', res.id]);
      },
      error: (err) => {
        this.loading = false;
        console.error('Failed to create game', err);
      }
    });
  }

  loadCategories() {
    this.categoryService.getAll({ includeAttributes: false}).subscribe({
      next: (res) => this.categories = res,
      error: (err) => console.error('Failed to load categories', err)
    });
  }

  ngOnInit(){
    this.loadCategories();
  }
}
