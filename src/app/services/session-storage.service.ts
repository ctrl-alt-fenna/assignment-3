import { Injectable } from '@angular/core'
import { Pokemon } from '../models/pokemon.model'
import { StorageKeys } from '../enums/storage-keys.enum';
import { StorageUtil } from '../utils/storage.util';
@Injectable({
    providedIn: 'root'
})
export class SessionStorageService {
    /*  Functions to set or get list of pokemons in sessionStorage so the API doesn't get overloaded
        set-INPUT: Array of Pokemon objects to be added/retrieved
        get-OUTPUT: Stringified Pokemon object(s)
    */
    public set pokemons(newpokemons: Pokemon[]) {
        StorageUtil.storageSave(StorageKeys.PokemonItem, JSON.stringify(newpokemons))
    }
    public get pokemons(): any {
        return StorageUtil.storageRead(StorageKeys.PokemonItem)
    }

    constructor() { }
}
