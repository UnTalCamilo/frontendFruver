export class ProductoModel {
    constructor(
        public idProducto: string,
        public nombre: string,
        public descripcion: string,
        public precio: number,
        public imagen: string,
    ) { }
}