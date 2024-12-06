"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    let message = err.message || 'Internal Server Error';
    if (err.code) {
        message = err.code; // Utiliza el código de error si está definido
    }
    console.error(err); // Registro del error
    res.status(statusCode).json({
        success: false,
        message: message,
    });
};
exports.errorHandler = errorHandler;
