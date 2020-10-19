<template>
  <div class="todo">
    <div class="todo_header">
      <h4>Список задач</h4>
    </div>

    <AddTodo v-on:add-todo="createNewTodo($event)"/>

    <div class="todo_list">
      <TodoItem
          v-for="todo of todos"
          :todo="todo"
          :key="todo.id"
          v-on:check="onCheck(todo)"
          v-on:remove="onRemove(todo.id)"
      />
    </div>
  </div>
</template>

<script>
import TodoItem from "@/components/todo/todo-item/TodoItem";
import AddTodo from "@/components/todo/add-todo/AddTodo";

export default {
  name: "Todo",
  data() {
    return {
      lastId: 0,
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
  mounted() {
    this.lastId = Math.max(...this.todos.map(todo => todo.id))
  },
  methods: {
    createNewTodo(description) {
      this.todos = [
        {
          id: ++this.lastId,
          description,
          done: false
        },
        ...this.todos
      ]
    },

    onCheck(todo) {
      const changedTodo = {
        ...todo,
        done: !todo.done
      }
      const filteredTodos = this.todos.filter(t => t.id !== todo.id)

      this.todos = [...filteredTodos.filter(t => !t.done), changedTodo, ...filteredTodos.filter(t => t.done)]
    },

    onRemove(id) {
      this.todos = this.todos.filter(t => t.id !== id)
    }
  },
  components: {
    TodoItem: TodoItem,
    AddTodo: AddTodo
  }
}
</script>

<style scoped lang="scss">
.todo {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 520px;
  height: 550px;
  background-color: #FFF;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  //overflow: auto;
  border: 1px solid #CCC2C2;

  &_header {
    background: #4B95EB;
    padding: 20px;

    h4 {
      display: flex;
      justify-content: center;
      align-items: center;

      color: #FFF;
      font-size: 26px;
      font-weight: 500;
    }
  }

  &_list {
    height: calc(550px - 71px - 62px);
    overflow-y: auto;

    /* Width */
    &::-webkit-scrollbar {
      width: 7px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #83BCFF;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #4B95EB;
    }
  }
}
</style>
