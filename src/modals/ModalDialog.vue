<template>
  <modal-base :isVisible="isVisible">
    <template slot="body">
      <div class="text">
        <p class="f-20 centered margin-b-35" v-html="text"></p>
      </div>
    </template>
    <template slot="footer">
      <div class="centered">
        <button
            class="btn margin-side-5"
            :disabled="disabled"
            @click="$emit('confirm')"
            data-test="modal-ok-btn"
        >
          OK
        </button>
        <button
            class="btn margin-side-5"
            :disabled="disabled"
            @click="$emit('cancel')"
            data-test="modal-cancel-btn"
        >
          Cancel
        </button>
      </div>
    </template>
  </modal-base>
</template>

<script>
import ModalBase from "./ModalBase";

export default {
  name: "ModalDialog",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "Confirm action",
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  components: { ModalBase },
};
</script>
