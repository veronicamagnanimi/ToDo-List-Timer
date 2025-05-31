import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root' //guard disponibile in tutta l'app
})

export class AuthGuard implements CanActivate {

  //authservice e router nel costruttore per poterli usare nei metodi
  constructor(private authService: AuthService, private router: Router) {}

  //metodo che decide se la rotta puù essere attivata
  canActivate(): boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true; //se è autenticato, restituisco true
    } else {
      return this.router.createUrlTree(['/not-login']); //reindirizzo al login
      //urlTree è un oggetto che rappresenta una navigazione verso una certa rotta senza eseguire subito il redirect
    }
  }
}
