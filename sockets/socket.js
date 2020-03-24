"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clientes_lista_1 = require("../classes/clientes-lista");
const cliente_model_1 = require("../classes/cliente-model");
// creamos una instancia de usuarioslista
exports.clientesConectados = new clientes_lista_1.ClientesLista;
// escuchar la desconexion de un cliente
exports.escucharDesconexionCliente = (cliente, io) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        exports.clientesConectados.borrarCliente(cliente.id); // es el id del socket
        // el segundo  arg es el payload que le enviamos que es la lits de conectados 
        // lo saca de la lista y muestra los que quedaron
        io.emit('clientes-activos', exports.clientesConectados.getLista());
    });
};
// agrega un cliente a la lista  con solo su id , a la espera de ser configurado las demas propiedades
exports.conectarCliente = (cliente, io) => {
    const cli = new cliente_model_1.Cliente(cliente.id); // este id es el idsocket 
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
        // emito un evento 'mensaje-nuevo'  a todos los clientes conectados lo que me llego , una especie de eco 
        //io.emit( 'mensaje-nuevo', payload ); // global 
        io.in(cliente.id).emit('mensaje-privado', payload); //al que me lo envio 
    });
};
// escuchar la configuracion de un cliente ( el nombre , la sala y la mac )
exports.configurarCliente = (cliente, io) => {
    // escuchamos el evento configurar-cliente
    // el callback retorna a la app angular la respuesta de este  server 
    cliente.on('configurar-cliente', (payload, callback) => {
        //console.log('configurando cliente:', payload);
        exports.clientesConectados.actualizarNombre(cliente.id, payload.nombre);
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
