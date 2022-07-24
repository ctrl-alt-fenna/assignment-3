import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Component, Input, Output, OnInit } from '@angular/core';
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
    @Input() pokemonName: string = "";
    @Output() changeClass = new EventEmitter<boolean>()
    get loading(): boolean {
        return this.trainerCollectionService.loading;
    }

    constructor(
        private readonly userService: UserService,
        private readonly trainerCollectionService: TrainerCollectionService
    ) { }

    ngOnInit(): void {
        // Make sure to set collect anitmation if the pokemon is in collection
        this.inCollection = this.userService.inPokemonCollection(this.pokemonName);
        if (this.inCollection) this.changeClass.emit()
    }

    addToCollectionClick(): void {
        // Add the pokemon to the collection!
        this.trainerCollectionService.addToCollection(this.pokemonName)
        .subscribe({
            next: (response: Trainer) => {
                    // toegevoegd in filmpje 014, is dat nodig?????
                    this.inCollection = this.userService.inPokemonCollection(this.pokemonName);
                    this.changeClass.emit()
                    console.log("NEXT", response)
                },
                error: (error: HttpErrorResponse) => {
                    console.log("ERROR", error.message)
                }
            })

    }

}
