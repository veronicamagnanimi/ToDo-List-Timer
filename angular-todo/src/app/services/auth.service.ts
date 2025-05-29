// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly fakeToken = '1234567890abcdef'; //token fittizio

  constructor(private router: Router) {} //router nel costruttore per poterlo usare nei metodi

  //metodo per il login, riceve username e password
  login(username: string, password: string): boolean {
    //credenziali finte
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('authToken', this.fakeToken); //salvo il token finto nel localStorage
      return true;
    }
    return false; //se le credenziale sono sbagliate, restituisco false
  }

  //metodo per il logout, rimuovo il token dal localStorage e reindirizzo alla home
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

  //metodo per verificare se l'utente è autenticato, controllo se il token salvato corrisponde a quello finto
  isAuthenticated(): boolean {
    return localStorage.getItem('authToken') === this.fakeToken;
  }
}
