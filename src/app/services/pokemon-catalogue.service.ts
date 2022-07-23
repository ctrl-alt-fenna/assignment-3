import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Pokemon } from '../models/pokemon.model'
import { finalize } from 'rxjs'
import { SessionStorageService } from './session-storage.service'

const { apiPokemon } = environment;

@Injectable({
    providedIn: 'root'
})
export class PokemonCatalogueService {
    private _limit: number = 50
    private _offset: number = 0
    private _pageNumber:number= 1
    private _totalPages:number = 0
    private _pokemons: Pokemon[] = []
    private _collectedPokemons: Pokemon[] = []
    private _error: string = ""
    private _loading: boolean = false
    private _sessionStorageService = new SessionStorageService()

    /* Getter functions to allow getting of readonly value*/
    get pokemons(): Pokemon[] { return this._pokemons }
    get error(): string { return this._error }
    get loading(): boolean { return this._loading }
    get pageNumber():number {return this._pageNumber}
    get totalPages():number {return this._totalPages}
    constructor(private readonly http: HttpClient) { }

    //!!Should be in different service
    /*  Function to update current component trainer-collectionlist to match the sessionStorage
        INPUT: Either a Pokemon-object to be added or null if we just want to update
        OUTPUT: Updated component- collectedPokemon-list
    */
    // public setCollection(pokemon?: Pokemon): void {
    //     if (pokemon) this._sessionStorageService.setTrainerCollection(pokemon)
    //     if (this._sessionStorageService.trainerCollection !== null) {
    //         this._collectedPokemons = JSON.parse(this._sessionStorageService.trainerCollection).collection;
    //     }
    // }

    /*  Function to update pokemons in case there was an important change
        INPUT: Array of Pokemon
        OUTPUT: Updated this._pokemons and this._sessionStoraveService.pokemons
    */
    public updatePokemons(pokemon: Pokemon) {
        this._pokemons[pokemon.index] = pokemon
        this._sessionStorageService.pokemons = this._pokemons
    }
    /*  Functions for pagination
        INPUT: None
        OUTPUT: Updated offset and pagenumbers, reloaded pokemons
    */
    public firstPage():void{
        if (this.pageNumber === 1) return
        this._pageNumber = 1
        this._offset = 0
        this.findAllPokemons()
    }
    public prevPage():void {
        if (this.pageNumber === 1) return
        this._pageNumber--;
        this._offset -= this._limit
        this.findAllPokemons() 
    }
    public nextPage():void {
        if (this._pageNumber === this._totalPages) return
        this._pageNumber++;
        this._offset += this._limit
        this.findAllPokemons() 
    }
    public lastPage():void{
        if (this.pageNumber === this._totalPages) return
        this._pageNumber = this._totalPages
        this._offset = this._limit * (this.pageNumber - 1)
        this.findAllPokemons()
    }
    /*  Function to retrieve all pokemons from the API
        INPUT: No input
        OUTPUT: Sets the pokemonlist in sessionStorage and pokemon-components if sessionStorage is empty,
        otherwise retrieves list from sessionStorageService so API doesn't get overloaded with requests
    */
    public findAllPokemons(url: string = `${apiPokemon}?limit=${this._limit}&offset=${this._offset}`): void {
        let storageList = this._sessionStorageService.pokemons
        // If there is an array of pokemons in sessionstorage on reload, load that.
        if (storageList !== null && url === null) this._pokemons = JSON.parse(storageList)
        else {
            this._pokemons = []
            this._loading = true
            this.http.get<any>(url)
                .pipe(
                    finalize(() => {
                        // Set small delay before loadingscreen is removed
                        setTimeout(() => {
                            this._loading = false
                        }, 150)
                        this._sessionStorageService.pokemons = this.pokemons;
                    })
                )
                .subscribe({
                    next: (response: { next: string, results: [{ name: string, url: string }] }) => {
                        let count = 0
                        for (const item of response.results) {
                            let splitURL = item.url.split('/')
                            let id = splitURL[splitURL.length - 2]
                            console.log(id)
                            let p = new Pokemon(item.name, id);
                            p.index = count;
                            count++;
                            this.pokemons.push(p);
                        }
                        this._totalPages = Math.ceil(1154 / this._limit)
                    },
                    error: (error: HttpErrorResponse) => {
                        this._error = error.message
                    }
                })
        }
    }

    // find pokemon by id
    public pokemonById(pokemonId: string): Pokemon | undefined {
        return this._pokemons.find((pokemon: Pokemon) => pokemon.name === pokemonId);
      }
}
