"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = __importDefault(require("../classes/server"));
exports.mensajesPrueba = express_1.Router();
// primer servicio get de prueba , handler ( funcion que va a manejar la peticion )
//http://localhost:5100/mensajes/mensajes
exports.mensajesPrueba.get('/mensajes', (req, res) => {
    res.status(200).json({
        ok: true,
        mensaje: ' GET mensajes listo'
    });
});
// primer servicio get de prueba , handler ( funcion que va a manejar la peticion )
// en postman pusimos los key :  cuerpo y de  en el body , aqui lo tenemos que capturar 
// usamos como ayuda el body-parser (importado en el index.ts) que la serializa y genera un obj json 
// http://localhost:5100/mensajes/mensajes
exports.mensajesPrueba.post('/mensajes', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    res.status(200).json({
        ok: true,
        mensaje: 'POST mensaje listo',
        cuerpo: cuerpo,
        de: de
    });
});
// hacemos un post , pero ahora con info en la url  como /:id 
//http://localhost:5100/mensajes/mensajes/123
exports.mensajesPrueba.post('/mensajes/:id', (req, res) => {
    // recuperamos lo que esta en el body 
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    //recuperamos los que  viene en la url
    const id = req.params.id || 'sin id';
    const server = server_1.default.instance; // obtenemso la misma instancia
    // in sirve para mandar a un room medinate el id 
    server.io.in(id).emit('mensaje-privado');
    res.status(200).json({
        ok: true,
        mensaje: 'POST listo',
        cuerpo: cuerpo,
        de: de,
        id: id
    });
});
exports.default = exports.mensajesPrueba;
