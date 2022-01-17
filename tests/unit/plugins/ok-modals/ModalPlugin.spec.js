import ModalPlugin from "../../../../src/plugins/ok-modals/ModalPlugin";
import Vue from "vue";
import { createLocalVue } from "@vue/test-utils";

let localVue;

describe("ModalPlugin", () => {
  beforeEach(() => {
    localVue = createLocalVue();
  });
  test("adds $modal to vue-prototype", () => {
    expect(localVue.prototype.$modal).toBeFalsy();
    localVue.use(ModalPlugin);
    expect(localVue.prototype.$modal).toEqual(expect.any(Object));
  });
  test("adds create, show, hide method to $modal", () => {
    localVue.use(ModalPlugin);
    expect(localVue.prototype.$modal.create).toEqual(expect.any(Function));
    expect(localVue.prototype.$modal.show).toEqual(expect.any(Function));
    expect(localVue.prototype.$modal.hide).toEqual(expect.any(Function));
  });
  test("has EventBus for transport events", () => {
    localVue.use(ModalPlugin);
    const isVue = ModalPlugin.EventBus instanceof Vue;
    expect(isVue).toBe(true);
  });
  test("sends event `create` to EventBus on create-method", () => {
    localVue.use(ModalPlugin);
    const spyOnEventBus = jest.spyOn(ModalPlugin.EventBus, "$emit");
    localVue.prototype.$modal.create({ test });
    expect(spyOnEventBus).toHaveBeenCalled();
    expect(spyOnEventBus).toHaveBeenCalledWith("create", { test });
  });
  test("sends event `show` to EventBus on show-method", () => {
    localVue.use(ModalPlugin);
    const spyOnEventBus = jest.spyOn(ModalPlugin.EventBus, "$emit");
    localVue.prototype.$modal.show("123");
    expect(spyOnEventBus).toHaveBeenCalled();
    expect(spyOnEventBus).toHaveBeenCalledWith("show", "123");
  });
  test("sends event `hide` to EventBus on hide-method", () => {
    localVue.use(ModalPlugin);
    const spyOnEventBus = jest.spyOn(ModalPlugin.EventBus, "$emit");
    localVue.prototype.$modal.hide("123");
    expect(spyOnEventBus).toHaveBeenCalled();
    expect(spyOnEventBus).toHaveBeenCalledWith("hide", "123");
  });
});
