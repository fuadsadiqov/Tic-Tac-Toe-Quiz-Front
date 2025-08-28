import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { clientRoutes } from './client.routes';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    RouterLink, 
    RouterOutlet,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {

}
