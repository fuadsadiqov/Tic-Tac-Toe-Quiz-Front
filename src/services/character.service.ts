import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attribute } from './attribute.service';
import { environment } from '../environments/environment';

export interface Character {
  id: number;
  name: string;
  categoryId: number;
  attributes: Attribute[];
}

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + 'person';

  getAll(categoryId: string): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/all/${categoryId}`);
  }

  getOne(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/${id}`);
  }

  create(dto: Partial<Character>): Observable<Character> {
    return this.http.post<Character>(this.baseUrl, dto);
  }

  update(id: number, dto: Partial<Character>): Observable<Character> {
    return this.http.put<Character>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
