import { Injectable } from '@angular/core';
import { PedidoProductoModel } from './PedidosProd.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoProductoService {
  ApiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerPedidosProducto() {
    return this.http.get<PedidoProductoModel[]>(`${this.ApiUrl}/pedidosProd`);
  }

  obtenerPedidoProducto(id: number) {
    return this.http.get<PedidoProductoModel>(`${this.ApiUrl}/pedidosProd/${id}`);
  }

  obtenerPedidosProductoPedido(id: number) {
    return this.http.get<PedidoProductoModel[]>(`${this.ApiUrl}/pedidosProd/${id}`);
  }

  crearPedidoProducto(pedidoProducto: PedidoProductoModel) {
    return this.http.post<PedidoProductoModel>(`${this.ApiUrl}/pedidosProd`, pedidoProducto);
  }

  actualizarPedidoProducto(pedidoProducto: PedidoProductoModel) {
    return this.http.put<PedidoProductoModel>(`${this.ApiUrl}/pedidosProd/${pedidoProducto.idPP}`, pedidoProducto);
  }

}
