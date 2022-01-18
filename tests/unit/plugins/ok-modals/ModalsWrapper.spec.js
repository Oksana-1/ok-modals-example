import ModalsWrapper from "../../../../src/plugins/ok-modals/ModalsWrapper";
import { mount } from "@vue/test-utils";
import Vue from "vue";
import ModalPlugin from "../../../../src/plugins/ok-modals/ModalPlugin";

Vue.use(ModalPlugin);

const FakeComponent = Vue.component("FakeComponent", {
  render(createElement) {
    return createElement("div", {
      class: { fake: true }
    });
  },
  props: {
    myCustomProps: String
  }
});

let wrapper;
const mockedCustomEvent = jest.fn();

describe("ModalsWrapper", () => {
  beforeEach(() => {
    wrapper = mount(ModalsWrapper, {
      listeners: {
        myCustomEvent: mockedCustomEvent
      }
    });
  });
  test("returns a ModalsWrapper component", () => {
    expect(wrapper.exists()).toBe(true);
  });
  test("runs `createModal` method on `create`-event from ModalPlugin.EventBus", async () => {
    const createSpyOn = jest.spyOn(wrapper.vm, "createModal");
    await ModalPlugin.EventBus.$emit("create", {
      id: "testId",
      modalComponent: FakeComponent
    });
    expect(createSpyOn).toHaveBeenCalled();
    createSpyOn.mockRestore();
  });
  test("runs `showModal` method on `show`-event from ModalPlugin.EventBus", async () => {
    const showSpyOn = jest.spyOn(wrapper.vm, "showModal");
    await ModalPlugin.EventBus.$emit("create", {
      id: "testId",
      modalComponent: FakeComponent
    });
    await ModalPlugin.EventBus.$emit("show", "testId");
    expect(showSpyOn).toHaveBeenCalled();
    showSpyOn.mockRestore();
  });
  test("throws an error on `showModal`-method if no id passed", async () => {
    const consoleSpyOn = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    await ModalPlugin.EventBus.$emit("create", {
      id: "testId",
      modalComponent: FakeComponent
    });
    await ModalPlugin.EventBus.$emit("show");
    expect(consoleSpyOn).toHaveBeenCalled();
    consoleSpyOn.mockRestore();
  });
  test("throws an error on `showModal`-method if wrong id passed", async () => {
    const consoleSpyOn = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    await ModalPlugin.EventBus.$emit("create", {
      id: "testId",
      modalComponent: FakeComponent
    });
    await ModalPlugin.EventBus.$emit("show", { id: "testId" });
    expect(consoleSpyOn).toHaveBeenCalled();
    consoleSpyOn.mockRestore();
  });
  test("throws an error on `showModal`-method if id is not found", async () => {
    const consoleSpyOn = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    await ModalPlugin.EventBus.$emit("create", {
      id: "testId",
      modalComponent: FakeComponent
    });
    await ModalPlugin.EventBus.$emit("show", "testId1");
    expect(consoleSpyOn).toHaveBeenCalled();
    consoleSpyOn.mockRestore();
  });
  test("runs `hideModal` method on `hide`-event from ModalPlugin.EventBus", async () => {
    const hideSpyOn = jest.spyOn(wrapper.vm, "hideModal");
    await ModalPlugin.EventBus.$emit("create", {
      id: "testId",
      modalComponent: FakeComponent
    });
    await ModalPlugin.EventBus.$emit("show", "testId");
    await ModalPlugin.EventBus.$emit("hide", "testId");
    expect(hideSpyOn).toHaveBeenCalled();
    hideSpyOn.mockRestore();
  });
  test("throws an error on `hideModal`-method if no id passed", async () => {
    const consoleSpyOn = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    await ModalPlugin.EventBus.$emit("create", {
      id: "testId",
      modalComponent: FakeComponent
    });
    await ModalPlugin.EventBus.$emit("hide");
    expect(consoleSpyOn).toHaveBeenCalled();
    consoleSpyOn.mockRestore();
  });
  test("throws an error on `hideModal`-method if wrong id passed", async () => {
    const consoleSpyOn = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    await ModalPlugin.EventBus.$emit("create", {
      id: "testId",
      modalComponent: FakeComponent
    });
    await ModalPlugin.EventBus.$emit("hide", { id: "testId" });
    expect(consoleSpyOn).toHaveBeenCalled();
    consoleSpyOn.mockRestore();
  });
  test("throws an error on `hideModal`-method if id is not found", async () => {
    const consoleSpyOn = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    await ModalPlugin.EventBus.$emit("create", {
      id: "testId",
      modalComponent: FakeComponent
    });
    await ModalPlugin.EventBus.$emit("hide", "testId1");
    expect(consoleSpyOn).toHaveBeenCalled();
    consoleSpyOn.mockRestore();
  });
  test("renders passed component correctly", async () => {
    await ModalPlugin.EventBus.$emit("create", {
      id: "testId",
      modalComponent: FakeComponent
    });
    await ModalPlugin.EventBus.$emit("show", "testId");
    expect(wrapper.find(".fake").exists()).toBe(true);
  });
  test("passes custom props correctly", async () => {
    await ModalPlugin.EventBus.$emit("create", {
      id: "testId",
      modalComponent: FakeComponent,
      props: {
        myCustomProps: "test"
      }
    });
    await ModalPlugin.EventBus.$emit("show", "testId");
    expect(wrapper.findComponent(FakeComponent).props("myCustomProps")).toBe(
      "test"
    );
  });
  test("passes custom events correctly", async () => {
    await ModalPlugin.EventBus.$emit("create", {
      id: "testId",
      modalComponent: FakeComponent
    });
    await ModalPlugin.EventBus.$emit("show", "testId");
    await wrapper
      .findComponent(FakeComponent)
      .vm.$emit("myCustomEvent", "event");
    expect(mockedCustomEvent).toHaveBeenCalled();
    expect(mockedCustomEvent).toHaveBeenCalledWith("event");
  });
});
