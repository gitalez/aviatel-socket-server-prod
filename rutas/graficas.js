"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const graficas_1 = require("../classes/graficas");
const server_1 = __importDefault(require("../classes/server"));
exports.graficas = express_1.Router();
const grafica = new graficas_1.GraficaData(); // creamos un ainstancia de la clase para despues usuarla en la respuesta 
// primer servicio get de prueba , handler ( funcion que va a manejar la peticion )
//http://localhost:5100/graficas/mensajes
exports.graficas.get('/mensajes', (req, res) => {
    res.status(200).json({
        ok: true,
        mensaje: ' GET graficas listo'
    });
});
//http://localhost:5100/graficas/graficas
exports.graficas.get('/graficas', (req, res) => {
    console.log('me solicitan datos de la grafica ');
    res.status(200).json({
        ok: true,
        graficas: grafica.obtenerDataGrafica()
    });
});
//http://localhost:5100/incrementar
exports.graficas.post('/incrementar', (req, res) => {
    const mes = req.body.mes;
    const unidades = Number(req.body.unidades); // lo casteamos a numero 
    grafica.incrementarValor(mes, unidades);
    // aqui emitimos el evento cambio-grafica
    const server = server_1.default.instance; // obtenemos  la misma instancia de nuestro server
    server.io.emit('cambio-grafica', grafica.obtenerDataGrafica());
    res.status(200).json(grafica.obtenerDataGrafica());
});
