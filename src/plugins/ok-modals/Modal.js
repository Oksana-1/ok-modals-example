import ObjectValidator from "./utils/ObjectValidator";

const noop = () => {};

export default class Modal {
	constructor(config) {
		this.id = config.id;
		this.modalComponent = config.modalComponent;
		this.isVisible = false;
		this.disabled = false;
		this.text = config.text ? config.text : "";
		this.onConfirm =
			config.onConfirm && typeof config.onConfirm === "function"
				? config.onConfirm
				: noop;
		this.onCancel =
			config.onCancel && typeof config.onCancel === "function"
				? config.onCancel
				: noop;
		this.props = config.props ? config.props : null;

		ObjectValidator.validate(this);
	}
	show() {
		this.isVisible = true;
	}
	hide() {
		this.isVisible = false;
	}
	disable() {
		this.disabled = true;
	}
	enable() {
		this.disabled = false;
	}
	get modalProps() {
		return {
			...this.props,
			id: this.id,
			isVisible: this.isVisible,
			disabled: this.disabled,
			text: this.text,
		};
	}
}
