"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const environment_1 = require("../global/environment");
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const socket = __importStar(require("../sockets/socket"));
const path_1 = __importDefault(require("path"));
// como lo unico que voy en esta clase es la clase pongo default , que es el paquete por defecto 
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
        const publicPath = path_1.default.resolve(__dirname, '../public');
        this.app.use(express_1.default.static(publicPath));
        this.io = socket_io_1.default(this.httpServer);
        this.escucharSockets();
    }
    // este middle habilita la carpeta publica 
    //app.use(express.static(publicPath));
    //este es un getter ( instance ) de la clase para acceder a esta
    //cuando  un metodo es estatico lo puedo llamar invocando la clase 
    static get instance() {
        // si existe la instancia de la clase devuelve la que hay , si no existe la primera vez  la crea
        return this._instance || (this._instance = new this()); // el this es como hacer new server 
    }
    escucharSockets() {
        console.log('escuchando conexion-sockets');
        this.io.on('connection', (cliente) => {
            console.log('nuevo cliente conectado');
            console.log('su id : ', cliente.id); // este es el id del cliente conectado 
            // una vez de recibida la conexion , lo agragamos ala lista  
            socket.conectarCliente(cliente, this.io);
            //escuchando mensajes de los clientes 
            socket.escucharMensajeCliente(cliente, this.io);
            // una vez conectado el cliente, escuchamos la desconexion del cliente, 
            // llamando a la funcion que esta en soket.ts
            // ademas lo borramos de la ista 
            socket.escucharDesconexionCliente(cliente, this.io);
            // una vez conectado configuramos el cliente ( cuando en la app angular se loguea un usuario )
            socket.configurarCliente(cliente, this.io);
            // escuchamos el evento obtener-clientes que nos solicita la app angular en listado clientes
            socket.obtenerClientesActivos(cliente, this.io);
            //////////////// metodos para esp ///////////////////////
            //escuchando mensajes de los clientes 
            socket.escucharMensajeEsp(cliente, this.io);
            // escuchamos la configuracion del nombre del esp 
            socket.configurarNombreEsp(cliente, this.io);
            // escuchamos la configuracion de la mac del esp 
            socket.configurarMacEsp(cliente, this.io);
            // escuchamos la configuracion del tipo del esp 
            socket.configurarTipoEsp(cliente, this.io);
            // escuchamos la configuracion del  email del dueño del esp 
            socket.configurarEmailEsp(cliente, this.io);
        });
    }
    // para levantar el servidor 
    start() {
        this.httpServer.listen(this.port);
        console.log('Servidor corriendo en el puerto :', this.port);
    }
}
exports.default = Server;
