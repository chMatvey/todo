<template>
  <div class="todo_new-task">
    <input type="text" placeholder="Введите текст задачи..." v-model="description">
    <button class="todo_new-task-button" v-on:click="addTodo()">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24.5 12.25V14H14V24.5H12.25V14H1.75V12.25H12.25V1.75H14V12.25H24.5Z" fill="#CFCACA"/>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "AddTodo",
  data() {
    return {
      description: ''
    }
  },
  methods: {
    addTodo() {
      if (this.description) {
        this.$emit('add-todo', this.description)

        this.description = ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.todo_new-task {
  display: flex;
  height: 62px;
  border-bottom: 1px solid #D6C8C8;

  input {
    border: 0;
    font-size: 20px;
    padding: 20px;
    flex: 1;

    &::-webkit-input-placeholder {
      color: #CFCACA;
    }

    &:-ms-input-placeholder {
      color: #CFCACA;
    }

    &::-ms-input-placeholder {
      color: #CFCACA;
    }

    &::placeholder {
      color: #CFCACA;
    }

    &:focus {
      outline: none;
    }
  }

  &-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 74px;

    border: 0;
    background-color: transparent;

    &:focus {
      outline: none;
    }

    &:hover {
      background-color: #F6F3F3;
      cursor: pointer;

      svg {
        path {
          fill: #726464;
        }
      }
    }
  }
}
</style>
