import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { environment } from 'src/environments/environment';
const STORAGE_POKEMON_KEY = environment.STORAGE_POKEMON_KEY;
@Injectable({
    providedIn: 'root'
})
export class SessionStorageService {
    /*  Functions to set, get or clear list of pokemons in sessionStorage so the API doesn't get overloaded
        set-INPUT | get-OUTPUT: Array of Pokemon objects to be added/retrieved
    */
    public set pokemons(newpokemons:Pokemon[]) {
        sessionStorage.setItem(STORAGE_POKEMON_KEY, JSON.stringify(newpokemons));
    }
    public get pokemons():any {
        return sessionStorage.getItem(STORAGE_POKEMON_KEY);
    }
    public clearStorage():void {
        sessionStorage.removeItem(STORAGE_POKEMON_KEY);
    }
    constructor() { }
}
