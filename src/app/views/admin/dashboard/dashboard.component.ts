import { Component, inject } from '@angular/core';
import { AuthStore } from '../../../../core/auth/auth.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  store = inject(AuthStore);
}
