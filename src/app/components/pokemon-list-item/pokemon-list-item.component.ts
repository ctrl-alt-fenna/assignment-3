import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-pokemon-list-item',
    templateUrl: './pokemon-list-item.component.html',
    styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent implements OnInit {
    public details:boolean = false
    @Input() pokemon!: Pokemon
    setSrc(){
        this.pokemon.avatar = `${environment.apiSprites}/0.png`
    }
    // Function that inverts current selection of showing/hiding details
    setDetails(){
        this.details = !this.details
    }
    constructor() { }

    ngOnInit(): void {
    }

}
