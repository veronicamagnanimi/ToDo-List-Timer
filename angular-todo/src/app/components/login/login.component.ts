import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //variabili inizialmente vuote ed errore falso
  username = '';
  password = '';
  error = false;

  //aggiungo nel costruttore i servizi per poterli usare nei metodi
  constructor(private authService: AuthService, private router: Router) { }

  //metodo per il login che chiama il servizio di autenticazione
    login() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/tasks']);
    } else {
      this.error = true;
    }
  }
  //se è autenticato, vado alla pagina delle tasks, altrimenti mostro un messaggio di errore

}
