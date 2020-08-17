"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var connected_react_router_1 = require("connected-react-router");
var history_1 = __importDefault(require("../history"));
var home_1 = __importDefault(require("./home"));
var mine_1 = __importDefault(require("./mine"));
var profile_1 = __importDefault(require("./profile"));
var reducers = {
    router: connected_react_router_1.connectRouter(history_1.default),
    home: home_1.default,
    mine: mine_1.default,
    profile: profile_1.default
};
var reducer = redux_1.combineReducers(reducers);
exports.default = reducer;
