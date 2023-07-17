import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/productos/producto.service';
import { ProductoModel } from '../services/productos/producto.model';
import { PedidoService } from '../services/pedidos/pedido.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {  
  productos: Observable<ProductoModel[]> | undefined;
  isLogged = false;

  formPedido = new FormBuilder().group({
    cantidad: ['1', Validators.required]
  });



  constructor(public productoService: ProductoService,
    private authService: AuthService,
    private pedidoService: PedidoService,
    ) { }

  ngOnInit(): void {
    this.productos = this.productoService.obtenerProductos();
    this.isLogged = this.authService.isLoggedIn();
  }

  /**
   * @name onSubmit
   * Funcion que se ejecuta al enviar el formulario
   * @param id 
   */

  onSubmit(id: String) {
    let data = {
      idCliente: this.authService.decodeToken().idCliente,
      idProducto: id,
      cantidad: this.formPedido.value.cantidad
    }
    firstValueFrom(this.pedidoService.crearPedido(data)).then(
      (res: any) => {
        console.log(res);
        window.location.reload();
      }
    )
  }

}
