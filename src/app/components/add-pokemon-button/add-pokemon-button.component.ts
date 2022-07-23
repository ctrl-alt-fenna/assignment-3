import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerService } from 'src/app/services/trainer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-pokemon-button',
  templateUrl: './add-pokemon-button.component.html',
  styleUrls: ['./add-pokemon-button.component.css']
})
export class AddPokemonButtonComponent implements OnInit {

  public inCollection: boolean = false;
  // make sure the favourite button knows which pokemon is clicked
  @Input() pokemonId: string = "";

  get loading(): boolean {
    return this.trainerService.loading;
  }

  constructor(
    private readonly userService: UserService,
    private readonly trainerService: TrainerService
  ) { }

  ngOnInit(): void {
    // Inputs are resolved!
    // runs only one time
    // this.inCollection = this.userService.inPokemonCollection(this.pokemonId);
  }

  addToCollectionClick(): void {
    // Add the guitar to the favorites!
    this.trainerService.addToCollection(this.pokemonId)
      .subscribe({
        next: (response: Trainer) => {
          console.log("NEXT", response)
        },
        error: (error: HttpErrorResponse) => {
          console.log("ERROR", error.message)
        }
      })
    
  }

}
