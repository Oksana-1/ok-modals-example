<template>
  <div class="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>TODO list</h1>
    <div class="app-container">
      <todo-list />
    </div>
    <button @click="showModal">Show modal</button>
    <app-modal />
  </div>
</template>

<script>
import TodoList from "@/components/TodoList";

export default {
  name: "App",
  components: {
    TodoList,
  },
  methods: {
    showModal() {
      const params = {
        title: "Test!",
        text: "test test test",
        onConfirm: () => {
          return this.alertFunc();
        },
      };
      this.$modal.show(params);
    },
    alertFunc() {
      alert("Hello!");
    },
  },
};
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.app-container {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
