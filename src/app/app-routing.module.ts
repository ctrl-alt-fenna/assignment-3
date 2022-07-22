import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPage } from "./pages/login/login.page";
import { TrainerPage } from "./pages/trainer/trainer.page";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "/login"
    },
    {
        path: "login",
        component: LoginPage
    },
    // {
    //     path: "pokemons",
    //     component: 
    // },
    {
        path: "trainer",
        component: TrainerPage
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ], // Import a module
    exports: [
        RouterModule
    ] // Expose module and it's features

})
export class AppRoutingModule {

}