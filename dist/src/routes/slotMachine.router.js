'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const slotMachine_controller_1 = require('../controller/slotMachine.controller')
const validateSpinRequest_1 = require('../middleware/validateSpinRequest')
const router = express_1.default.Router()
router.post(
  '/spin',
  slotMachine_controller_1.spinSlotMachine,
  validateSpinRequest_1.validateCoinsMiddleware
)
exports.default = router
//# sourceMappingURL=slotMachine.router.js.map
