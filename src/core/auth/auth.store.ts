import { effect, Injectable, signal } from '@angular/core';
import { Session } from './auth.types';


const KEY = 'app.session.v1';

@Injectable({ providedIn: 'root' })
export class AuthStore {
    private _session = signal<Session>({
        user: null,
        accessToken: null,
    });

    constructor() {
        const raw = localStorage.getItem(KEY);
        if (raw) this._session.set(JSON.parse(raw));

        effect(() => {
            localStorage.setItem(KEY, JSON.stringify(this._session()));
        });
    }

    session = this._session.asReadonly();
    set(s: Partial<Session>) { this._session.update(x => ({ ...x, ...s })); }
    clear() { this._session.set({ user: null, accessToken: null }); }
    logout() { this.clear(); location.assign('/admin/login'); }
}