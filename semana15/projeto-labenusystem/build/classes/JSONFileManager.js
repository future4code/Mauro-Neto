"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONFileManager = void 0;
const fs = require("fs");
class JSONFileManager {
    constructor(filePath) {
        this.filePath = filePath;
    }
    setFilePath(path) {
        this.filePath = path;
    }
    writeFile(data) {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    }
    readFile() {
        return JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    }
}
exports.JSONFileManager = JSONFileManager;
//# sourceMappingURL=JSONFileManager.js.map