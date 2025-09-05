import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { PaginatedResult } from '../core/interfaces/pagination';

export interface Attribute {
  id: number;
  title: string;
  personCount: number;
  categoryId: string;
}

@Injectable({ providedIn: 'root' })
export class AttributeService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + 'attribute';

  getAll(catId: string, query: { page?: number; limit?: number; search?: string, isAll?: boolean  } = { isAll: true }): Observable<PaginatedResult<Attribute>> {
    return this.http.get<PaginatedResult<Attribute>>(`${this.baseUrl}/all/${catId}`, { params: query });
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