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
    @Output() removedFromCollection = new EventEmitter<Pokemon>()
  constructor() { }

  updatePokemon(pokemons:Pokemon)
  {
    this.updatePokemons.emit(pokemons)
  }
  onAddedToCollection(pokemon:Pokemon)
  {
    this.addedToCollection.emit(pokemon)
  }
  onRemovedFromCollection(pokemon:Pokemon)
  {
    this.removedFromCollection.emit(pokemon)
  }
  ngOnInit(): void {  }
}
