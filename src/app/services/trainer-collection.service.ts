import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { UserService } from './user.service';

const { apiKey, apiPokemon, apiTrainers } = environment;

@Injectable({
  providedIn: 'root'
})
export class TrainerCollectionService {
  private _loading: boolean = false;

  get loading(): boolean {
    return this._loading;
  }

  constructor(
    private http: HttpClient,
    private readonly pokemonService: PokemonCatalogueService,
    private readonly userService: UserService
  ) { }

  // Get the pokemon based on the Name.
  public addToCollection(pokemonName: string): Observable<Trainer> {

    if (!this.userService.trainer) {
      throw new Error("addToCollection: There is no trainer");
    }

    const trainer: Trainer = this.userService.trainer;
    const pokemon: Pokemon | undefined = this.pokemonService.pokemonByName(pokemonName);

    if (!pokemon) {
      throw new Error("addToCollection: No pokemon with name: " + pokemonName);
    }

    if (this.userService.inPokemonCollection(pokemonName)) {
      // throw new Error("addToCollection: Pokemon already in collection");
      this.userService.removeFromCollection(pokemonName)
    } else {
      this.userService.addToCollection(pokemon)
    }

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    })

    this._loading = true;

    // Patch request with the trainerId and the pokemon
    return this.http.patch<Trainer>(`${apiTrainers}/${trainer.id}`, {
      // add new pokemon to current values in trainer object --> weggehaald , {name: pokemon.name, avatar: pokemon.avatar}
      pokemons: [...trainer.pokemons]
    }, {
      headers
    })
    .pipe(
      // cause a side effect
      tap((updatedTrainer: Trainer) => {
        this.userService.trainer = updatedTrainer;
      }),
      finalize(() => {
        this._loading = false;
      })

    )
  }


}
