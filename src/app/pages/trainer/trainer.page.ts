import { Component } from '@angular/core';
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

  // getter for favourites
  // get favourites(): Guitar[] {
  //   if(this.userService.user) {
  //     return this.userService.user.favourites;
  //   }
  //   return [];
  // }

  constructor(
    private userService: UserService
  ) { }

}
