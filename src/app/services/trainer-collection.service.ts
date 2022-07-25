import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { UserService } from './user.service';

const { apiKey, apiTrainers } = environment;

@Injectable({
  providedIn: 'root'
})
export class TrainerCollectionService {
  constructor(
    private http: HttpClient,
    private readonly pokemonService: PokemonCatalogueService,
    private readonly userService: UserService
  ) { }

  	/*	Function to add Pokémon to trainercollection based on name
        INPUT: Pokémon name
        OUTPUT: Updated trainercollection in sessionstorage/API */
  public addToCollection(pokemonName: string): Observable<Trainer> {

    if (!this.userService.trainer) {
      throw new Error('addToCollection: There is no trainer');
    }

    const trainer: Trainer = this.userService.trainer;
    let pokemon: Pokemon | undefined = this.pokemonService.pokemonByName(pokemonName) === undefined ?
    this.userService.findPokemon(pokemonName) : this.pokemonService.pokemonByName(pokemonName);
    if (!pokemon) {
    throw new Error('addToCollection: No pokemon with name: ' + pokemonName);
    }

    if (this.userService.inPokemonCollection(pokemonName)) {
      this.userService.removeFromCollection(pokemonName)
    } else {
      this.userService.addToCollection(pokemon)
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    })


    // Patch request with the trainerId and the pokemon
    return this.http.patch<Trainer>(`${apiTrainers}/${trainer.id}`, {
      pokemons: [...trainer.pokemons]
    }, {
      headers
    })
    .pipe(
      // cause a side effect
      tap((updatedTrainer: Trainer) => {
        this.userService.trainer = updatedTrainer;
      })

    )
  }


}
