import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Trainer } from 'src/app/models/trainer.model';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  @Output() login: EventEmitter<void> = new EventEmitter();

  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService,
  ) { }

  public loginSubmit(loginForm: NgForm): void {
    // username
    const { username } = loginForm.value;

    this.loginService.login(username)
      .subscribe({
        next: (trainer: Trainer) => {
          // redirect to catalogue page
          this.userService.trainer = trainer;
          this.login.emit();
        },
        error: () => {
          // handle that locally

        }
      })
    
  }
}
