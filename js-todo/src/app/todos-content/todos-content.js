import { getCenterPosition, getElementWithId, HtmlElementWrapper, todoHtml } from "../util";
import { Todo } from "../todo";

const DragDirection = Object.freeze({
    DOWN: 'down',
    UP: 'up'
})

export class TodosContent {
    constructor(selector, checkCallback, removeCallback, updateModelCallback) {
        this.$element = document.querySelector(selector)
        this.checkCallback = checkCallback
        this.removeCallback = removeCallback
        this.updateModelCallback = updateModelCallback
    }

    render(todos) {
        this.$element.innerHTML = ''

        todos.sort(todo => todo.done ? 1 : -1).forEach(todo => {
            this.$element.insertAdjacentHTML('beforeend', todoHtml(todo))

            document.querySelector(`#check-todo-${todo.id}`)
                .addEventListener('click', this.check.bind(this))
            document.querySelector(`#remove-todo-${todo.id}`)
                .addEventListener('click', this.remove.bind(this))

            new HtmlElementWrapper(`#todo-item-${todo.id}`)
                .addEventListener('dragstart', this.dragStart.bind(this))
                .addEventListener('dragend', this.dragEnd.bind(this))
                .addEventListener('dragover', this.dragOver.bind(this))
        })
    }

    check(event) {
        const id = Number(getElementWithId(event).id.replace('check-todo-', ''))
        this.checkCallback(id)
    }

    remove(event) {
        const id = Number(getElementWithId(event).id.replace('remove-todo-', ''))
        this.removeCallback(id)
    }

    dragStart(event) {
        event.target.classList.add('selected')

        this.elementChangedPosition = false
    }

    dragEnd(event) {
        event.target.classList.remove('selected')

        if (this.elementChangedPosition) {
            const todos = [...document.querySelectorAll('.todo_list-item')]
                .map(element => new Todo(
                    Number(element.id.replace('todo-item-', '')),
                    element.querySelector('p').textContent,
                    element.classList.contains('completed')
                ))

            this.updateModelCallback(todos)
        }
    }

    dragOver(event) {
        event.preventDefault()

        const selectedElement = this.$element.querySelector('.selected');
        const currentElement = getElementWithId(event)

        const isMovable = selectedElement !== currentElement && currentElement.classList.contains(`todo_list-item`);
        const isSameDoneStatus = selectedElement.classList.contains('completed') ?
            currentElement.classList.contains('completed') : !currentElement.classList.contains('completed');

        if (isMovable && isSameDoneStatus) {
            const cursorPosition = event.clientY
            const selectedElementCenterPosition = getCenterPosition(selectedElement)
            const currentElementCenterPosition = getCenterPosition(currentElement)

            const dragDirection = selectedElementCenterPosition > currentElementCenterPosition ? DragDirection.UP : DragDirection.DOWN

            switch (dragDirection) {
                case DragDirection.DOWN: {
                    if (cursorPosition > currentElementCenterPosition) {
                        this.$element.insertBefore(currentElement, selectedElement)
                        this.elementChangedPosition = true
                    }
                    break;
                }
                case DragDirection.UP: {
                    if (cursorPosition < currentElementCenterPosition) {
                        this.$element.insertBefore(selectedElement, currentElement)
                        this.elementChangedPosition = true
                    }
                    break;
                }
            }
        }
    }
}
