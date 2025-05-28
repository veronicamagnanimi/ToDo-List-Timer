import { Component, OnInit } from '@angular/core';
import { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-todo';
  tasks: Task[] = []; //array che contiene tutte le task

  //metodo che viene chiamato all'inizializzazione del componente
  ngOnInit(): void {
    const saved = localStorage.getItem('tasks'); //recupero le task salvate in localStorage
    if (saved) { //se esistono, le converto in un array di task
      this.tasks = JSON.parse(saved);
    }
  }

  //metodo per aggiungere una nuova task
  addTask(task: Task): void { 
    this.tasks.push(task); //aggiungo all'array
    this.save(); //salvo l'array aggiornato in localStorage
  }

  //metodo per cambiare lo stato di completamento
  toggleComplete(id: number): void {
    const task = this.tasks.find(t => t.id === id); //find trova la task con l'id specificato
    if (task) {
      task.completed = !task.completed; //inverto il valore di completed
      this.save();
    }
  }

  //metodo per eliminare una task
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id); //filter crea un nuovo array senza la task con l'id specificato
    this.save();
  }

  //metodo che controlla se tutte le task sono completate
  allCompleted(): boolean {
    return this.tasks.length > 0 && this.tasks.every(t => t.completed); //restituisce true solo se ci sono task e sono tutte completate
  }

  //metodo per salvare in localStorage
  save(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks)); //converto l'array in stringa e lo salvo
  }
}
