"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = __importDefault(require("../classes/server"));
const socket_1 = require("../sockets/socket");
exports.clientes = express_1.Router();
// primer servicio get de prueba , handler ( funcion que va a manejar la peticion )
//http://localhost:5100/clientes/mensaje-prueba
exports.clientes.get('/mensaje-prueba', (req, res) => {
    res.status(200).json({
        ok: true,
        mensaje: ' GET clientes mensaje de prueba listo'
    });
});
// primer servicio get para obtener clientes , handler ( funcion que va a manejar la peticion )
// http://localhost:5100/clientes/clientes
exports.clientes.get('/clientes', (req, res) => {
    const server = server_1.default.instance;
    // para barrer todos los clientes conectados en socket, 
    //socketIO nos da un metodo clients para encontrarlos que viene en el plugin
    server.io.clients((err, clientes) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            clientes
        });
    });
});
// obtener ids de clientes sus nombre y salas 
// http://localhost:5100/clientes/detalle
exports.clientes.get('/detalle', (req, res) => {
    res.status(200).json({
        ok: true,
        clientes: socket_1.clientesConectados.getLista()
    });
});
exports.default = exports.clientes;
