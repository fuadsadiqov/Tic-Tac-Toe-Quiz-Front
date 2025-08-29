import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Attribute {
  id: number;
  title: string;
  categoryId: string;
}

@Injectable({ providedIn: 'root' })
export class AttributeService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + 'attribute';

  getAll(catId: string): Observable<Attribute[]> {
    return this.http.get<Attribute[]>(`${this.baseUrl}/all/${catId}`);
  }

  create(dto: { title: string; categoryId: string }): Observable<Attribute> {
    return this.http.post<Attribute>(this.baseUrl, dto);
  }

  update(id: number, dto: { title: string }): Observable<Attribute> {
    return this.http.put<Attribute>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}