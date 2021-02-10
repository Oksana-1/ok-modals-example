<template>
  <div class="modal-wrapper" v-if="visible">
    <div class="modal-overlay"></div>
    <div class="modal-container">
      <h2>{{ title }}</h2>
      <p>{{ text }}</p>
      <div class="modal-buttons">
        <button class="modal-button" @click="hide">Close</button>
        <button class="modal-button" @click="confirm">Confirm</button>
      </div>
    </div>
  </div>

</template>

<script>
import Modal from "@/plugins/modals/modal";

export default {
  name: "AppModal",
  data() {
    return {
      visible: false,
      title: "",
      text: "",
      onConfirm: {},
    };
  },
  methods: {
    hide() {
      this.visible = false;
    },
    confirm() {
      if (typeof this.onConfirm === "function") {
        this.onConfirm();
        this.hide();
      } else {
        this.hide();
      }
    },
    show(params) {
      this.visible = true;
      this.title = params.title;
      this.text = params.text;
      this.onConfirm = params.onConfirm;
    },
  },
  beforeMount() {
    Modal.EventBus.$on("show", (params) => {
      this.show(params);
    });
    Modal.EventBus.$on('hide', (params) => {
      this.hide(params);
    })
  },
};
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.modal-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 300px;
  height: 200px;
  z-index: 1000;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.modal-buttons {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
}
.modal-button {
  flex-grow: 1;
}
</style>
