"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = require("body-parser");
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = __importDefault(require("path"));
var routes = __importStar(require("./app/Routes/routes"));
dotenv_1.default.config();
var app = express_1.default();
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, './app/Views'));
app.use(express_1.default.static(path_1.default.join(__dirname, './public')));
mongoose_1.default.connect("mongodb+srv://" + process.env.MONGO_URL + "/Paste?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
        user: String(process.env.MONGO_USER),
        password: String(process.env.MONGO_PASS)
    }
}).catch(function (ex) {
    console.error(ex);
    process.exit(1);
});
routes.init(app);
var port = process.env.PORT;
app.listen(port, function () {
    console.log("Listening on http://localhost:" + port);
});
