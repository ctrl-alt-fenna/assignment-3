import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  get loggedIn(): boolean {
    return (this.userService.trainer !== undefined)
  } 

  constructor( 
    private readonly router: Router,
    private readonly userService: UserService
    )  { }

  handleLogout() {
    this.userService.removeTrainer()
    this.router.navigateByUrl('/login')
  }

  ngOnInit(): void {
  }

}
