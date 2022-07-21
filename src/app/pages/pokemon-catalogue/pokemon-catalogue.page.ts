import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
@Component({
    selector: 'app-pokemon-catalogue',
    templateUrl: './pokemon-catalogue.page.html',
    styleUrls: ['./pokemon-catalogue.page.css']
})
export class PokemonCataloguePage implements OnInit {

    get pokemons(): Pokemon[] {
        return this.pokemonCatalogueService.pokemons;
    }
    get collectedPokemon(): any {
        return this.pokemonCatalogueService.collectedPokemons;
    }
    get loading(): boolean {
        return this.pokemonCatalogueService.loading;
    }
    get error(): string {
        return this.pokemonCatalogueService.error;
    }
    constructor(
        private readonly pokemonCatalogueService: PokemonCatalogueService
    ) { }

    ngOnInit(): void {
        this.pokemonCatalogueService.findAllPokemons();
        this.pokemonCatalogueService.setCollection();
    }
    /*  Functions to deal with child-component user interactions
        INPUT: pokemon object
        OUTPUT: updated Pokemons list / trainer collection
    */
    updatePokemon(pokemon: Pokemon): void {
        this.pokemonCatalogueService.updatePokemons(pokemon);
    }
    onAddedToCollection(pokemon: Pokemon): void {
        this.pokemonCatalogueService.setCollection(pokemon)
    }
    onRemovedFromCollection(pokemon: Pokemon): void {
        this.pokemonCatalogueService.setCollection(pokemon)
    }

}
