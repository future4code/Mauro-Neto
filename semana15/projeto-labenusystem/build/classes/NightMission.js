"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NightMission = void 0;
const Mission_1 = require("./Mission");
class NightMission extends Mission_1.Mission {
    setName(name) {
        if (name.indexOf('-na-night') !== -1) {
            super.setName(name);
        }
    }
}
exports.NightMission = NightMission;
//# sourceMappingURL=NightMission.js.map