import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Pokemon } from 'src/app/models/pokemon.model'
import { environment } from 'src/environments/environment'
@Component({
    selector: 'app-pokemon-list-item',
    templateUrl: './pokemon-list-item.component.html',
    styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent implements OnInit {
    public showstats: boolean = false
    public showabilities: boolean = false
    public collected: boolean = false
    @Input() pokemon!: Pokemon
    @Input() collectedPokemon?: string[]
    @Output() updatePokemon = new EventEmitter<Pokemon>()
    @Output() addedToCollection = new EventEmitter<Pokemon>()
    @Output() removedFromCollection = new EventEmitter<Pokemon>()
    /* Function that gets called if the image cannot be found on first retrieval,
       so it can be updated in the pokemon sessionStorage list as the default (0.png) image 
    */
    setSrc() {
        this.pokemon.avatar = `${environment.apiSprites}/0.png`
        this.updatePokemon.emit(this.pokemon)
    }
    // Function that inverts current selection of showing/hiding details
    showStats() {
        if (this.showabilities) this.showabilities = false
        this.showstats = !this.showstats
    }
    showAbilities() {
        if (this.showstats) this.showstats = false
        this.showabilities = !this.showabilities
    }
    /*  Function to deal with collection-clicks
        INPUT: The card that was clicked on
        OUTPUT: A removal or addition of the given pokemon in all collectedPokemon 
        instances (sessionStorage & component)*/
    collectionChange() {
        if (this.collectedPokemon !== undefined && this.collectedPokemon !== null) {
            if (this.collectedPokemon.indexOf(this.pokemon.name) === -1) 
                this.addedToCollection.emit(this.pokemon)
            else this.removedFromCollection.emit(this.pokemon)
        }
        else this.addedToCollection.emit(this.pokemon)
        this.collected = !this.collected;
    }
    constructor() { }

    ngOnInit(): void {
        // Check if we need to flag pokemoncard as collected based on currrently saved collection
        if (this.collectedPokemon !== undefined && this.collectedPokemon !== null) {
            if (this.collectedPokemon.indexOf(this.pokemon.name) !== -1) {
                this.collected = true;
            }
        }
    }

}
