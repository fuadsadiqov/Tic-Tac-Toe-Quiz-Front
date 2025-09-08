import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { GameMode } from "../core/enum/game.enum";

export interface CreateGameDto{
    mode: GameMode,
    categoryId: string
    playerXName?: string | null,
    playerOName?: string | null
}

@Injectable({
    providedIn: "root"
})
export class GameService{
    private http = inject(HttpClient);
    private baseUrl = environment.apiUrl + 'games';
 
    getAll(){
        return this.http.get(this.baseUrl)
    }
 
    getOne(id: string){
        return this.http.get(this.baseUrl + `/${id}`)
    }
    
    createGame(body: CreateGameDto){
        return this.http.post(this.baseUrl, body)
    }
}