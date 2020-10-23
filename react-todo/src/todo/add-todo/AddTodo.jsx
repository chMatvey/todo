import React, { useRef } from 'react'

export const AddTodo = ({onToggleAddTodo}) => {
    const descriptionInput = useRef(null)

    const handleAddTodoClick = () => {
        if (descriptionInput.current.value) {
            onToggleAddTodo(descriptionInput.current.value)
        }
    }

    return (
        <div className="todo_new-task">
            <input ref={descriptionInput} id="todo-new-task-input" type="text" placeholder="Введите текст задачи..."/>
            <button id="todo-new-task-button" className="todo_new-task-button"
                    onClick={handleAddTodoClick}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.5 12.25V14H14V24.5H12.25V14H1.75V12.25H12.25V1.75H14V12.25H24.5Z"
                          fill="#CFCACA"/>
                </svg>
            </button>
        </div>
    )
}
