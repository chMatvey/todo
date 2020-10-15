import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Todo } from './todo-item/todo-item.component'
import { animate, query, style, transition, trigger } from '@angular/animations'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('todo', [
      transition('* => void', [
        query('.todo_list-item',
          animate(500, style({
            opacity: 0
          }))
        )
      ])
    ])
  ]
})
export class TodoComponent implements OnInit {

  @ViewChild('newTodo') newTodoInput: ElementRef

  todos: Todo[] = [
    {
      id: 1,
      description: 'Сделать презентацию',
      done: false,
    },
    {
      id: 2,
      description: 'Сделать лабки',
      done: false
    },
    {
      id: 3,
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

  onRemove(todo: Todo): void {
    this.todos = this.todos.filter(t => t.id !== todo.id)
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
