import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { TrainerCollectionService } from 'src/app/services/trainer-collection.service';
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
    return this.trainerCollectionService.loading;
  }

  constructor(
    private readonly userService: UserService,
    private readonly trainerCollectionService: TrainerCollectionService
  ) { }

  ngOnInit(): void {
    // Inputs are resolved!
    // runs only one time
    // this.inCollection = this.userService.inPokemonCollection(this.pokemonId);
  }

  addToCollectionClick(): void {
    // Add the guitar to the favorites!
    this.trainerCollectionService.addToCollection(this.pokemonId)
      .subscribe({
        next: (response: Trainer) => {
          console.log(this.pokemonId)
          console.log("NEXT", response)
        },
        error: (error: HttpErrorResponse) => {
          console.log("ERROR", error.message)
        }
      })
    
  }

}
