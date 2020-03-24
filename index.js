"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// rutas
const mensajes_1 = __importDefault(require("./rutas/mensajes"));
const clientes_1 = require("./rutas/clientes");
const graficas_1 = require("./rutas/graficas");
const app = "aviatel-socket-server";
console.log(`esta app se llama ${app}`);
// instanciamos la clase Server 
//const server = new Server(); // solo si el constructor no es privado 
// en el singleton instanciamos la calses erver asi :
const server = server_1.default.instance;
/// un middleware es una funcion que se ejecuta antes de otra 
/// body-parser 
// lo que sea que me posteen , tomalo y genera un obj de java script 
// config body.parser en el middle para enviar urlencoded
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
// config body.parser en el middle para enviar formatos json
server.app.use(body_parser_1.default.json());
// cors 
// cualquera puede llamar a mis servicios 
server.app.use(cors_1.default({ origin: true, credentials: true }));
//invocamos al middle use para la cte mensajes
//significa : que este pendiente del path /mensajes,
// y cuando haga la peticion a /mensajes , que trabaje con la ruta mensajes
server.app.use('/mensajes', mensajes_1.default);
server.app.use('/clientes', clientes_1.clientes);
server.app.use('/graficas', graficas_1.graficas);
///////// creamos el server  ////////////
server.start();
