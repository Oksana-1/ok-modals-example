<template>
  <transition name="modal">
    <div class="modal-base-wrapper" v-if="isVisible">
      <div class="modal-base" :class="cssClass">
        <header>
          <slot name="header" />
        </header>
        <section>
          <slot name="body" />
        </section>
        <footer>
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalBase",
  props: {
    cssClass: {
      type: String,
      default: "default",
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
