<template>
  <div class="todo">
    <div class="todo_header">
      <h4>Список задач</h4>
    </div>

    <div class="todo_new-task">
      <input type="text" placeholder="Введите текст задачи...">
      <button class="todo_new-task-button">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24.5 12.25V14H14V24.5H12.25V14H1.75V12.25H12.25V1.75H14V12.25H24.5Z" fill="#CFCACA"/>
        </svg>
      </button>
    </div>

    <div class="todo_list">
      <TodoItem
          v-for="todo of todos"
          v-bind:todo="todo"
          v-bind:key="todo.id"
      />
    </div>
  </div>
</template>

<script>
import TodoItem from "@/components/todo/todo-item/TodoItem";

export default {
  name: "Todo",
  data() {
    return {
      todos: [
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
      ]
    }
  },
  components: {
    TodoItem: TodoItem
  }
}
</script>

<style scoped>

</style>
