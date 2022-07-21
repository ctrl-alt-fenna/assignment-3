import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Pokemon } from 'src/app/models/pokemon.model'
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
    @Input() pokemons: Pokemon[] = []
    @Input() collectedPokemons?: string[]
    @Output() updatePokemons = new EventEmitter<Pokemon>()
    @Output() addedToCollection = new EventEmitter<Pokemon>()
  constructor() { }

  ngOnInit(): void {
  }
  updatePokemon(pokemons:Pokemon)
  {
    this.updatePokemons.emit(pokemons)
  }
  onaddedToCollection(pokemon:Pokemon)
  {
    this.addedToCollection.emit(pokemon)
  }
}
