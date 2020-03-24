"use strict";
// =============================
// puerto
//==============================
Object.defineProperty(exports, "__esModule", { value: true });
// si el puerto lo entrega heroku es process.env.PORT
// si no existe el process.env.PORT va a ser = a 5100
// esto se copia en SERVER_PORT
// process.env.PORT es una variable de entorno de heroku 
// si corre en local es puerto 5100 
// sino la define heroku 
// da error de casting 
//export const SERVER_PORT: number = process.env.PORT || 5100
exports.SERVER_PORT = Number(process.env.PORT) || 5100;
// =============================
// entorno
//==============================
// si process.env.Node_env no existe supongo que estoy en desarrollo
// esta enviroment  es de heroku 
//esto significa  si process.env.node_env no existe supongo que estoy en desarrollo
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
