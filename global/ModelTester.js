import Checkers from "./Checkers.js";
import { APIError } from "./APIResp.js";

export default class ModelTester {
	tests = [];

	constructor(tests) {
		this.tests(tests);
	}

	/* ---- Setters --------------------------------- */
	set tests(tests) {
		if (!Checkers.isArray(tests)) return;
		const validTests = [];

		for (const test of tests) {
			if (this.isValidTest(test)) {
				validTests.push(test);
			}
		}

		this.tests = validTests;
	}

	/* ---- Getters --------------------------------- */
	get tests() {
		return this.tests;
	}

	/* ---- Functions - Check ----------------------- */
	isValidTest(test) {
		return test instanceof Test && test.isValid();
	}

	/* ---- Functions - Edit tests ------------------ */
	add(test) {
		if (this.isValidTest(test)) {
			this.tests.push(test);
		}
	}

	clear() {
		this.tests = [];
	}

	/* ---- Functions - Filter tests ---------------- */
	some(...names) {
		return new ModelTester(this.tests.filter(t => names.includes(t.name)));
	}

	except(...names) {
		return new ModelTester(this.tests.filter(t => !names.includes(t.name)));
	}

	/* ---- Functions - Do tests -------------------- */
	async do(data, options = { db: null, canBeNull: false }) {
		for (const test of this.tests) {
			if (!(await test.do(data, { db: options.db, canBeNull: options.canBeNull }))) {
				throw test.error;
			}
		}

		return true;
	}
}

export class Test {
	name = "";
	do = null;
	error = null;

	constructor(name, doFn, error) {
		this.setName(name);
		this.setDo(doFn);
		this.setError(error);
	}

	/* ---- Setters --------------------------------- */
	setName(name) {
		this.name = name.toString();
		return this;
	}

	setDo(doFn) {
		this.do = doFn;
		return this;
	}

	setError(error) {
		if (error instanceof APIError) {
			this.error = error;
		}

		return this;
	}

	/* ---- Functions - Check ----------------------- */
	isValid() {
		return (this.name) && (this.error ? this.error instanceof APIError : true);
	}
}
