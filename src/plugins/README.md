# Modal Plugin

1. Register plugin in the root js-file
```vue
import Vue from "vue";
import ModalPlugin from "@/plugins/modal/ModalPlugin";
...
Vue.use(ModalPlugin);
...
new Vue({ ... })
```
2. Use `<modals-wrapper />` inside vue-component as a root modal-component (no need to import and register it, plugin does it globally).
3. To create/show/hide modal:
```vue
import ModalDialog from "@/ui/modals/ModalDialog";
methods: {
  ...
  myShowModalFn() {
    this.$modal.create({
      // The names of properties do matter!
      id: "foo", // Required, unique, string or number
      modalComponent: ModalDialog, // Required, vue-component
      text: "Lorem ipsum", // Optional
      props: { 
        myFirstPropName: myFirstPropValue,
        mySecondPropName: mySecondPropValue,
        ....
      }, // Optional
      onConfirm: someFn, // Optional, async fn is ok
      onCancel: someFn, //  Optional, async fn is ok
    });
    this.$modal.show("foo"); // Pass an id of modal here
  },
  myHideModalFn() {
    this.$modal.hide("foo"); // Pass an id of modal here
  }
}
```
4. Modal-component (`ModalDialog` in example) gets from parent such props:
```vue
    disabled: {
      type: Boolean,
    },
    text: {
      type: String,
    },
    isVisible: {
      type: Boolean,
    },
```
5. Modal-component (`ModalDialog` in example) must emit `"cancel"` and `"confirm"` events on related buttons click.
6. Modal-component (`ModalDialog` in example) does not get `onConfirm` and `onCancel` functions. These functions run in `ModalsWrapper`.
7. `ModalsWrapper` is transparent for custom-events and for props.
8. For testing `create`, `show`, `hide` methods use `spyOn`:
```vue
    // wrapper here is the VTU-wrapper for component where the modal was created
    const modalCreateSpyOn = jest.spyOn(wrapper.vm.$modal, "create");
    // do something to show a modal (click on button for instance)
    expect(modalCreateSpyOn).toHaveBeenCalled();
    expect(modalCreateSpyOn).toHaveBeenCalledWith({
        id: `your-expected-id`,
        modalComponent: `YourExpectedComponent`,
        text: `your-expected-text`,
        onCancel: expect.any(Function), // or particular fn
        onConfirm: expect.any(Function), // or particular fn
    });
    modalCreateSpyOn.mockReset();
```
9. Testing of `onConfirm`/`onCancel` methods should be done in the component that includes `<modals-wrapper>`.