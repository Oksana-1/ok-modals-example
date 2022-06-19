import { shallowMount } from "@vue/test-utils";
import App from "../../src/App";
import Vue from "vue";
import ModalPlugin from "ok-modals";
import ModalDialog from "../../src/modals/ModalDialog";
import flushPromises from "flush-promises";

Vue.use(ModalPlugin);

let wrapper;
let showModalButton;

describe("App.vue component", () => {
  beforeEach(() => {
    wrapper = shallowMount(App);
    showModalButton = wrapper.find('[data-test="show-modal-btn"]');
    jest.useFakeTimers();
  });
  afterEach(() => {
    showModalButton = undefined;
    jest.useRealTimers();
  });
  it("renders a button", () => {
    expect(showModalButton.exists()).toBe(true);
  });
  it("creates modal on a button click", async () => {
    const modalCreateSpyOn = jest.spyOn(wrapper.vm.$modal, "create");
    await showModalButton.trigger("click");
    expect(modalCreateSpyOn).toHaveBeenCalled();
    modalCreateSpyOn.mockRestore();
  });
  it("shows modal on a button click", async () => {
    const modalShowSpyOn = jest.spyOn(wrapper.vm.$modal, "show");
    await showModalButton.trigger("click");
    expect(modalShowSpyOn).toHaveBeenCalled();
    modalShowSpyOn.mockRestore();
  });
  it("renders ModalDialog component on button click", async () => {
    await showModalButton.trigger("click");
    expect(wrapper.findComponent(ModalDialog).exists()).toBe(true);
  });
  it("passed `isVisible`-prop to a ModalDialog correctly", async () => {
    await showModalButton.trigger("click");
    expect(wrapper.findComponent(ModalDialog).props("isVisible")).toBe(true);
  });
  it("displays `Confirmed!` text on ok-button click", async () => {
    await showModalButton.trigger("click");
    await wrapper.find('[data-test="modal-ok-btn"]').trigger("click");
    expect(wrapper.text()).toContain("Confirmed!");
  });
  it("hide modal on ok-button click", async () => {
    const modalHideSpyOn = jest.spyOn(wrapper.vm.$modal, "hide");
    await showModalButton.trigger("click");
    wrapper.find('[data-test="modal-ok-btn"]').trigger("click");
    expect(modalHideSpyOn).toHaveBeenCalled();
    modalHideSpyOn.mockRestore();
  });
  it("displays `Cancelled!` text on cancel-button click", async () => {
    await showModalButton.trigger("click");
    await wrapper.find('[data-test="modal-cancel-btn"]').trigger("click");
    jest.runAllTimers();
    await flushPromises();
    expect(wrapper.text()).toContain("Cancelled!");
  });
  it("hide modal on cancel-button click", async () => {
    const modalHideSpyOn = jest.spyOn(wrapper.vm.$modal, "hide");
    await showModalButton.trigger("click");
    await wrapper.find('[data-test="modal-cancel-btn"]').trigger("click");
    jest.runAllTimers();
    expect(modalHideSpyOn).toHaveBeenCalled();
    modalHideSpyOn.mockRestore();
  });
});
