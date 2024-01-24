"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
(0, node_test_1.describe)("Test GET /games", () => {
    test("It shoul be response with status 200", () => {
        const response = 200;
        expect(response).toBe(200);
    });
});
