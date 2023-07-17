import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  ApiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerPedidos() {
    return this.http.get(`${this.ApiUrl}/pedidos`);
  }

  obtenerPedido(id: number) {
    return this.http.get(`${this.ApiUrl}/pedidos/${id}`);
  }

  obtenerPedidosCliente(id: number) {
    return this.http.get(`${this.ApiUrl}/pedidosCliente/${id}`);
  }

  crearPedido(pedido: any) {
    return this.http.post(`${this.ApiUrl}/pedidos`, pedido);
  }

  actualizarPedido(pedido: any) {
    return this.http.put(`${this.ApiUrl}/pedidos/${pedido.idPedido}`, pedido);
  }

  eliminarPedido(id: number) {
    return this.http.delete(`${this.ApiUrl}/pedidos/${id}`);
  }


}
