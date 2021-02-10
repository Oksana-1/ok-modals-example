<template>
  <div>
    <todo-item
        v-for="(item, index) in items"
        :key="`todo-${index}`"
        :item="item" />
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem";
export default {
  name: "TodoList",
  components: {
    TodoItem,
  },
  data() {
    return {
      items: [
        {
          title: 'Walk with dog',
          done: false
        }
      ],
    };
  },
};
</script>

<style scoped></style>