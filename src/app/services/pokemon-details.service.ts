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
    private _abilities = ['']
    private _stats = ['']
    get stats():string[]{return this._stats}
    get abilities():string[]{return this._abilities}
    getDetails(pokemon:Pokemon, type:string) {
    this.http.get(`${apiPokemon}/${pokemon.id}/`)
        .pipe(
            finalize(() => {
                pokemon.abilities = this._abilities;
                pokemon.stats = this._stats;
                this.pokemonCatalogueService.updatePokemons(pokemon)
            })
        )
        .subscribe({
            next: (response: any) => {
                this._abilities = ['']
                this._stats =['']
                let stats = response.stats
                let abilities = response.abilities
                let string = ''
                for (const stat of stats) {
                    let statName = stat.stat.name.toUpperCase()
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
            private readonly pokemonCatalogueService:PokemonCatalogueService) { }
}