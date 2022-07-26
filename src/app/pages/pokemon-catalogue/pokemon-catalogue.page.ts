import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { PokemonDetailsService } from 'src/app/services/pokemon-details.service';
import { UserService } from 'src/app/services/user.service';
@Component({
    selector: 'app-pokemon-catalogue',
    templateUrl: './pokemon-catalogue.page.html',
    styleUrls: ['./pokemon-catalogue.page.css']
})
export class PokemonCataloguePage implements OnInit {

    constructor(
        private readonly pokemonCatalogueService: PokemonCatalogueService,
        private readonly pokemonDetailService: PokemonDetailsService,
        private readonly userService: UserService
    ) { }

    public showAnimation = true;

    get pokemons(): Pokemon[] {
        return this.pokemonCatalogueService.pokemons;
    }
    get loading(): boolean {
        return this.pokemonCatalogueService.loading
    }
    get error(): string {
        return this.pokemonCatalogueService.error;
    }

    ngOnInit(): void {
        this.pokemonCatalogueService.findAllPokemons();
    }
    /*  Functions to deal with child-component user interactions
        INPUT: pokemon object
        OUTPUT: updated Pokemons list / trainer collection
    */
    updatePokemon(pokemon: Pokemon): void {this.pokemonCatalogueService.updatePokemons(pokemon);}
}
