// move.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

export interface MovesByGame{
  id: string,
  columnAttributeId: string,
  rowAttributeId: string,
  isValid: boolean,
  symbol: 'X' | 'O'
  person: {
    id: string,
    name: string
  },
  player: {
    id: string,
    username: string
  }
}

@Injectable({ providedIn: 'root' })
export class MoveService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.apiUrl + "move"
 
  createMove(payload: any) {
    return this.http.post(this.baseUrl, payload);
  }

  getMovesByGame(gameId: string) : Observable<MovesByGame[]>{
    return this.http.get<MovesByGame[]>(this.baseUrl + "/game/" + gameId);
  }
}