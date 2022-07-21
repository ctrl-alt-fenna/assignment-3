import { Injectable } from '@angular/core'
import { Pokemon } from '../models/pokemon.model'
import { environment } from 'src/environments/environment'
const STORAGE_POKEMON_KEY = environment.STORAGE_POKEMON_KEY
const STORAGE_COLLECTION_KEY = environment.STORAGE_COLLECTION_KEY
const STORAGE_USER_ID = environment.STORAGE_USER_ID
@Injectable({
    providedIn: 'root'
})
export class SessionStorageService {
    /*  Functions to set, get or clear list of pokemons in sessionStorage so the API doesn't get overloaded
        set-INPUT: Array of Pokemon objects to be added/retrieved
        get-OUTPUT: Stringified Pokemon object(s)
    */
    public set pokemons(newpokemons: Pokemon[]) {
        sessionStorage.setItem(STORAGE_POKEMON_KEY, JSON.stringify(newpokemons))
    }
    public get pokemons(): any {
        return sessionStorage.getItem(STORAGE_POKEMON_KEY)
    }
    public get trainerCollection(): any{
        return sessionStorage.getItem(STORAGE_COLLECTION_KEY)
    }
    /*  Function to update trainercollection in sessionStorage
        INPUT: Pokemon object containt Pokemon to be added
        OUTPUT: New collection in sessionStorage
    */
    public setTrainerCollection(updatePokemon: Pokemon) {
        let storageCollection = sessionStorage.getItem(STORAGE_COLLECTION_KEY)
        // Checks if there isn't any collection yet, so it can add a new one
        if (!storageCollection) 
            storageCollection = JSON.stringify({userid: STORAGE_USER_ID, collection: [updatePokemon.name]})
         else {
            let collection = JSON.parse(storageCollection)
            const index = collection.collection.indexOf(updatePokemon.name)
            // Pokemon wasn't yet collected so add it
            if (index === -1) 
                collection.collection.push(updatePokemon.name)
            // Pokemon was collected so splice array to remove it
            else collection.collection = collection.collection.splice(index - 1, 1)
            storageCollection = JSON.stringify(collection)
         }
        sessionStorage.setItem(STORAGE_COLLECTION_KEY, storageCollection)
    }
    // DEBUG function
    public clearStorage(): void {
        sessionStorage.clear()
    }
    constructor() { }
}
