import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Category {
  id: number;
  title: string;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + 'category';

  getAll({ includeAttributes }: { includeAttributes: boolean }): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + '/all', { params: { includeAttributes }});
  }

  add(category: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, category);
  }

  update(id: number, category: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${id}`, category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
