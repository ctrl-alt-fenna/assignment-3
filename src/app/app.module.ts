import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonListItemComponent } from './components/pokemon-list-item/pokemon-list-item.component';
import { LoginPage } from './pages/login/login.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AddPokemonButtonComponent } from './components/add-pokemon-button/add-pokemon-button.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    TrainerPage,
    LoginFormComponent,
    NavBarComponent,
    PokemonCataloguePage,
    PokemonListComponent,
    PokemonListItemComponent,
    AddPokemonButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
