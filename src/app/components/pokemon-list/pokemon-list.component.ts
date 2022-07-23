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
    @Output() viewStats = new EventEmitter<Pokemon>()
    @Output() viewAbilities = new EventEmitter<Pokemon>()
  constructor() { }
  updatePokemon(pokemons:Pokemon)
  {
    this.updatePokemons.emit(pokemons)
  }
  onViewStats(pokemon:Pokemon)
  {
    this.viewStats.emit(pokemon);
  }
  onViewAbilities(pokemon:Pokemon)
  {
    this.viewAbilities.emit(pokemon);
  }
  ngOnInit(): void {  }
}
