import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
@Component({
    selector: 'app-pokemon-catalogue',
    templateUrl: './pokemon-catalogue.page.html',
    styleUrls: ['./pokemon-catalogue.page.css']
})
export class PokemonCataloguePage implements OnInit {
    constructor(
        private readonly pokemonCatalogueService: PokemonCatalogueService,
    ) { }
    get pageNumber(): number {
        return this.pokemonCatalogueService.pageNumber;
    }
    get totalPages(): number {
        return this.pokemonCatalogueService.totalPages;
    }
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
    loadFirst():void {

        this.pokemonCatalogueService.firstPage()
    }
    loadPrev(): void {
        this.pokemonCatalogueService.prevPage()
    }
    loadNext(): void {
        this.pokemonCatalogueService.nextPage()
    }
    loadLast():void {
        this.pokemonCatalogueService.lastPage()
    }

}
