"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientesLista {
    constructor() {
        this.lista = [];
    }
    // agregar un cliente a la lista 
    agregarCliente(cliente) {
        this.lista.push(cliente);
        console.log(this.lista);
        return cliente;
    }
    // actualizamos el nombre  del cliente
    actualizarNombreYtipoCliente(id, nombre, tipo) {
        for (let cliente of this.lista) {
            if (cliente.idSocket === id) {
                cliente.nombre = nombre;
                cliente.tipo = tipo;
                break;
            }
        }
        ;
        //console.log('====== actualizando cliente =====');
        //console.log(this.lista);
    }
    ;
    // actualizamos el nombre  del ESP
    actualizarNombreEsp(id, nombre) {
        for (let cliente of this.lista) {
            if (cliente.idSocket === id) {
                cliente.nombre = nombre;
                break;
            }
            return nombre;
        }
        ;
        console.log('====== actualizando nombre Esp =====');
        console.log(this.lista);
    }
    ;
    // actualizamos el nombre  del ESP
    actualizarMacEsp(id, mac) {
        for (let cliente of this.lista) {
            if (cliente.idSocket === id) {
                cliente.mac = mac;
                break;
            }
            return cliente.nombre;
        }
        ;
        console.log('====== actualizando mac Esp =====');
        console.log(this.lista);
    }
    ;
    // actualizamos el tipo del ESP
    actualizarTipoEsp(id, tipo) {
        for (let cliente of this.lista) {
            if (cliente.idSocket === id) {
                cliente.tipo = tipo;
                break;
            }
            return cliente.nombre;
        }
        ;
        console.log('====== actualizando tipo Esp =====');
        console.log(this.lista);
    }
    ;
    // actualizamos el tipo del ESP
    actualizarEmailEsp(id, email) {
        for (let cliente of this.lista) {
            if (cliente.idSocket === id) {
                cliente.email = email;
                break;
            }
            return cliente.nombre;
        }
        ;
        console.log('====== actualizando  emailEsp =====');
        console.log(this.lista);
    }
    ;
    // obtenemos lista de clientes
    getLista() {
        // retorno la lista de clientes conectados excepto los que no tienen nombre 
        return this.lista.filter(cliente => cliente.nombre !== 'sin-nombre'); // la lista es privada , la accedo desde un metodo publico 
    }
    // regresa un cliente ( la clase ) identificado por su id  
    getCliente(id) {
        return this.lista.find(cliente => {
            return cliente.idSocket === id;
        });
    }
    ;
    // obtenemos los clientes en una sala en particular 
    getClientesEnsala(sala) {
        return this.lista.filter(cliente => {
            return cliente.sala === sala;
        });
    }
    // borrar un cliente de la lista 
    borrarCliente(id) {
        const tempCliente = this.getCliente(id); // en temp el cliente que quiero borrar 
        // en this.lista la lista filtrada 
        this.lista = this.lista.filter(cliente => {
            // retorno toda la lista,  excepto al que quiero borrar 
            return cliente.idSocket !== id;
        });
        //console.log(this.lista);
        return tempCliente; // retorno el usuario que borre 
    }
}
exports.ClientesLista = ClientesLista;
