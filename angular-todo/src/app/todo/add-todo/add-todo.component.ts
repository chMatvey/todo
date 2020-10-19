import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core'

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {

  @ViewChild('newTodo')
  private newTodoInput: ElementRef

  @Output()
  private addNew = new EventEmitter<string>()

  createNewTask(description: string): void {
    const parsedDescription = description.trim()
    if (parsedDescription) {
      this.addNew.emit(parsedDescription)
      this.newTodoInput.nativeElement.value = ''
    }
  }
}
