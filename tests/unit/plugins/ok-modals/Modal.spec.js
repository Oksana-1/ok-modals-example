import Modal from "../../../../src/plugins/ok-modals/Modal";

describe("class Modal", () => {
  test("constructor requires config-object with `id` field", () => {
    expect.assertions(2);
    try {
      new Modal({
        modalComponent: "Some component needs to be here"
      });
    } catch (e) {
      expect(e).toBeTruthy();
      expect(e.message).toBe(
        'Object "Modal" can\'t create because the property "id" is undefined!'
      );
    }
  });
  test("constructor requires config-object with `modalComponent` field", () => {
    expect.assertions(2);
    try {
      new Modal({
        id: "some-id"
      });
    } catch (e) {
      expect(e).toBeTruthy();
      expect(e.message).toBe(
        'Object "Modal" can\'t create because the property "modalComponent" is undefined!'
      );
    }
  });
  test("config-object with `id` and `modalComponent` fields is valid", () => {
    const modal = new Modal({
      modalComponent: "Some component needs to be here",
      id: "some-id"
    });
    const isModal = modal instanceof Modal;
    expect(isModal).toBe(true);
  });
  test.each`
    fieldName      | expectedResult          | expectedResultToPrint
    ${"isVisible"} | ${false}                | ${"false"}
    ${"disabled"}  | ${false}                | ${"false"}
    ${"text"}      | ${""}                   | ${"empty string"}
    ${"onConfirm"} | ${expect.any(Function)} | ${"function"}
    ${"onCancel"}  | ${expect.any(Function)} | ${"function"}
    ${"props"}     | ${null}                 | ${"null"}
  `(
    "default value for `$fieldName` field is `$expectedResultToPrint`",
    ({ fieldName, expectedResult }) => {
      const modal = new Modal({
        modalComponent: "Some component needs to be here",
        id: "some-id"
      });
      expect(modal[fieldName]).toStrictEqual(expectedResult);
    }
  );
  test.each`
    methodName   | fieldToChange  | expectedResult
    ${"show"}    | ${"isVisible"} | ${true}
    ${"hide"}    | ${"isVisible"} | ${false}
    ${"disable"} | ${"disabled"}  | ${true}
    ${"enable"}  | ${"disabled"}  | ${false}
  `(
    "method `$methodName` set field `$fieldToChange` value to `$expectedResult`",
    ({ methodName, fieldToChange, expectedResult }) => {
      const modal = new Modal({
        modalComponent: "Some component needs to be here",
        id: "some-id"
      });
      modal[methodName]();
      expect(modal[fieldToChange]).toBe(expectedResult);
    }
  );
  test("returns proper modalProps-object", () => {
    const modal = new Modal({
      modalComponent: "Some component needs to be here",
      id: "some-id"
    });
    expect(modal.modalProps).toStrictEqual({
      id: "some-id",
      isVisible: false,
      disabled: false,
      text: ""
    });
  });
  test("returns proper custom-props if they are set", () => {
    const modal = new Modal({
      modalComponent: "Some component needs to be here",
      id: "some-id",
      props: {
        foo: "bar"
      }
    });
    expect(modal.modalProps).toStrictEqual(
      expect.objectContaining({ foo: "bar" })
    );
  });
});
