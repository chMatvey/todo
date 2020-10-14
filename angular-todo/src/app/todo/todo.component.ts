import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Todo } from './todo-item/todo-item.component'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {

  @ViewChild('newTodo') newTodoInput: ElementRef

  todos: Todo[] = [
    {
      id: 1,
      description: 'Изучить OnPush change detection',
      done: false
    },
    {
      id: 1,
      description: 'Сделать лабки',
      done: false
    },
    {
      id: 2,
      description: 'Задизигнить дизайн',
      done: true
    }
  ]

  lastId: number

  ngOnInit(): void {
    this.initLastId()
  }

  createNewTask(description: string): void {
    if (description) {
      this.todos = [
        {
          id: ++this.lastId,
          description,
          done: false
        },
        ...this.todos
      ]

      this.newTodoInput.nativeElement.value = ''
    }
  }

  private initLastId(): void {
    this.lastId = Math.max(...this.todos.map(todo => todo.id))
  }

  onRemove(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  onCheck(todo: Todo): void {
    const changedTodo = {
      id: todo.id,
      description: todo.description,
      done: !todo.done
    }
    const filteredTodos = this.todos.filter(t => t.id !== todo.id)

    this.todos = [...filteredTodos.filter(t => !t.done), changedTodo, ...filteredTodos.filter(t => t.done)]
  }
}
