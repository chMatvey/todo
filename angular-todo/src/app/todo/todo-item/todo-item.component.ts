import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

export interface Todo {
  id?: number
  description: string
  done: boolean
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
  remove = new EventEmitter<number>()

  @Output()
  check = new EventEmitter<Todo>()

  get description(): string {
    console.log('Run change detection')
    return this.todo.description;
  }
}
