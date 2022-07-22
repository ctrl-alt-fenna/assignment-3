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
  // Dependency Injection
  constructor(private readonly http: HttpClient) { }

  // Login
  public login(username: string): Observable<Trainer> {
    return this.checkUsername(username)
      .pipe(
        switchMap((trainer: Trainer | undefined) => {
          if (trainer === undefined) {
            return this.createUser(username);
          }
          return of (trainer);
        })
      )
  }

  // Check if user exists
  private checkUsername(username: string): Observable<Trainer | undefined> {
    return this.http.get<Trainer[]>(`${apiTrainers}?username=${username}`)
    .pipe(
      // RxJS Operators
      map((response: Trainer[]) => {
        // take the last item on the array and return back into the map. 
        // and then return value will be the single user
        // zie notitie voor andere/korte schrijfwijze
        return response.pop(); 
      })
    )
  }

  // Create a User
  private createUser(username: string): Observable<Trainer> {
    // create user
    const trainer = {
      username,
      pokemons: []
    };
    // create headers -> API Key
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    })
    // POST - create items
    return this.http.post<Trainer>(apiTrainers, trainer, {
      headers
    })
  }

  // IF User || Created User - Store user
}
