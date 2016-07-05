import Event from "event";

export default class NativeStorage {

	constructor(bridge) {
		this.bridge = bridge;

		this.loaded = false;
		this.initialized = new Event();

		if (this.bridge.isInitialized()) {
			this.onBridgeInitialized();
		} else {
			this.bridge.initialized.add(this.onBridgeInitialized, this);
		}
	}

	onBridgeInitialized() {
		this.component = this.bridge.getComponentById("storage");
		if (!this.component) {
			throw new Error("Component with id 'storage' doesn't exist");
		}
		this.onInitialized();
	}

	onInitialized() {
		this.loaded = true;
		this.initialized.trigger(this);
	}

	set(key, value) {
		if (!this.loaded) {
			throw new Error("Storage is not initialized");
		}
		value = JSON.stringify(value);
		this.component.set(key, value);
	}

	get(key, callback) {
		if (!this.loaded) {
			throw new Error("Storage is not initialized");
		}
		this.component.get(key, function(value) {
			try {
				value = JSON.parse(value);
			} catch (e) {}
			callback(value);
		});
	}

	remove(key) {
		if (!this.loaded) {
			throw new Error("Storage is not initialized");
		}
		this.component.remove(key);
	}

	clear() {
		if (!this.loaded) {
			throw new Error("Storage is not initialized");
		}
		this.component.clear();
	}

	isInitialized() {
		return this.loaded;
	}
}
