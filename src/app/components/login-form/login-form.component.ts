import { Component, EventEmitter, Input, Output } from '@angular/core';
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
    @Input() loading: boolean = false;
    constructor(
        private readonly loginService: LoginService,
        private readonly userService: UserService,
    ) { }
    /*  Function to deal with user login
        INPUT: ngForm object of loginForm
        OUTPUT: user added as trainer to sessionstorage and API
    */
    public loginSubmit(loginForm: NgForm): void {
        // username
        const { username } = loginForm.value;
        this.loading = true;
        this.loginService.login(username)
            .subscribe({
                next: (trainer: Trainer) => {
                    // redirect to catalogue page
                    this.userService.trainer = trainer;
                    this.login.emit();
                    this.loading = false;
                },
            })

    }
}

