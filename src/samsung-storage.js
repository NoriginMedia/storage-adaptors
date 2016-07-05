import Event from "event";

export default class SamsungStorage {

	constructor() {
		this.initialized = new Event();
		this.dir = window.curWidget.id;

		/* global FileSystem */
		this.fileSystem = new FileSystem();
		if (!this.fileSystem.isValidCommonPath(this.dir)) {
			this.fileSystem.createCommonDir(this.dir);
		}
		this.filePath = this.dir + "/localStorage.json";
		this.load();
	}

	isInitialized() {
		return true;
	}

	load() {
		var file = this.fileSystem.openCommonFile(this.filePath, "r");
		if (file) {
			var contents = file.readAll();
			try {
				this.data = JSON.parse(contents);
			} catch (e) {}
			this.fileSystem.closeCommonFile(file);
		}
		if (!this.data) {
			this.data = {};
		}
	}

	save() {
		var file = this.fileSystem.openCommonFile(this.filePath, "w");
		if (file) {
			var contents = JSON.stringify(this.data);
			file.writeAll(contents);
			this.fileSystem.closeCommonFile(file);
		}
	}

	set(key, value) {
		this.data[key] = value;
		this.save();
	}

	get(key, callback) {
		callback(this.data[key]);
	}

	remove(key) {
		delete this.data[key];
		this.save();
	}

	clear() {
		this.data = {};
		this.save();
	}
}
