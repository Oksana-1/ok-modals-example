import ModalPlugin from "./ModalPlugin";
import Vue from "vue";
import Modal from "./Modal";

const ModalsWrapper = Vue.component("ModalsWrapper", {
	data() {
		return {
			modals: [],
			activeModal: null,
		};
	},
	methods: {
		createModal(config) {
			if (this.isInModalsArray(config.id)) return;
			this.modals.push(new Modal(config));
		},
		showModal(id) {
			if (typeof id === "object")
				throw new Error("Method expects an id as a parameter!");
			const targetModal = this.modals.find((modal) => modal.id === id);
			if (!targetModal) throw new Error(`Modal with id="${id}" was not found!`);
			targetModal.show();
			targetModal.enable();
			this.activeModal = targetModal;
		},
		hideModal(id) {
			if (typeof id === "object")
				throw new Error("Method expects an id as a parameter!");
			const targetModal = this.modals.find((modal) => modal.id === id);
			if (!targetModal) throw new Error(`Modal with id="${id}" was not found!`);
			targetModal.hide();
		},
		isInModalsArray(id) {
			return Boolean(this.modals.find((modal) => modal.id === id));
		},
	},
	render(createElement) {
		return this.activeModal
			? createElement(this.activeModal.modalComponent, {
				props: { ...this.activeModal.modalProps },
				on: {
					...this.$listeners,
					confirm: async () => {
						this.activeModal.disable();
						try {
							await this.activeModal.onConfirm();
						} finally {
							this.activeModal.enable();
						}
					},
					cancel: async () => {
						this.activeModal.disable();
						try {
							await this.activeModal.onCancel();
						} finally {
							this.activeModal.enable();
						}
					},
				},
			})
			: null;
	},
	created() {
		ModalPlugin.EventBus.$on("show", (id) => this.showModal(id));
		ModalPlugin.EventBus.$on("hide", (id) => this.hideModal(id));
		ModalPlugin.EventBus.$on("create", (config) => this.createModal(config));
	},
	beforeDestroy() {
		ModalPlugin.EventBus.$off("show", (id) => this.showModal(id));
		ModalPlugin.EventBus.$off("hide", (id) => this.hideModal(id));
		ModalPlugin.EventBus.$off("create", (config) => this.createModal(config));
	},
});
export default ModalsWrapper;
