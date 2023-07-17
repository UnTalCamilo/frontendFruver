import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoModel } from './producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  ApiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  obtenerProductos() {
    return this.http.get<ProductoModel[]>(`${this.ApiUrl}/productos`);
  }

  obtenerProducto(id: number) {
    return this.http.get<ProductoModel>(`${this.ApiUrl}/productos/${id}`);
  }

  crearProducto(producto: ProductoModel) {
    return this.http.post(`${this.ApiUrl}/productos`, producto);
  }

  crearProductoImg(producto: any) {
    return this.http.post(`${this.ApiUrl}/productosImg`, producto);
  }

  actualizarProductoImg(producto: any, id: string) {
    return this.http.put(`${this.ApiUrl}/productosImg/${id}`, producto);
  }

  actualizarProducto(producto: ProductoModel) {
    return this.http.put(`${this.ApiUrl}/productos/${producto.idProducto}`, producto);
  }

  eliminarProducto(id: number) {
    return this.http.delete(`${this.ApiUrl}/productos/${id}`);
  }
  
}
