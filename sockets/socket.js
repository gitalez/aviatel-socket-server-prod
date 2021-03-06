"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clientes_lista_1 = require("../classes/clientes-lista");
const cliente_model_1 = require("../classes/cliente-model");
// creamos una instancia de usuarioslista
exports.clientesConectados = new clientes_lista_1.ClientesLista;
// escuchar la desconexion de un cliente
exports.escucharDesconexionCliente = (cliente, io) => {
    cliente.on('disconnect', () => {
        var _a;
        console.log('Cliente desconectado');
        exports.clientesConectados.borrarCliente(cliente.id); // es el id del socket
        let cli = exports.clientesConectados.getCliente(cliente.id);
        if (((_a = cli) === null || _a === void 0 ? void 0 : _a.tipo) === "esp") {
            // es un esp, no emito nada  
        }
        else {
            // es un humano
            // el segundo  arg es el payload que le enviamos que es la lits de conectados 
            // lo saca de la lista y muestra los que quedaron
            io.emit('clientes-activos', exports.clientesConectados.getLista());
        }
    });
};
// agrega un cliente a la lista  con solo su id , a la espera de ser configurado las demas propiedades
exports.conectarCliente = (cliente, io) => {
    const cli = new cliente_model_1.Cliente(cliente.id); // este id es el idsocket 
    // le envia el modelo cliente con solo el id , lo demas es 
    // "sin-nombre" "sin-sala" "sin-mac";
    exports.clientesConectados.agregarCliente(cli);
};
// escuchar mensajes de un cliente
// escucha evento mensaje
// responde con un emit mensaje-nuevo
exports.escucharMensajeCliente = (cliente, io) => {
    // escuchamos el evento mensaje
    // payload es lo que se recibe 
    cliente.on('mensaje', (payload) => {
        payload.idSocket = cliente.id;
        console.log('mensaje recibido:', payload);
        // emito un evento 'mensaje-nuevo'  
        // a todos los clientes conectados lo que me llego , una especie de eco 
        io.emit('mensaje-nuevo', payload); // global 
    });
};
// escuchar la configuracion de un cliente ( el nombre y la sala si se implementa)
// el cliente no tiene mac : es "sin-mac"
// se configura el nombre y el tipo  : tipo cliente o tipo: esp
exports.configurarCliente = (cliente, io) => {
    // escuchamos el evento configurar-cliente
    // el callback retorna a la app angular la respuesta de este  server 
    cliente.on('configurar-cliente', (payload, callback) => {
        //console.log('configurando cliente:', payload);
        exports.clientesConectados.actualizarNombreYtipoCliente(cliente.id, payload.nombre, payload.tipo);
        // el seg arg es el payload que le enviamos que es la lits de conectados
        console.log('clientes conectados : ', exports.clientesConectados.getLista());
        io.emit('clientes-activos', exports.clientesConectados.getLista());
        callback({
            ok: true,
            cliente: cliente.id,
            mensaje: `Cliente ${payload.nombre}, configurado`
        });
        // emito  a todos los clientes conectados lo que me llego , una especie de eco 
        //io.emit( 'mensaje-nuevo', payload );        
    });
};
// este metodo debe escuchar lo que emite la app ang ( evento : obtener-clientes) 
// en el ngoninit del listadoClientesComponent
exports.obtenerClientesActivos = (cliente, io) => {
    // el callback no recibe nada , responde solo al que se logueo 
    cliente.on('obtener-clientes', () => {
        // el to se lo envia a uno solo 
        io.to(cliente.id).emit('clientes-activos', exports.clientesConectados.getLista());
    });
};
// escuchar mensajes de un ESP
// escucha evento mensaje-esp
// responde con un emit mensaje-nuevo
exports.escucharMensajeEsp = (cliente, io) => {
    // payload es lo que se recibe 
    cliente.on('mensaje-esp', (payload) => {
        console.log('mensaje recibido del esp :', payload);
        // emito un msg-privado al cliente que me envio el evento mensaje 
        io.to(cliente.id).emit('msg-privado', 'hemos recibido tu mensaje'); //al que me lo envio 
    });
};
// escuchar la configuracion del nombre de  un ESP
exports.configurarNombreEsp = (cliente, io) => {
    // escuchamos el evento configurar-nombre-esp
    cliente.on('configurar-nombre-esp', (payload) => {
        console.log('mensaje recibido del esp :', payload);
        exports.clientesConectados.actualizarNombreEsp(cliente.id, payload.nombre);
        // emito un msg-privado al cliente que me envio el evento mensaje 
        io.to(cliente.id).emit('msg-privado', 'nuevo nombre'); //al que me lo envio 
    });
};
// escuchar la configuracion de la mac de  un ESP
exports.configurarMacEsp = (cliente, io) => {
    // escuchamos el evento configurar-mac-esp
    cliente.on('configurar-mac-esp', (payload) => {
        console.log('mensaje recibido del esp :', payload);
        exports.clientesConectados.actualizarMacEsp(cliente.id, payload.mac);
        // emito un msg-privado al cliente que me envio el evento mensaje 
        io.to(cliente.id).emit('msg-privado', 'nueva mac'); //al que me lo envio 
    });
};
// escuchar la configuracion del tipo de un ESP
exports.configurarTipoEsp = (cliente, io) => {
    // escuchamos el evento configurar-tipo-esp
    // el callback retorna a la app angular la respuesta de este  server 
    cliente.on('configurar-tipo-esp', (payload) => {
        console.log('mensaje recibido del esp :', payload);
        exports.clientesConectados.actualizarTipoEsp(cliente.id, payload.tipo);
        // emito un msg-privado al cliente que me envio el evento mensaje 
        io.to(cliente.id).emit('msg-privado', 'nuevo tipo'); //al que me lo envio 
    });
};
// escuchar la configuracion del email del dueño de un ESP
exports.configurarEmailEsp = (cliente, io) => {
    // escuchamos el evento configurar-email-esp
    cliente.on('configurar-email-esp', (payload) => {
        console.log('mensaje recibido del esp :', payload);
        exports.clientesConectados.actualizarEmailEsp(cliente.id, payload.email);
        // emito un msg-privado al cliente que me envio el evento 
        io.to(cliente.id).emit('msg-privado', 'tiene nuevo dueño'); //al que me lo envio 
    });
};
// escuchar la configuracion  de la sala  de un ESP
exports.configurarSalaEsp = (cliente, io) => {
    // escuchamos el evento configurar-sala-esp
    cliente.on('configurar-sala-esp', (payload) => {
        exports.clientesConectados.actualizarSalaEsp(cliente.id, payload.sala);
        console.log('mensaje recibido del esp :', payload);
        // emito un msg-privado al cliente que me envio el evento 
        io.to(cliente.id).emit('msg-privado', 'tiene nueva sala'); //al que me lo envio 
    });
};
