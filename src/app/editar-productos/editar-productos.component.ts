import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router} from '@angular/router';
import { ProductoService } from '../services/productos/producto.service';
import { ProductoModel } from '../services/productos/producto.model';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})
export class EditarProductosComponent implements OnInit {

  submitted = false;
  update = false;

  productos: Observable<ProductoModel[]> | undefined;

  producto = new ProductoModel('', '', '', 0, '');

  image: any;

  constructor(
    public authService: AuthService,
    private router: Router,
    public productoService: ProductoService
  ) { }

  ngOnInit(): void {
    if (this.authService.isLogged().rol != 'ADMIN') {
      this.router.navigate(['/']);
    }
    this.productos = this.productoService.obtenerProductos();
  }
  /**
   * @name loadProductos
   * Funcion que carga los productos
   * @returns
   */

  loadProductos() {
    this.productos = this.productoService.obtenerProductos();
  }

  /**
   * @name editarProducto
   * @param id 
   * Funcion que realiza la peticion al servidor para obtener un producto
   */

  editarProducto(id: string) {
    this.image = null;
    this.update = true;
    this.submitted = false;
    let imgFile = (<HTMLInputElement>document.getElementById('fileImg'));
    imgFile.value = '';
    
    firstValueFrom(this.productoService.obtenerProducto(Number(id))).then(
      res => {
        this.producto = res;
        this.producto.imagen = '';
        console.log(this.producto);
        
      }
    );
  }

  /**
   * @name nuevoProducto
   * Funcion que crea un nuevo producto
   */

  nuevoProducto() {
    this.image = null;
    this.update = false;
    this.submitted = false;
    this.producto = new ProductoModel('', '', '', 0, '');
    let imgFile = (<HTMLInputElement>document.getElementById('fileImg'));
    imgFile.value = '';
  }

  /**
   * @name onSubmit
   * Funcion que realiza la peticion al servidor para crear o actualizar un producto
   */

  onSubmit() {
    this.submitted = true;
    if (this.producto.nombre != '' && this.producto.descripcion != '') {
      let newPrd = new FormData();
      newPrd.append('data', JSON.stringify(this.producto));

      newPrd.append('image', this.image);
      console.log(newPrd);
      
      if (this.update) {
        //firstValueFrom(this.productoService.actualizarProducto(this.producto)).then(
        firstValueFrom(this.productoService.actualizarProductoImg(newPrd, this.producto.idProducto)).then(
          res => {
            console.log(res);
            this.loadProductos();
            this.submitted = false;
          }
        );
      } else {
        //firstValueFrom(this.productoService.crearProducto(this.producto)).then(
        firstValueFrom(this.productoService.crearProductoImg(newPrd)).then(
          res => {
            console.log(res);
            this.loadProductos();
            this.submitted = false;
          }
        );
      }
    }
  }


  eliminarProducto(id: string) {
    firstValueFrom(this.productoService.eliminarProducto(Number(id))).then(
      res => {
        console.log(res);
        this.loadProductos();
      }
    );
  }

  onFileSelected(event: any) {
    let value = event.target.files || event.srcElement.files;
    this.image = value[0];
    if (this.image) {
      this.producto.imagen = this.image.name;
    }
    console.log(this.image);
  }


}
