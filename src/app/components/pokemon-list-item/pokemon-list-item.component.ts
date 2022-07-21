import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { environment } from 'src/environments/environment';
import { SessionStorageService } from 'src/app/services/session-storage.service';
@Component({
    selector: 'app-pokemon-list-item',
    templateUrl: './pokemon-list-item.component.html',
    styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent implements OnInit {
    public showstats:boolean = false
    public showabilities:boolean = false
    public collected:boolean = false;
    private sessionStorage:SessionStorageService = new SessionStorageService()
    @Input() pokemon!: Pokemon
    @Output() updatePokemon = new EventEmitter<Pokemon[]>()
    setSrc(){
        this.pokemon.avatar = `${environment.apiSprites}/0.png`;
        let p = JSON.parse(this.sessionStorage.pokemons)
        let n = this.pokemon.index 
        p[n] = this.pokemon
        this.updatePokemon.next(p);
    }
    // Function that inverts current selection of showing/hiding details
    showStats(){   
        if (this.showabilities) this.showabilities = false
        this.showstats = !this.showstats
    }
    showAbilities(){
        if (this.showstats) this.showstats = false
        this.showabilities = !this.showabilities
    }
    addToCollection(){
        this.collected = !this.collected;
    }
    constructor() { }
    
    ngOnInit(): void {
    }

}
