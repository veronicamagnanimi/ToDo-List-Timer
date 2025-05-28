import { Component, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-tasks-input',
  templateUrl: './tasks-input.component.html',
  styleUrls: ['./tasks-input.component.css'],
})
export class TasksInputComponent {
  taskText: string = ''; //inizializzo la variabile come stringa vuota

  //emetto l'evento verso il componente genitore quando si aggiunge una nuova task
  @Output() taskAdded = new EventEmitter<Task>();

  onSubmit(): void { //chiamo il metodo quando il form viene inviato
    if (this.taskText.trim()) { //se il testo non è vuoto
      //creo un nuovo task basato sul timestamp
      const newTask: Task = {
        id: Date.now(),
        text: this.taskText.trim(),
        completed: false, //inizialmente non completato
      };
      this.taskAdded.emit(newTask); //emetto la nuova task 
      this.taskText = ''; //svuoto l'input dopo l'invio
    }
  }

  //onkeydown per gestire l'invio con il tasto enter
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSubmit(); //chiamo il metodo 
    }
  }}
