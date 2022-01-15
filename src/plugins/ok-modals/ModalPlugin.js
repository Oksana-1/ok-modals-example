import ModalsWrapper from "./ModalsWrapper";
const ModalPlugin = {
	install(Vue) {
		this.EventBus = new Vue();
		Vue.component("modals-wrapper", ModalsWrapper);
		Vue.prototype.$modal = {
			create(config) {
				ModalPlugin.EventBus.$emit("create", config);
			},
			show(id) {
				ModalPlugin.EventBus.$emit("show", id);
			},
			hide(id) {
				ModalPlugin.EventBus.$emit("hide", id);
			},
		};
	},
};

export default ModalPlugin;
