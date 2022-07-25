import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Trainer } from '../models/trainer.model';

const { apiTrainers, apiKey } = environment

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	private _loading:boolean = false
	public get loading() {return this._loading}
	constructor(private readonly http: HttpClient) { }

	/*	Function to login user
	  	INPUT: Username string, retrieved from input field in form
		OUTPUT: Retrieved/created user in API
	*/
	public login(username: string): Observable<Trainer> {
		this._loading = true;
		return this.checkUsername(username)
			.pipe(
				switchMap((trainer: Trainer | undefined) => {
					this._loading = false;
					if (trainer === undefined) {
						return this.createUser(username);
					}
					return of(trainer);
				})
			)
	}

	// Check if user exists
	private checkUsername(username: string): Observable<Trainer | undefined> {
		return this.http.get<Trainer[]>(`${apiTrainers}?username=${username}`)
			.pipe(
				// RxJS Operators
				map((response: Trainer[]) => {
					return response.pop();
				})
			)
	}

	// Create a User
	private createUser(username: string): Observable<Trainer> {
		// create empty trainer
		const trainer = {
			username,
			pokemons: []
		};
		// create headers -> API Key
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'x-api-key': apiKey
		})
		// POST - create items
		return this.http.post<Trainer>(apiTrainers, trainer, {
			headers
		})
	}

	// IF User || Created User - Store user
}
