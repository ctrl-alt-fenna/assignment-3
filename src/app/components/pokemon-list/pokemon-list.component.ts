import { Component, Input, OnInit,} from '@angular/core'
import { Pokemon } from 'src/app/models/pokemon.model'
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
    public limit:number = 50
    public offset:number = 0
    @Input() pokemons!:Pokemon[]
    @Input() showAnimation: boolean = false

  constructor() { }
  ngOnInit(): void {  }
}
