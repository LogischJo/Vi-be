"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const better_logging_1 = __importDefault(require("better-logging"));
const dotenv_1 = require("dotenv");
const path_1 = require("path");
better_logging_1.default(console, { saveToFile: `./logs/${Date.now()}.log` });
dotenv_1.config();
const app = express_1.default();
const port = process.env.PORT || 5000;
// Template engine
app.set('view engine', 'ejs');
app.use(express_1.default.static('public'));
app.set('views', path_1.join(__dirname, '..', 'views'));
// Navigation
app.get('/:song', (req, res) => {
    res.render('index', { song: req.params.song });
    console.log('Server got:', req.params.song);
});
app.listen(port, () => console.info(`Started new express server on port: ${port}`));
