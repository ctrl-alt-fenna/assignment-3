// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// const LIMIT = 1154;
export const environment = {
  production: false,
  apiPokemon: `https://pokeapi.co/api/v2/pokemon`,
  apiSprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon",
  STORAGE_POKEMON_KEY: "pokemon-list",
  STORAGE_COLLECTION_KEY: "trainer-collection",
  STORAGE_USER_ID: '0'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
