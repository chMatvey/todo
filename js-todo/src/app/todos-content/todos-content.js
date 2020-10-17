import { getElementWithId, HtmlElementWrapper } from "../util";
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
            this.$element.insertAdjacentHTML('beforeend', `
                <div id="todo-item-${todo.id}" class="todo_list-item${todo.done ? ' completed' : ''}" draggable="true">
                    <div id="check-todo-${todo.id}" class="todo_list-item-check">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1212 0.401444C10.327 0.145214 10.6047 0.00100945 10.8944 5.27951e-06C11.1841 -0.000998889 11.4624 0.141278 11.6693 0.396078C11.8762 0.650878 11.9949 0.997727 11.9998 1.36164C12.0048 1.72555 11.8955 2.07728 11.6957 2.34078L5.82705 11.5573C5.72619 11.6938 5.60445 11.8033 5.46913 11.8793C5.3338 11.9553 5.18766 11.9963 5.03944 11.9998C4.89123 12.0032 4.74398 11.9691 4.60651 11.8994C4.46903 11.8297 4.34416 11.7259 4.23934 11.5942L0.350925 6.70707C0.242598 6.58025 0.155712 6.42732 0.0954499 6.2574C0.0351876 6.08748 0.00278364 5.90405 0.00017159 5.71805C-0.00244046 5.53205 0.024793 5.3473 0.0802466 5.17481C0.1357 5.00232 0.218238 4.84564 0.322937 4.7141C0.427636 4.58256 0.55235 4.47886 0.68964 4.40919C0.82693 4.33952 0.973983 4.3053 1.12203 4.30858C1.27007 4.31186 1.41607 4.35258 1.55132 4.42829C1.68657 4.504 1.80829 4.61316 1.90923 4.74926L4.98762 8.61501L10.0933 0.442079C10.1024 0.427771 10.1122 0.414199 10.1227 0.401444H10.1212Z" fill="white"/>
                        </svg>
                    </div>
                    <p>${todo.description}</p>
                    <div id="remove-todo-${todo.id}" class="todo_list-item-remove">
                        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.6667 5.75H11.4133C11.5526 5.75 11.6667 5.6375 11.6667 5.5V5.75H21.2963V5.5C21.2963 5.6375 21.4103 5.75 21.5497 5.75H21.2963V8H23.577V5.5C23.577 4.39688 22.6679 3.5 21.5497 3.5H11.4133C10.2951 3.5 9.38597 4.39688 9.38597 5.5V8H11.6667V5.75ZM27.6316 8H5.33139C4.77072 8 4.31775 8.44688 4.31775 9V10C4.31775 10.1375 4.43178 10.25 4.57116 10.25H6.48442L7.26682 26.5938C7.31751 27.6594 8.21078 28.5 9.29095 28.5H23.672C24.7554 28.5 25.6455 27.6625 25.6962 26.5938L26.4786 10.25H28.3918C28.5312 10.25 28.6452 10.1375 28.6452 10V9C28.6452 8.44688 28.1923 8 27.6316 8ZM23.4281 26.25H9.53485L8.76828 10.25H24.1947L23.4281 26.25Z" fill="#A3CDFF"/>
                        </svg>
                    </div>
                </div>
            `)

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

            const selectedElementCoordinates = selectedElement.getBoundingClientRect()
            const selectedElementCenterPosition = selectedElementCoordinates.y + selectedElementCoordinates.height / 2

            const currentElementCoordinates = currentElement.getBoundingClientRect()
            const currentElementCenterPosition = currentElementCoordinates.y + currentElementCoordinates.height / 2

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
                    if (cursorPosition > currentElementCenterPosition) {
                        this.$element.insertBefore(selectedElement, currentElement)
                        this.elementChangedPosition = true
                    }
                    break;
                }
            }
        }
    }
}
