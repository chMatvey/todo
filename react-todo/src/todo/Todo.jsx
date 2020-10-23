import React from 'react'
import { TodoItem } from "./todo-item/TodoItem";
import { AddTodo } from "./add-todo/AddTodo";

export const Todo = () => {
    const [todos, setTodos] = React.useState([
        {
            id: 1,
            description: 'Сделать презентацию',
            done: false
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
        },
        {
            id: 4,
            description: 'Implement drag and drop todo list',
            done: true
        },
        {
            id: 5,
            description: 'Implement todo list',
            done: true
        }
    ])

    const [lastId, setLastId] = React.useState(Math.max(...todos.map(todo => todo.id)))

    const onToggleCheck = todo => {
        const changedTodo = {
            ...todo,
            done: !todo.done
        }

        setTodos(prevTodos => {
            const filteredTodos = prevTodos.filter(t => t.id !== todo.id)
            return [...filteredTodos.filter(t => !t.done), changedTodo, ...filteredTodos.filter(t => t.done)]
        })
    }

    const onToggleRemove = id => {
        setTodos(prevTodos => prevTodos.filter(t => t.id !== id))
    }

    const onToggleAddTodo = description => {
        const newTodo = {
            id: lastId + 1,
            description,
            done: false
        }

        setTodos(prevTodos => [
            newTodo,
            ...prevTodos
        ])
        setLastId(newTodo.id)
    }

    return (
        <div className="todo">
            <div className="todo_header">
                <h4>Список задач</h4>
            </div>

            <AddTodo onToggleAddTodo={onToggleAddTodo}/>

            <div id="todo-list" className="todo_list">
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggleCheck={onToggleCheck}
                        onToggleRemove={onToggleRemove}
                    />
                ))}
            </div>
        </div>
    )
}
