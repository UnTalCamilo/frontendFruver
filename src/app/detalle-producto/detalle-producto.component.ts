import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/productos/producto.service';
import { ProductoModel } from '../services/productos/producto.model';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  producto = new ProductoModel('', '', '', 0, '');

  constructor(public productoService: ProductoService, private route: ActivatedRoute) { }

  /**
   * @name ngOnInit
   * Funcion que se ejecuta al iniciar el componente
   * Realiza la peticion al servidor para obtener un producto en base a su id obtenido de la ruta
   */

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      firstValueFrom(this.productoService.obtenerProducto(Number(id))).then((producto) => {
        this.producto = producto;
      }
      );

    }
  }

}
