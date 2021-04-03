"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const better_logging_1 = __importDefault(require("better-logging"));
const dotenv_1 = require("dotenv");
const path_1 = require("path");
dotenv_1.config();
const app = express_1.default();
const port = process.env.PORT || 5000;
app.use(express_1.default.urlencoded({
    extended: true
}));
// Custom console
better_logging_1.default(console, { saveToFile: path_1.join(__dirname, '..', 'logs', `${Date.now()}.log`) }); // @ts-ignore
app.use(better_logging_1.default.expressMiddleware(console));
// Template engine
app.set('view engine', 'ejs');
app.use(express_1.default.static('public'));
app.set('views', path_1.join(__dirname, '..', 'views'));
app.get('/', (req, res) => {
    res.render('index', { page: 'login', title: 'Vi~be • Login' });
});
app.post('/submit-login', (req, res) => {
    const login = req.body;
});
// app.get('/tracks/:track', (req, res) => {
//   if (!req.params.track) res.sendStatus(400).json('Please provide track number.')
//   res.set('content-type', 'audio/mp3')
//   res.set('accept-ranges', 'bytes')
//   const stream = createReadStream(join(__dirname, '..', 'public', 'songs', `${req.params.track}.mp3`), {autoClose: false, highWaterMark: 1 << 25, emitClose: false})
//   stream.on('data', (chunk) => res.write(chunk))
// })
app.listen(port, () => console.info(`Started new express server on port: ${port}`));
