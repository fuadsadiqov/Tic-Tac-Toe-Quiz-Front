import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../environments/environment";

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
    
    createGame() {
        return this.http.post(this.baseUrl, {})
    }
}