import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
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
    @Input() pokemons: Pokemon[] = []
    @Input() stats?: string[]
    @Input() abilities?: string[]
    @Input() collectedPokemons?: string[]
    @Output() updatePokemons = new EventEmitter<Pokemon>()

  constructor() { }
  updatePokemon(pokemon_:Pokemon)
  {
    this.updatePokemons.emit(pokemon_)
  }
  // onViewStats(pokemon:Pokemon)
  // {
  //   this.viewStats.emit(pokemon);
  // }y
  // onViewAbilities(pokemon:Pokemon)
  // {
  //   this.viewAbilities.emit(pokemon);
  // }
  ngOnInit(): void {  }
}
