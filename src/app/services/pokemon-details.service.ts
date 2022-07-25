import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { Pokemon } from '../models/pokemon.model';
const apiPokemon = environment.apiPokemon;
@Injectable({
    providedIn: 'root'
})
export class PokemonDetailsService {
    private _abilities:string[] = ['']
    private _stats:string[] = ['']
    private _loading:boolean = false;
    get stats(): string[] { return this._stats }
    get abilities(): string[] { return this._abilities }
    get loading():boolean {return this._loading}
    /*  Function to retrieve additional details of specific Pokémon
        INPUT: A pokemon object
        OUTPUT: An updated abilities and stats array for that Pokémon (handled at the same time to avoid
        double the load to the PokeAPI for no reason)
    */
    getDetails(pokemon: Pokemon) {
        this._loading = true;
        this.http.get(`${apiPokemon}/${pokemon.id}/`)
            .pipe(
                finalize(() => {
                    pokemon.abilities = this.abilities;
                    pokemon.stats = this.stats;
                    this.pokemonCatalogueService.updatePokemons(pokemon)
                    this._loading = false;
                })
            )
            .subscribe({
                next: (response: any) => {
                    this._abilities = ['']
                    this._stats = ['']
                    let stats = response.stats
                    let abilities = response.abilities
                    let string = ''
                    for (const stat of stats) {
                        let statName = stat.stat.name[0].toUpperCase() + stat.stat.name.substring(1)
                        string = statName + ": " + stat.base_stat
                        this._stats.push(string)
                    }
                    for (const ability of abilities) {
                        let abilityName = ability.ability.name[0].toUpperCase() + ability.ability.name.substring(1)
                        this._abilities.push(abilityName)
                    }
                }
            })
    }
    constructor(private readonly http: HttpClient,
        private readonly pokemonCatalogueService: PokemonCatalogueService) { }
}