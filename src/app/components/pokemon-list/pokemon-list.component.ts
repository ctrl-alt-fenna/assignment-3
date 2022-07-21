import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
    @Input() pokemons: Pokemon[] = [];
    @Output() updatePokemons = new EventEmitter<Pokemon[]>()
  constructor() { }

  ngOnInit(): void {
  }
  updatePokemon(pokemons:Pokemon[])
  {
    this.updatePokemons.next(pokemons);
  }

}
