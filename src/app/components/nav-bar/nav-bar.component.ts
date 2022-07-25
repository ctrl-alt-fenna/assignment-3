import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { UserService } from 'src/app/services/user.service';
import { StorageUtil } from '../../utils/storage.util';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public isLoggedIn: boolean = false;

  // get loggedIn(): boolean {
  //   return this.isLoggedIn
  // } 

  toggleLoggedIn(): boolean {
    if (this.userService.trainer) {
      return this.isLoggedIn = true;
    } else {
      return this.isLoggedIn = false;
    }
  }

  constructor( 
    private readonly router: Router,
    private readonly userService: UserService
    )  { }

  handleLogout() {
    this.userService.removeTrainer()
    this.router.navigateByUrl('/login')
    this.toggleLoggedIn()
    console.log(this.isLoggedIn)
    // this.isLoggedIn = false;
    // console.log(this.isLoggedIn)
  }

  ngOnInit(): void {
  }

}
