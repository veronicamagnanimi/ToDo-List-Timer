import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-login',
  templateUrl: './not-login.component.html',
  styleUrls: ['./not-login.component.css']
})
export class NotLoginComponent {

  constructor(private router: Router) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

}
