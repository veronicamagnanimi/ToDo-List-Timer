import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  timer: number = 0; //inizializza il timer a 0
  private intervalId: any; //variabile per salvare l'id dell'intervallo

  //logout
   constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    //recupero il valore da sessionStorage al primo avvio
    const storedTime = sessionStorage.getItem('time'); //prendo il valore 'time'
    if (storedTime) { //se esiste, lo converto in numero e lo assegno al timer
      this.timer = parseInt(storedTime, 10);
    }

    //inizia il timer che incrementa ogni secondo
    this.intervalId = setInterval(() => { //salvo l'id dell'intervallo
      this.timer++; //incremento di 1
      sessionStorage.setItem('time', this.timer.toString()); //salvo il valore aggiornato in sessionStorage
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId); //importante per fermare il timer quando il componente viene distrutto
  }

   logout(): void {
    this.authService.logout(); //chiamo il metodo logout del servizio
  }

}
