<template>
  <div class="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>Modal plugin example</h1>
    <button class="btn green" @click="showModal">Show modal</button>
    <modals-wrapper />
  </div>
</template>

<script>
import ModalDialog from "./modals/ModalDialog";
import "./style.css";

export default {
  name: "App",
  data() {
    return {
      params: {
        id: "Test",
        modalComponent: ModalDialog,
        text: "test test test",
        onConfirm: () => {
          this.immediateConfirm();
        },
        onCancel: () => {
          this.delayCancel();
        }
      }
    }
  },
  methods: {
    showModal() {
      this.$modal.create(this.params);
      this.$modal.show(this.params.id);
    },
    immediateConfirm() {
      alert("Confirmed");
      this.$modal.hide(this.params.id);
    },
    delayCancel() {
      return new Promise(resolve => {
        setTimeout(() => {
          alert("Cancelled!");
          this.$modal.hide(this.params.id);
          resolve();
        }, 1000);
      });
    }
  }
};
</script>
