<template>
  <div class="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>Modal plugin example</h1>
    <button class="btn green" @click="showModal" data-test="show-modal-btn">Show modal</button>
    <p v-if="info">{{ info }}</p>
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
        onConfirm: this.immediateConfirm,
        onCancel: this.delayCancel,
      },
      info: ""
    };
  },
  methods: {
    showModal() {
      this.info = "";
      this.$modal.create(this.params);
      this.$modal.show(this.params.id);
    },
    immediateConfirm() {
      this.$modal.hide(this.params.id);
      this.info = "Confirmed!";
    },
    delayCancel() {
      return new Promise(resolve => {
        setTimeout(() => {
          this.info = "Cancelled!";
          this.$modal.hide(this.params.id);
          resolve();
        }, 1000);
      });
    }
  }
};
</script>
