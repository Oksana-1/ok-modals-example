import { ObjectValidatorError } from "./ObjectValidatorError";

export default class ObjectValidator {
	static validate(object) {
		Object.keys(object).forEach((propertyName) => {
			if (typeof object[propertyName] === "undefined") {
				throw new ObjectValidatorError(
					`Object "${object.constructor.name}" can't create because the property "${propertyName}" is undefined!`
				);
			}
		});
	}
}