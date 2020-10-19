<template>
  <Todo/>
</template>

<script>
import Todo from "@/components/todo/Todo";

export default {
  name: 'App',
  components: {
    Todo: Todo
  }
}
</script>

<style>
body {
  background-color: #F6F3F3;
  font-family: 'Roboto', sans-serif;
}

p, h4 {
  margin: 0;
}
</style>
