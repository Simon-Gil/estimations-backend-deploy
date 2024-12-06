"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const database_config_1 = __importDefault(require("./config/database.config"));
const index_1 = __importDefault(require("./routes/index"));
const errorHandler_middleware_1 = require("./common/middlewares/errorHandler.middleware");
//Carga de variables de entorno 
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.dev";
dotenv.config({ path: envFile });
const PORT = process.env.PORT;
// Creación de app
const app = (0, express_1.default)();
// Middlewares
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
};
console.log('AQUI ESTA LA URL:', process.env.FRONTEND_URL)
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Rate limiting 
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000,
    max: 200,
    message: "Demasiadas solicitudes, por favor intentelo más tarde.",
});
app.use(limiter);
// Rutas
app.use('/api', index_1.default);
app.use(errorHandler_middleware_1.errorHandler);
//Inicializar base de datos e inicio del servidor
database_config_1.default.initialize().then(() => {
    console.log('Conexion a la base de datos establecida');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
app.get("/", (req, res) => {
    res.send("Hello, world!"); // REVISAR ESTO
});
