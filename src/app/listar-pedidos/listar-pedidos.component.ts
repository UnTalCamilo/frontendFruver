import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedidos/pedido.service';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { PedidoProductoModel } from '../services/pedidoProducto/PedidosProd.model';
import { ProductoModel } from '../services/productos/producto.model';
import { PedidoProductoService } from '../services/pedidoProducto/pedido-producto.service';


@Component({
  selector: 'app-listar-pedidos',
  templateUrl: './listar-pedidos.component.html',
  styleUrls: ['./listar-pedidos.component.css']
})

export class ListarPedidosComponent implements OnInit {
  pedidos: any = [];
  submitted = false;
  pedido = new PedidoProductoModel(0, 0, 0, 0);
  producto = new ProductoModel('', '', '', 0, '');
  constructor(private pedidoService: PedidoService,
    private pedidoProductoService: PedidoProductoService,
    private authService: AuthService,
    private router: Router
  ) { }

  /**
   * @name ngOnInit
   * Funcion que se ejecuta al iniciar el componente
   * Realiza la peticion al servicio auth para verificar si el usuario esta logueado y su rol
   * si es admin carga todos los pedidos
   * si es user carga los pedidos del cliente
   */

  ngOnInit(): void {
    if (this.authService.isLogged().rol == 'GUEST') {
      this.router.navigate(['/']);
      console.log(this.authService.isLoggedIn());

    }
    if (this.authService.isLogged().rol == 'ADMIN') {
      this.loadPedidos();
    }
    if (this.authService.isLogged().rol == 'USER') {
      this.loadPedidosCliente();
    }

  }

  /**
   * @name auth
   * Funcion que verifica si el usuario esta logueado y si es admin
   * @returns true si es admin, false si no lo es
   */

  auth() {
    return this.authService.isLogged().rol == 'ADMIN';
  }

  /**
   * @name loadPedidos
   * Funcion que carga los pedidos
   * @returns
   */

  async loadPedidos() {
    this.pedidos = await firstValueFrom(this.pedidoService.obtenerPedidos());
  }

  /**
   * @name loadPedidosCliente
   * Funcion que carga los pedidos del cliente
   */

  async loadPedidosCliente() {
    let idCliente = this.authService.decodeToken().idCliente;
    this.pedidos = await firstValueFrom(this.pedidoService.obtenerPedidosCliente(idCliente));
  }

  /**
   * @name editarPedido
   * @param pedido 
   * Funcion que carga los datos del pedido en el formulario
   * para poder editarlos
   */

  editarPedido(pedido: any) {
    let tmpProducto = pedido.pedidosproducto.producto;
    let tmpPedido = pedido.pedidosproducto;
    this.producto = new ProductoModel(tmpProducto.idProducto, tmpProducto.nombre, tmpProducto.descripcion, tmpProducto.precio, tmpProducto.imagen);
    this.pedido = new PedidoProductoModel(tmpPedido.idPP, tmpPedido.idPedido, tmpPedido.idProducto, tmpPedido.cantidad);
  }

  /**
   * @name onSubmit
   * @param form 
   * Funcion que se ejecuta al enviar el formulario
   */

  onSubmit(form: any) {
    this.submitted = true;
    if (form.valid) {
      console.log(this.pedido);
      this.pedidoProductoService.actualizarPedidoProducto(this.pedido).subscribe(
        data => {
          this.loadPedidos();
        }
      );
    }
  }

  /**
   * @name eliminarPedido
   * @param pedido 
   * Funcion que elimina un pedido
   */

  eliminarPedido(pedido: any) {
    let tmpPedido = pedido.idPedido;
    this.pedidoService.eliminarPedido(tmpPedido).subscribe(
      data => {
        this.loadPedidos();
      }
    );
  }

  /**
   * @name aprobarPedido
   * @param pedido 
   * Funcion que aprueba un pedido
   */

  aprobarPedido(pedido: any) {
    let tmpPedido = {
      idPedido: pedido.idPedido,
      estado: '1'
    };
    this.pedidoService.actualizarPedido(tmpPedido).subscribe(
      data => {
        this.loadPedidos();
      }
    );

  }

  /**
   * @name rechazarPedido
   * @param pedido 
   * Funcion que rechaza un pedido
   */

  rechazarPedido(pedido: any) {
    let tmpPedido = {
      idPedido: pedido.idPedido,
      estado: '2'
    };
    this.pedidoService.actualizarPedido(tmpPedido).subscribe(
      data => {
        this.loadPedidos();
      }
    );
  }


}
