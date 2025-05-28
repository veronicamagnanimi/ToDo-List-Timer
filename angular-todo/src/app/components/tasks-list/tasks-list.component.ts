import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent {

//input riceve la lista dei tasks dal genitore
@Input() tasks: Task[] = [];

//output comunica al genitore che è stato cliccato per completare od eliminare
@Output() toggleComplete = new EventEmitter<number>(); //number rappresenta l'id del task
@Output() deleteTask = new EventEmitter<number>(); //new eventemitter lancia un evento quando viene chiamato

//metodo per completare una task
 onToggle(id: number): void { //id è il numero identificativo della task
    this.toggleComplete.emit(id); //emette l'evento con l'id del task
  }

//metodo per eliminare una task
 onDelete(id: number): void {
  this.deleteTask.emit(id);
 }  

}
