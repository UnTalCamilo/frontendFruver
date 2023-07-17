export class PedidoModel{
    constructor(
        public idPedido: string,
        public idCliente: string,
        public fechaSolicitud: string,
        public estado: string,
        
    ){}
}