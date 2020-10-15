import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core'

export interface Todo {
  id?: number
  description: string
  done: boolean
  removed?: boolean
}

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
  @Input()
  todo: Todo

  @Output()
  remove = new EventEmitter<Todo>()

  @Output()
  check = new EventEmitter<Todo>()

  constructor(private cdr: ChangeDetectorRef) {
  }

  get description(): string {
    console.log('Run change detection')
    return this.todo.description;
  }

  onRemove(todo: Todo): void {
    todo = {...todo, removed: true}
    this.remove.emit(this.todo)
  }
}
