import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PokemonCataloguePage } from "./pages/pokemon-catalogue/pokemon-catalogue.page";
const routes:Routes = [
    {

        path:"",
        component: PokemonCataloguePage
    },
    {
        path: "pokemons",
        component: PokemonCataloguePage
    }
]
@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{};