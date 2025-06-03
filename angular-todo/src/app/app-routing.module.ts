import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; //importa il guard per la protezione delle rotte
import { TasksComponent } from './components/tasks/tasks.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotLoginComponent } from './components/not-login/not-login.component';
import { NotFoundComponent } from './components/not-found/not-found.component'; 

const routes: Routes = [
  {path: '', component: HomeComponent}, //rotta per il componente principale home
  {path: 'tasks', component: TasksComponent, canActivate: [AuthGuard]}, //rotta per il componente tasks
  {path: 'login', component: LoginComponent }, //rotta per il login
  {path: 'not-login', component: NotLoginComponent }, //se non sei loggato
  {path: '**', component: NotFoundComponent } //rotta per pagina non trovata
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
