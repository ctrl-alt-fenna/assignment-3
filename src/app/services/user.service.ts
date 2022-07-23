
import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _trainer?: Trainer; // User or undefined

  get trainer(): Trainer | undefined {
    return this._trainer;
  }

  set trainer(trainer: Trainer | undefined) {
    StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, trainer!); // ! user will never be undefined
    this._trainer = trainer;
  }

  constructor() {

    const storedTrainer: Trainer | undefined = StorageUtil.storageRead<Trainer>(StorageKeys.Trainer);
    this._trainer = storedTrainer
    // andere schrijfwijze
    // this._user  = StorageUtil.storageRead<User>(StorageKeys.User);
  }

  public inPokemonCollection(pokemonId: string): boolean {
    if (this._trainer) {
      return Boolean(this.trainer?.pokemons.find((pokemon: Pokemon) => pokemon.id === pokemonId));
    }
    return false;
  }

}
