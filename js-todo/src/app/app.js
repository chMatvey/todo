import { TodosContent } from "./todos-content/todos-content";
import { Todo } from "./todo";

export class App {
    #todos
    #todosContent
    #lastId

    constructor(model) {
        this.#todos = model
    }

    run() {
        this.#initLastId()

        this.#initTodoList()

        this.#initAddTodoEvent()
    }

    #initLastId() {
        this.#lastId = Math.max(...this.#todos.map(todo => todo.id))
    }

    #initTodoList() {
        this.#todosContent = new TodosContent('#todo-list',
            id => {
                const todo = this.#todos.find(todo => todo.id === id)
                const changedTodo = {
                    id: todo.id,
                    description: todo.description,
                    done: !todo.done
                }
                const filteredTodos = this.#todos.filter(todo => todo.id !== id)

                this.#todos = [...filteredTodos.filter(t => !t.done), changedTodo, ...filteredTodos.filter(t => t.done)]

                this.#todosContent.render(this.#todos)
            },
            id => {
                this.#todos = this.#todos.filter(todo => todo.id !== id)

                this.#todosContent.render(this.#todos)
            }
        )

        this.#todosContent.render(this.#todos)
    }

    #initAddTodoEvent() {
        document.querySelector('#todo-new-task-button')
            .addEventListener('click', this.#addTodo.bind(this))
    }

    #addTodo() {
        const newTodoInput = document.querySelector('#todo-new-task-input')
        const description = newTodoInput.value

        if (description) {
            this.#todos.unshift(new Todo(++this.#lastId, description, false))
            this.#todosContent.render(this.#todos)

            newTodoInput.value = ''
        }
    }
}
