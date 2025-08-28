import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { AuthStore } from './auth.store';
import { Session, User } from './auth.types';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SKIP_AUTH } from '../http/skip-auth.context';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private store = inject(AuthStore);

  private readonly baseUrl = environment.apiUrl;

  login(username: string, password: string): Observable<Session> {
    return this.http.post<Session>(`${this.baseUrl}auth/login`, 
      { username, password },
      {
        context: new HttpContext().set(SKIP_AUTH, true)
      }
    ).pipe(
      tap(session => {
        this.store.set(session);
      })
    );
  }

  me(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`).pipe(
      tap(user => this.store.set({ user }))
    );
  }

  logout() {
    this.store.logout();
  }
}
