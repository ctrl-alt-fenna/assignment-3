import { Component, Input, OnInit,} from '@angular/core'
import { Pokemon } from 'src/app/models/pokemon.model'
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
    public limit:number = 50
    public current:number = 0
    public offset:number = this.current
    @Input() pokemons!:Pokemon[]

  constructor() { }
  ngOnInit(): void {  }
}
