<template>
  <div class="todo-row">
    <div>{{item.title}}</div>
    <div>
      <label for="taskStatus">
        <input id="taskStatus" type="checkbox" v-model="taskStatus">
      </label>
    </div>
    <div>
      <button>delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    item: Object
  },
  data() {
    return {
      taskStatus: false
    }
  }
}
</script>

<style scoped>
    .todo-row {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
</style>