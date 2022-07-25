
import { Injectable, Output } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _trainer?: Trainer; // User or undefined
  // private _showAnimation: boolean = false;
  // @Output() showAnimation!: boolean

  get trainer(): Trainer | undefined {return this._trainer;}

  set trainer(trainer: Trainer | undefined) {
    StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, trainer!); // ! user will never be undefined
    this._trainer = trainer;
  }

  // get showAnimation(): boolean {
  //   return this._showAnimation
  // }

  // set showAnimation(value: boolean) {
  //   this._showAnimation
  // }

  constructor() {
    const storedTrainer: Trainer | undefined = StorageUtil.storageRead<Trainer>(StorageKeys.Trainer);
    this._trainer = storedTrainer
  }

  public inPokemonCollection(pokemonName: string): boolean {
    if (this._trainer) {
      return Boolean(this.trainer?.pokemons.find((pokemon: Pokemon) => pokemon.name === pokemonName));
    }
    return false;
  }

  public addToCollection(pokemon: Pokemon): void {
    if (this._trainer) {
      this._trainer.pokemons.push(pokemon)
    }
  }

  public removeFromCollection(pokemonName: string): void {
    if (this._trainer) {
      this._trainer.pokemons = this._trainer.pokemons.filter((pokemon: Pokemon) => pokemon.name !== pokemonName)
    }

  }

  public removeTrainer() {
    StorageUtil.storageClearTrainer(StorageKeys.Trainer);
    this._trainer = undefined;
  }

}
