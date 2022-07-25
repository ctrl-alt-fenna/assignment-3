import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Trainer } from 'src/app/models/trainer.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage {

  get trainer(): Trainer | undefined {
    return this.userService.trainer;
  }

  // getter for pokemons
  get pokemons(): Pokemon[] {

    if(this.userService.trainer) {
      return this.userService.trainer.pokemons;
    }
    
    return [];
  }

  constructor(
    private userService: UserService
  ) { }

}
