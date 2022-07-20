import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { finalize } from 'rxjs';
const { apiPokemon } = environment;
@Injectable({
    providedIn: 'root'
})
export class PokemonCatalogueService {
    private _pokemons: Pokemon[] = [];
    private _error: string = "";
    private _loading: boolean = false;
    /* Function to allow getting of readonly value*/
    get pokemons(): Pokemon[] {
        return this._pokemons;
    }
    get error(): string {
        return this._error;
    }
    get loading(): boolean {
        return this._loading;
    }
    constructor(private readonly http: HttpClient) { }
    /* Function to retrieve all pokemons from the API*/
    public findAllPokemons(): void {
        this._loading = true;
        this.http.get<{ results: [Pokemon] }>(apiPokemon)
            .pipe(
                finalize(() => {
                    this._loading = false;
                })
            )
            .subscribe({
                next: (pokemons: { results: [Pokemon] }) => {
                    this._pokemons = pokemons.results;
                },
                error: (error: HttpErrorResponse) => {
                    this._error = error.message;
                }
            })
    }
}
