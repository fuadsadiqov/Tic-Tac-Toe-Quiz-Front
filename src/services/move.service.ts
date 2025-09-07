// move.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class MoveService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.apiUrl + "moves"
  createMove(payload: any) {
    return this.http.post(this.baseUrl, payload);
  }
}