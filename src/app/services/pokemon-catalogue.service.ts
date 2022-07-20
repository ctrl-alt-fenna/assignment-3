import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { finalize } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
const { apiPokemon } = environment;
@Injectable({
    providedIn: 'root'
})
export class PokemonCatalogueService {
    private _pokemons: Pokemon[] = [];
    private _details: [string] = [''];
    private _error: string = "";
    private _loading: boolean = false;
    private _sessionStorageService = new SessionStorageService();

    /* Getter functions to allow getting of readonly value*/
    get pokemons(): Pokemon[] { return this._pokemons }
    get error(): string { return this._error }
    get loading(): boolean { return this._loading }
    get details(): string[] { return this._details }
    constructor(private readonly http: HttpClient) { }
    /*  Function to clear sessionStorage
        Input: No input
        Output: Cleared sessionStorage for pokemon storage key
    */
    public clearStorage(): void { this._sessionStorageService.clearStorage() };
    /*  Function to retrieve all pokemons from the API
        INPUT: No input
        OUTPUT: Sets the pokemonlist in sessionStorage and pokemon-components if sessionStorage is empty,
        otherwise retrieves list from sessionStorageService so API doesn't get overloaded with requests
    */
    public findAllPokemons(): void {
        let storageList = this._sessionStorageService.pokemons;
        if (storageList !== null) this._pokemons = JSON.parse(storageList);
        else {
            this._loading = true;
            this.http.get<{ results: [{ name: string, url: string }] }>(`${apiPokemon}/?limit=1`)
                .pipe(
                    finalize(() => {
                        this._loading = false;
                    })
                )
                .subscribe({
                    next: (response: { results: [{ name: string, url: string }] }) => {
                        // If there is an array of pokemons in sessionstorage, load that.
                        for (const item of response.results) {
                            let splitURL = item.url.split('/');
                            let id = splitURL[splitURL.length - 2];
                            let p = new Pokemon(item.name, id)
                            this.http.get(`${apiPokemon}/${id}/`)
                                .subscribe({
                                    next: (response:any) => {
                                        let stats = response.stats
                                        let string = ''
                                        p.details=[]
                                        for (const stat of stats) {
                                            let statName = stat.stat.name[0].toUpperCase() + stat.stat.name.substring(1);
                                            string = statName + ": " + stat.base_stat;
                                            p.details.push(string);
                                        }
                                    }
                                })
                            this._pokemons.push(p);
                        }
                        this._sessionStorageService.pokemons = this._pokemons;
                    },
                    error: (error: HttpErrorResponse) => {
                        this._error = error.message;
                    }
                })
        }
    }
}
