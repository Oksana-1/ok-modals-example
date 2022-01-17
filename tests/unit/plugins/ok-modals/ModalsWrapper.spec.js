import ModalsWrapper from "../../../../src/plugins/ok-modals/ModalsWrapper";
import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import ModalPlugin from "../../../../src/plugins/ok-modals/ModalPlugin";

Vue.use(ModalPlugin);

let wrapper;

describe("ModalsWrapper", () => {
  beforeEach(() => {
    wrapper = shallowMount(ModalsWrapper);
  });
  test("returns a ModalsWrapper component", () => {
    expect(wrapper.exists()).toBe(true);
  });
  test.todo("runs `show` method on `create`-event in ModalPlugin.EventBus");
  test.todo("passes custom props correctly");
  test.todo("passes custom events correctly");
  test.todo("runs `show` method on `hide`-event in ModalPlugin.EventBus");
  test.todo("runs `show` method on `show`-event in ModalPlugin.EventBus");
});
