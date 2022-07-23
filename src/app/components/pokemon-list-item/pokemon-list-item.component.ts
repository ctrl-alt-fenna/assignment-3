import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Pokemon } from 'src/app/models/pokemon.model'
import { environment } from 'src/environments/environment'
@Component({
    selector: 'app-pokemon-list-item',
    templateUrl: './pokemon-list-item.component.html',
    styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent implements OnInit {
    // public showstats: boolean = false
    // public showabilities: boolean = false
    public collected:boolean = false
    public wasCollected:boolean = false
    @Input() pokemon!: Pokemon
    @Input() collectedPokemon?: string[]
    @Output() updatePokemon = new EventEmitter<Pokemon>()

    /* Function that gets called if the image cannot be found on first retrieval,
       so it can be updated in the pokemon sessionStorage list as the default (0.png) image 
    */
    setSrc() {
        this.pokemon.avatar = `${environment.apiSprites}/0.png`
        this.updatePokemon.emit(this.pokemon)
    }
    // Function to change html-classes for animations
    changeClass(){
        this.collected = true;
    }
    constructor() { }

    ngOnInit(): void {
    }

}
