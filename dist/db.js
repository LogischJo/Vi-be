"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const node_path_1 = require("node:path");
const _db = new better_sqlite3_1.default(node_path_1.join(__dirname, '..', 'database', 'LightCluster.db'));
function _prepare() { }
