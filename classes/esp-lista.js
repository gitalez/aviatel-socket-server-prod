"use strict";
// aqui estara la logica de los usuarios en el socket 
Object.defineProperty(exports, "__esModule", { value: true });
class EspLista {
    constructor() {
        this.lista = [];
    }
    // agregar un esp a la lista 
    agregarEsp(esp) {
        this.lista.push(esp);
        console.log('nuevo esp en la lista', this.lista);
        return esp;
    }
    // actualizamos el nombre  del esp
    actualizarNombreEsp(id, nombre, mac) {
        for (let esp of this.lista) {
            if (esp.idSocket === id) {
                esp.nombre = nombre;
                esp.mac = mac;
                break;
            }
        }
        ;
        console.log('====== ESP actualizado =====');
        console.log(this.lista);
    }
    ;
    // obtenemos lista de ESP
    getListaEsp() {
        // retorno la lista de conctados excepto los que no tienen nombre 
        return this.lista.filter(esp => esp.nombre !== 'sin-nombre'); // la lista es privada , la accedo desde un metodo publico 
    }
    // regresa un esp ( la clase ) identificado por su id  
    getEsp(id) {
        return this.lista.find(esp => {
            return esp.idSocket === id;
        });
    }
    ;
    // obtenemos los esp en una sala en particular 
    getEspEnSala(sala) {
        return this.lista.filter(esp => {
            return esp.sala === sala;
        });
    }
    // borrar un ESP de la lsita 
    borrarEsp(id) {
        const tempEsp = this.getEsp(id); // en temp el ESP que quiero borrar 
        // en this.lista la lista filtrada 
        this.lista = this.lista.filter(esp => {
            // retorno toda la lista, excepto al que quiero borrar 
            return esp.idSocket !== id;
        });
        console.log('borrado un esp , esta es la nueva lista', this.lista);
        return tempEsp; // retorno el ESP que borre 
    }
}
exports.EspLista = EspLista;
