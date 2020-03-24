"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GraficaData {
    constructor() {
        this.meses = ['enero', 'febrero', 'marzo', 'abril'];
        this.valores = [1, 2, 3, 4];
    }
    obtenerDataGrafica() {
        return [
            { data: this.valores, label: 'ventas' }
        ];
    }
    ;
    incrementarValor(mes, valor) {
        mes = mes.toLowerCase().trim(); // trim limpia espacios que vengan antes o despues
        for (let i in this.meses) {
            if (this.meses[i] === mes) {
                this.valores[i] += valor; // es decir incremento valor al mes correspondiente 
            }
        }
        return this.obtenerDataGrafica(); // una vez incrementado el mes, retorno  el array con los nuevos datos 
    }
}
exports.GraficaData = GraficaData;
