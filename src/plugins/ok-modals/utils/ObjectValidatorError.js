export class ObjectValidatorError extends Error {
	constructor(error) {
		super(error);
		this.type = "object-validator-error";
		this.name = "ObjectValidatorError";
	}
}