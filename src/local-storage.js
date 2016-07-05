import Event from "event";

export default class LocalStorage {

	constructor() {
		this.initialized = new Event();
	}

	isInitialized() {
		return true;
	}

	set(key, value) {
		value = JSON.stringify(value);
		localStorage.setItem(key, value);
	}

	get(key, callback) {
		var value = localStorage.getItem(key);
		if (value === null) {
			value = undefined;
		}
		try {
			value = JSON.parse(value);
		} catch (e) {
		}
		callback(value);
	}

	remove(key) {
		localStorage.removeItem(key);
	}

	clear() {
		localStorage.clear();
	}
}

export var __useDefault = true;

