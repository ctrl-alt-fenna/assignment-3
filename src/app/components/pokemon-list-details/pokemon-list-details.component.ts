import { Component,Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonDetailsService } from 'src/app/services/pokemon-details.service';
@Component({
  selector: 'app-pokemon-list-details',
  templateUrl: './pokemon-list-details.component.html',
  styleUrls: ['./pokemon-list-details.component.css']
})
export class PokemonListDetailsComponent implements OnInit {
  @Input() pokemon! : Pokemon;
  public showAbilities:boolean = false;
  public showStats:boolean = false;
  constructor(private pokemonDetailsService: PokemonDetailsService) { }

  ngOnInit(): void {
  }
  foldStats():void {
    if (this.showAbilities) this.showAbilities = false;
    else {
      this.pokemonDetailsService.getDetails(this.pokemon)
    }
    this.showStats = !this.showStats;
  }
  foldAbilities():void {
    if (this.showStats) this.showStats = false;
    else {
      this.pokemonDetailsService.getDetails(this.pokemon)
    }
    this.showAbilities = !this.showAbilities;
  }

}
