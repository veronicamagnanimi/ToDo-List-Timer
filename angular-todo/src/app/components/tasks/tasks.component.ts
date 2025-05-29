import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  taskText: string = ''; //variabile del testo nell'input
  tasks: Task[] = []; //array che contiene tutte le tasks, inizialmente vuoto

  //metodo chiamato quando il componente viene inizializzato
  ngOnInit(): void {
    const saved = localStorage.getItem('tasks'); //recupero le tasks salvate in localStorage
    if (saved) { //se esistono, converto da stringa ad array e assegno a tasks
      this.tasks = JSON.parse(saved);
    }
  }

  //metodo chiamato quando il form viene inviato
  onSubmit(): void {
    if (this.taskText.trim()) { //se il testo non è vuoto
      const newTask: Task = {
        id: Date.now(), //id univoco basato sul timestamp
        text: this.taskText.trim(), //testo della task rimuovendo spazi
        completed: false, //la nuova task non è completata
      };
      this.tasks.push(newTask); //aggiungo all'array
      this.taskText = ''; //svuoto l'input dopo l'invio
      this.save(); //salvo le tasks in localStorage
    }
  }

  //metodo per lo stato di completamento
  toggleComplete(id: number): void {
    const task = this.tasks.find((t) => t.id === id); //con find trovo la task con l'id specificato
    if (task) { //se esiste, inverto il valore di completed
      task.completed = !task.completed;
      this.save();
    }
  }

  //metodo per eliminare una task
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((t) => t.id !== id); //con filter creo un nuovo array senza la task con l'id specificato
    this.save();
  }

  //metodo che controlla se tutte le tasks sono completate
  allCompleted(): boolean {
    //restituisce true solo se ci sono tasks e sono tutte completate
    return this.tasks.length > 0 && this.tasks.every((t) => t.completed);
  }

  //metodo per salvare in localStorage
  save(): void { //converto l'array in stringa e lo salvo
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
