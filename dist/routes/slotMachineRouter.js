"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const slotMachineController_1 = require("../controller/slotMachineController");
const router = express_1.default.Router();
router.post("/spin", slotMachineController_1.spinSlotMachine);
exports.default = router;
